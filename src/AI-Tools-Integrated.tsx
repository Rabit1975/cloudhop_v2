import React, { useState, useRef, useEffect } from 'react';
import { View } from './types';
import rabbitAIService from './services/RabbitAIService';

interface AIToolsIntegratedProps {
  currentView: View;
  isVisible: boolean;
  onClose: () => void;
}

const AIToolsIntegrated: React.FC<AIToolsIntegratedProps> = ({
  currentView,
  isVisible,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<
    'assistant' | 'tools' | 'leonardo' | 'music'
  >('assistant');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState('');
  const [artPrompt, setArtPrompt] = useState('');
  const [musicPrompt, setMusicPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const responseRef = useRef<HTMLDivElement>(null);

  const getContextActions = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return [
          'Daily Briefing',
          'Suggest Focus',
          'Review Activity',
          'Plan Day',
        ];
      case View.CHAT:
        return [
          'Summarize Chat',
          'Suggest Response',
          'Analyze Mood',
          'Find Topics',
        ];
      case View.MEETINGS:
        return [
          'Start Transcription',
          'Summarize Discussion',
          'Extract Action Items',
        ];
      case View.ARCADE:
        return ['Game Strategy', 'Find Players', 'Performance Analysis'];
      default:
        return ['General Help', 'Explain Feature', 'System Status'];
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/wav',
        });
        void handleTranscription(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setError('');
    } catch (err) {
      setError('Microphone access denied.');
    }
  };

  const handleTranscription = async (blob: Blob) => {
    setIsThinking(true);
    try {
      // Simulate transcription for now
      setTimeout(() => {
        setOutputText(
          'This is a simulated transcription of the audio. In production, this would use Google Gemini API for real transcription.'
        );
        setIsThinking(false);
      }, 2000);
    } catch (err) {
      setError('Transcription failed.');
      setIsThinking(false);
    }
  };

  const handleAction = async (action?: string) => {
    const prompt = action || message;
    if (!prompt.trim()) return;

    setIsThinking(true);
    setResponse('');
    setError('');

    try {
      // Use Rabbit AI + Puter.js combined service
      const response = await rabbitAIService.getContextualResponse(
        currentView,
        prompt
      );
      setResponse(response);
    } catch (err) {
      setError('AI Error. Please try again.');
    } finally {
      setIsThinking(false);
    }
  };

  const handleArtGeneration = async () => {
    if (!artPrompt.trim()) return;

    setIsThinking(true);
    setGeneratedImage(null);

    try {
      // Use Rabbit AI + Puter.js for image generation
      const imageElement = await rabbitAIService.generateImage(artPrompt, {
        width: 400,
        height: 300,
        quality: 80,
      });

      if (!imageElement) {
        throw new Error('Image generation returned no result');
      }

      // Convert image to data URL for display
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx && imageElement.width && imageElement.height) {
        canvas.width = imageElement.width;
        canvas.height = imageElement.height;
        ctx.drawImage(imageElement, 0, 0);
        const dataUrl = canvas.toDataURL();
        setGeneratedImage(dataUrl);
      }
    } catch (err) {
      setError('Art generation failed.');
    } finally {
      setIsThinking(false);
    }
  };

  const handleMusicGeneration = async () => {
    if (!musicPrompt.trim()) return;

    setIsThinking(true);
    setCurrentPlaylist([]);

    try {
      // Use Rabbit AI + Puter.js for playlist generation
      const songs = await rabbitAIService.generatePlaylist(
        'energetic',
        musicPrompt
      );
      setCurrentPlaylist(songs);
    } catch (err) {
      setError('Playlist generation failed.');
    } finally {
      setIsThinking(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        right: '20px',
        bottom: '20px',
        width: '450px',
        height: '650px',
        background: 'rgba(14, 20, 48, 0.95)',
        border: '1px solid rgba(83, 200, 255, 0.3)',
        borderRadius: '16px',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #53C8FF 0%, #A3E7FF 100%)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
            }}
          >
            🤖
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>
            Rabbit AI Suite
          </h3>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          ✕
        </button>
      </div>

      {/* Tabs */}
      <div
        style={{
          padding: '8px 16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          gap: '4px',
          flexWrap: 'wrap',
        }}
      >
        {['assistant', 'tools', 'leonardo', 'music'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            style={{
              background:
                activeTab === tab ? 'rgba(83, 200, 255, 0.2)' : 'transparent',
              border:
                activeTab === tab
                  ? '1px solid rgba(83, 200, 255, 0.4)'
                  : '1px solid transparent',
              color: activeTab === tab ? '#53C8FF' : 'rgba(255, 255, 255, 0.7)',
              padding: '4px 8px',
              borderRadius: '6px',
              fontSize: '10px',
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
          >
            {tab === 'assistant'
              ? '🧠'
              : tab === 'tools'
                ? '🛠️'
                : tab === 'leonardo'
                  ? '🎨'
                  : '🎵'}{' '}
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Assistant Tab */}
        {activeTab === 'assistant' && (
          <>
            <div
              style={{
                padding: '12px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '8px',
                }}
              >
                Quick Actions:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {getContextActions().map((action) => (
                  <button
                    key={action}
                    onClick={() => handleAction(action)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      padding: '3px 6px',
                      borderRadius: '4px',
                      fontSize: '9px',
                      cursor: 'pointer',
                    }}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            <div
              ref={responseRef}
              style={{ flex: 1, padding: '12px', overflow: 'auto' }}
            >
              {response && (
                <div
                  style={{
                    background: 'rgba(83, 200, 255, 0.1)',
                    border: '1px solid rgba(83, 200, 255, 0.3)',
                    borderRadius: '8px',
                    padding: '10px',
                    fontSize: '12px',
                    lineHeight: '1.4',
                    color: 'white',
                  }}
                >
                  {response}
                </div>
              )}
              {isThinking && (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '20px',
                    color: '#53C8FF',
                  }}
                >
                  <div style={{ fontSize: '12px' }}>🤔 Processing...</div>
                </div>
              )}
              {error && (
                <div
                  style={{
                    color: '#ff6b6b',
                    fontSize: '12px',
                    padding: '10px',
                  }}
                >
                  {error}
                </div>
              )}
            </div>

            <div
              style={{
                padding: '12px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAction()}
                  placeholder="Ask Rabbit AI..."
                  style={{
                    flex: 1,
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '6px',
                    padding: '6px 10px',
                    color: 'white',
                    fontSize: '12px',
                    outline: 'none',
                  }}
                />
                <button
                  onClick={() => handleAction()}
                  disabled={isThinking}
                  style={{
                    background: '#53C8FF',
                    color: '#000',
                    border: 'none',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '600',
                    cursor: isThinking ? 'not-allowed' : 'pointer',
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </>
        )}

        {/* Tools Tab */}
        {activeTab === 'tools' && (
          <div
            style={{
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {[
                'Summarize',
                'Rewrite',
                'Translate',
                'Extract Actions',
                'Transcribe',
              ].map((tool) => (
                <button
                  key={tool}
                  onClick={() => setActiveTab(tool as any)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '10px',
                    cursor: 'pointer',
                  }}
                >
                  {tool}
                </button>
              ))}
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to process..."
              style={{
                flex: 1,
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '6px',
                padding: '8px',
                color: 'white',
                fontSize: '12px',
                outline: 'none',
                resize: 'none',
                minHeight: '100px',
              }}
            />

            <button
              onClick={() => handleAction(inputText)}
              disabled={isThinking}
              style={{
                background: '#53C8FF',
                color: '#000',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: isThinking ? 'not-allowed' : 'pointer',
              }}
            >
              {isThinking ? 'Processing...' : 'Process Text'}
            </button>

            {outputText && (
              <div
                style={{
                  background: 'rgba(83, 200, 255, 0.1)',
                  border: '1px solid rgba(83, 200, 255, 0.3)',
                  borderRadius: '6px',
                  padding: '8px',
                  fontSize: '12px',
                  color: 'white',
                  maxHeight: '150px',
                  overflow: 'auto',
                }}
              >
                {outputText}
              </div>
            )}
          </div>
        )}

        {/* Leonardo Tab */}
        {activeTab === 'leonardo' && (
          <div style={{ padding: '12px' }}>
            <textarea
              value={artPrompt}
              onChange={(e) => setArtPrompt(e.target.value)}
              placeholder="Describe what you want to create..."
              style={{
                width: '100%',
                height: '80px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '6px',
                padding: '8px',
                color: 'white',
                fontSize: '12px',
                outline: 'none',
                resize: 'none',
              }}
            />
            <button
              onClick={() => handleAction(`Generate art: ${artPrompt}`)}
              disabled={isThinking}
              style={{
                background: '#53C8FF',
                color: '#000',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: isThinking ? 'not-allowed' : 'pointer',
                width: '100%',
                marginTop: '8px',
              }}
            >
              {isThinking ? 'Generating...' : 'Generate Art'}
            </button>

            {generatedImage && (
              <div style={{ marginTop: '12px' }}>
                <img
                  src={generatedImage}
                  alt="Generated art"
                  style={{
                    width: '100%',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* Music Tab */}
        {activeTab === 'music' && (
          <div style={{ padding: '12px' }}>
            <textarea
              placeholder="Describe mood or activity for music..."
              style={{
                width: '100%',
                height: '60px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '6px',
                padding: '8px',
                color: 'white',
                fontSize: '12px',
                outline: 'none',
                resize: 'none',
              }}
            />
            <button
              onClick={() =>
                handleAction('Generate playlist based on current mood')
              }
              disabled={isThinking}
              style={{
                background: '#53C8FF',
                color: '#000',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: isThinking ? 'not-allowed' : 'pointer',
                width: '100%',
                marginTop: '8px',
              }}
            >
              {isThinking ? 'Generating...' : 'Generate Playlist'}
            </button>

            {currentPlaylist.length > 0 && (
              <div style={{ marginTop: '12px' }}>
                <div
                  style={{
                    fontSize: '11px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    marginBottom: '8px',
                  }}
                >
                  Generated Playlist:
                </div>
                {currentPlaylist.map((song, index) => (
                  <div
                    key={index}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '6px',
                      padding: '6px 8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '4px',
                    }}
                  >
                    <span style={{ fontSize: '11px', color: 'white' }}>
                      {index + 1}. {song}
                    </span>
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      style={{
                        background: 'rgba(83, 200, 255, 0.2)',
                        border: '1px solid rgba(83, 200, 255, 0.4)',
                        color: '#53C8FF',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '9px',
                        cursor: 'pointer',
                      }}
                    >
                      {isPlaying ? '⏸️' : '▶️'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIToolsIntegrated;
