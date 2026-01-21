import { useState, useEffect } from 'react';
import { HopSpace, HopSpaceType, HopSpaceMood } from '../utils/types';
import { api } from '../../services/mockApi';
import { useAI } from '../../kernel/providers/AIProvider';

export const useHopSpaces = () => {
    const [spaces, setSpaces] = useState<HopSpace[]>([]);
    const [loading, setLoading] = useState(true);
    const { run } = useAI();

    useEffect(() => {
        const loadGalaxy = async () => {
            setLoading(true);
            const data = await api.getPublicSpaces();
            
            // Transform linear data into galaxy coordinates
            const galaxyData: HopSpace[] = data.map((s, i) => ({
                id: s.id,
                name: s.name,
                type: ['music', 'fluid_art', 'ideas', 'world', 'anima'][i % 5] as HopSpaceType,
                mood: ['calm', 'dreamy', 'intense', 'ethereal'][i % 4] as HopSpaceMood,
                created_at: new Date().toISOString(),
                cover_image_url: s.image,
                background_url: s.image,
                orbit_links: [],
                galaxy_position: {
                    x: 50 + Math.cos(i) * (20 + i * 2),
                    y: 50 + Math.sin(i) * (20 + i * 2),
                    layer: 1
                },
                glow_intensity: 1 + Math.random(),
                metadata: {}
            }));
            
            setSpaces(galaxyData);
            setLoading(false);
        };
        void loadGalaxy();
    }, []);

    const createSpace = (data: { name: string; type: HopSpaceType; mood: HopSpaceMood }) => {
        const newSpace: HopSpace = {
            id: `new-${Date.now()}`,
            name: data.name,
            type: data.type,
            mood: data.mood,
            created_at: new Date().toISOString(),
            cover_image_url: `https://picsum.photos/seed/${data.name}/400/400`,
            background_url: `https://picsum.photos/seed/${data.name}-bg/800/600`,
            orbit_links: [],
            galaxy_position: { x: 50, y: 50, layer: 1 },
            glow_intensity: 2,
            metadata: {}
        };

        setSpaces(prev => [...prev, newSpace]);
        
        // Animate to position
        setTimeout(() => {
            setSpaces(prev => prev.map(s => s.id === newSpace.id ? { 
                ...s, 
                galaxy_position: { 
                    ...s.galaxy_position,
                    x: 50 + (Math.random() * 20 - 10), 
                    y: 50 + (Math.random() * 20 - 10) 
                } 
            } : s));
        }, 100);
    };

    // AI-powered Space creation
    const createSpaceFromAI = async (prompt: string) => {
        const result = await run({
            prompt: `Create a new HopSpace with this description: ${prompt}. Return JSON with: { name: string, type: 'music' | 'fluid_art' | 'ideas' | 'world' | 'anima', mood: 'calm' | 'dreamy' | 'intense' | 'ethereal', description: string, metadata: object }`
        });

        try {
            // Parse AI response
            const spaceData = JSON.parse(result);
            
            // Create the space
            const newSpace: HopSpace = {
                id: `ai-${Date.now()}`,
                name: spaceData.name,
                type: spaceData.type as HopSpaceType,
                mood: spaceData.mood as HopSpaceMood,
                created_at: new Date().toISOString(),
                cover_image_url: `https://picsum.photos/seed/${spaceData.name}/400/400`,
                background_url: `https://picsum.photos/seed/${spaceData.name}-bg/800/600`,
                orbit_links: [],
                galaxy_position: { 
                    x: 50 + (Math.random() * 30 - 15), 
                    y: 50 + (Math.random() * 30 - 15), 
                    layer: 1 
                },
                glow_intensity: 2 + Math.random(),
                metadata: { ...spaceData.metadata, aiGenerated: true, description: spaceData.description }
            };

            setSpaces(prev => [...prev, newSpace]);
            return newSpace;
        } catch (error) {
            console.error('Failed to parse AI response:', error);
            throw new Error('AI did not return valid space data');
        }
    };

    // AI-powered Space editing
    const updateSpaceFromAI = async (spaceId: string, prompt: string) => {
        const space = spaces.find(s => s.id === spaceId);
        if (!space) throw new Error('Space not found');

        const result = await run({
            prompt: `Modify HopSpace "${space.name}" (type: ${space.type}, mood: ${space.mood}) with this instruction: ${prompt}. Return JSON with updated fields only: { name?: string, type?: 'music' | 'fluid_art' | 'ideas' | 'world' | 'anima', mood?: 'calm' | 'dreamy' | 'intense' | 'ethereal', description?: string, metadata?: object }`
        });

        try {
            const updates = JSON.parse(result);
            
            setSpaces(prev => prev.map(s => 
                s.id === spaceId 
                    ? { 
                        ...s, 
                        ...updates,
                        metadata: { ...s.metadata, ...updates.metadata, lastAIUpdate: new Date().toISOString() }
                      }
                    : s
            ));

            return spaces.find(s => s.id === spaceId);
        } catch (error) {
            console.error('Failed to parse AI response:', error);
            throw new Error('AI did not return valid update data');
        }
    };

    // AI-powered Galaxy generation
    const generateGalaxyFromAI = async (prompt: string, count: number = 5) => {
        const result = await run({
            prompt: `Generate ${count} interconnected HopSpaces forming a galaxy based on: ${prompt}. Return JSON array: [{ name: string, type: 'music' | 'fluid_art' | 'ideas' | 'world' | 'anima', mood: 'calm' | 'dreamy' | 'intense' | 'ethereal', description: string }]`
        });

        try {
            const galaxySpaces = JSON.parse(result);
            
            const newSpaces: HopSpace[] = galaxySpaces.map((spaceData: any, i: number) => ({
                id: `galaxy-${Date.now()}-${i}`,
                name: spaceData.name,
                type: spaceData.type as HopSpaceType,
                mood: spaceData.mood as HopSpaceMood,
                created_at: new Date().toISOString(),
                cover_image_url: `https://picsum.photos/seed/${spaceData.name}/400/400`,
                background_url: `https://picsum.photos/seed/${spaceData.name}-bg/800/600`,
                orbit_links: [],
                galaxy_position: {
                    x: 50 + Math.cos(i * (Math.PI * 2 / count)) * 25,
                    y: 50 + Math.sin(i * (Math.PI * 2 / count)) * 25,
                    layer: 1
                },
                glow_intensity: 1.5 + Math.random(),
                metadata: { aiGenerated: true, description: spaceData.description, galaxyTheme: prompt }
            }));

            setSpaces(prev => [...prev, ...newSpaces]);
            return newSpaces;
        } catch (error) {
            console.error('Failed to parse AI response:', error);
            throw new Error('AI did not return valid galaxy data');
        }
    };

    return { 
        spaces, 
        loading, 
        createSpace,
        createSpaceFromAI,
        updateSpaceFromAI,
        generateGalaxyFromAI
    };
};
