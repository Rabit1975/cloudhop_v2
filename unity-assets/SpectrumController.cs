using UnityEngine;
using System.Collections.Generic;
using Newtonsoft.Json;

// Unity Spectrum Controller - Receives data from React and controls visual effects
public class SpectrumController : MonoBehaviour
{
    [System.Serializable]
    public class SpectrumData
    {
        public Frequencies frequencies;
        public Emotional emotional;
        public Visual visual;
        public Space space;
        public Track track;
        public long timestamp;
    }
    
    [System.Serializable]
    public class Frequencies
    {
        public float subBass;    // 20-60 Hz
        public float bass;        // 60-250 Hz
        public float lowMid;     // 250-500 Hz
        public float mid;        // 500-2000 Hz
        public float highMid;    // 2000-4000 Hz
        public float high;       // 4000-6000 Hz
        public float ultraHigh;  // 6000-20000 Hz
    }
    
    [System.Serializable]
    public class Emotional
    {
        public float energy;     // 0-1, calm to energetic
        public float valence;    // 0-1, sad to happy
        public float arousal;    // 0-1, relaxed to alert
        public float tension;    // 0-1, relaxed to tense
    }
    
    [System.Serializable]
    public class Visual
    {
        public int particleCount;
        public float colorIntensity;
        public float motionSpeed;
        public float patternComplexity;
    }
    
    [System.Serializable]
    public class Space
    {
        public string mood;       // calm, dreamy, intense, etc.
        public float energy;     // 0-1
        public float activity;   // 0-1
    }
    
    [System.Serializable]
    public class Track
    {
        public bool isPlaying;
        public float position;   // 0-1
        public float tempo;      // BPM
    }

    // Unity Components
    public ParticleSystem particleSystem;
    public Light mainLight;
    public Material spectrumMaterial;
    public AudioSource audioSource;
    
    // Current spectrum data
    private SpectrumData currentData;
    private SpectrumData previousData;
    
    // Visual parameters
    private Color baseColor = Color.cyan;
    private Color targetColor = Color.cyan;
    private float colorTransitionSpeed = 2f;
    
    void Start()
    {
        // Initialize default data
        currentData = CreateDefaultData();
        previousData = currentData;
        
        // Setup particle system
        if (particleSystem != null)
        {
            var main = particleSystem.main;
            main.startColor = baseColor;
            main.startSize = 0.1f;
            main.startSpeed = 1f;
        }
        
        // Notify React that Unity is ready
        SendMessageToReact("unity-ready", new { instance = "unity-instance" });
    }
    
    void Update()
    {
        // Smooth transitions
        UpdateVisuals();
        UpdateParticles();
        UpdateLighting();
        UpdateEnvironment();
        
        // Store previous data for interpolation
        previousData = currentData;
    }
    
    // Called from React via UnityBridge.SendMessage
    public void UpdateSpectrumData(string jsonData)
    {
        try
        {
            previousData = currentData;
            currentData = JsonConvert.DeserializeObject<SpectrumData>(jsonData);
            
            // Apply immediate updates
            ApplySpectrumData();
        }
        catch (System.Exception e)
        {
            Debug.LogError($"Failed to parse spectrum data: {e.Message}");
        }
    }
    
    private void ApplySpectrumData()
    {
        // Update particle count
        if (particleSystem != null)
        {
            var main = particleSystem.main;
            main.maxParticles = currentData.visual.particleCount;
        }
        
        // Update audio visualization
        UpdateAudioVisualization();
        
        // Update mood-based effects
        UpdateMoodEffects();
    }
    
    private void UpdateVisuals()
    {
        // Smooth color transitions based on emotional state
        targetColor = GetMoodColor(currentData.emotional);
        baseColor = Color.Lerp(baseColor, targetColor, Time.deltaTime * colorTransitionSpeed);
        
        // Update material properties
        if (spectrumMaterial != null)
        {
            spectrumMaterial.SetColor("_BaseColor", baseColor);
            spectrumMaterial.SetFloat("_Intensity", currentData.visual.colorIntensity);
            spectrumMaterial.SetFloat("_MotionSpeed", currentData.visual.motionSpeed);
        }
    }
    
    private void UpdateParticles()
    {
        if (particleSystem == null) return;
        
        var main = particleSystem.main;
        var emission = particleSystem.emission;
        
        // Control particle emission based on audio
        float audioIntensity = GetAudioIntensity();
        emission.rateOverTime = audioIntensity * currentData.visual.particleCount * 0.1f;
        
        // Control particle size based on frequencies
        float bassResponse = currentData.frequencies.bass;
        main.startSize = Mathf.Lerp(0.05f, 0.3f, bassResponse);
        
        // Control particle speed based on energy
        main.startSpeed = Mathf.Lerp(0.5f, 5f, currentData.emotional.energy);
    }
    
    private void UpdateLighting()
    {
        if (mainLight == null) return;
        
        // Update light color based on mood
        mainLight.color = Color.Lerp(mainLight.color, targetColor, Time.deltaTime * colorTransitionSpeed);
        
        // Update light intensity based on energy
        float targetIntensity = Mathf.Lerp(0.5f, 2f, currentData.emotional.energy);
        mainLight.intensity = Mathf.Lerp(mainLight.intensity, targetIntensity, Time.deltaTime);
    }
    
    private void UpdateEnvironment()
    {
        // Update environment based on space mood
        switch (currentData.space.mood.ToLower())
        {
            case "calm":
                // Gentle, slow movements
                break;
            case "intense":
                // Fast, energetic movements
                break;
            case "dreamy":
                // Ethereal, flowing movements
                break;
            case "chaotic":
                // Random, unpredictable movements
                break;
        }
    }
    
    private void UpdateAudioVisualization()
    {
        if (audioSource == null) return;
        
        // Visualize frequencies through various parameters
        float subBass = currentData.frequencies.subBass;
        float bass = currentData.frequencies.bass;
        float mid = currentData.frequencies.mid;
        float high = currentData.frequencies.high;
        
        // Could add audio-reactive shaders here
    }
    
    private void UpdateMoodEffects()
    {
        // Apply mood-specific visual effects
        float energy = currentData.emotional.energy;
        float valence = currentData.emotional.valence;
        float arousal = currentData.emotional.arousal;
        
        // Example: High energy + positive valence = bright, fast particles
        // Low energy + negative valence = slow, dim particles
    }
    
    private float GetAudioIntensity()
    {
        // Calculate overall audio intensity from frequencies
        return (currentData.frequencies.subBass + 
                currentData.frequencies.bass + 
                currentData.frequencies.lowMid + 
                currentData.frequencies.mid + 
                currentData.frequencies.highMid + 
                currentData.frequencies.high + 
                currentData.frequencies.ultraHigh) / 7f;
    }
    
    private Color GetMoodColor(Emotional emotional)
    {
        // Map emotional state to color
        float energy = emotional.energy;
        float valence = emotional.valence;
        
        if (valence > 0.5f)
        {
            // Positive emotions - warm colors
            return Color.Lerp(Color.yellow, Color.magenta, energy);
        }
        else
        {
            // Negative emotions - cool colors
            return Color.Lerp(Color.blue, Color.cyan, energy);
        }
    }
    
    private SpectrumData CreateDefaultData()
    {
        return new SpectrumData
        {
            frequencies = new Frequencies
            {
                subBass = 0f,
                bass = 0f,
                lowMid = 0f,
                mid = 0f,
                highMid = 0f,
                high = 0f,
                ultraHigh = 0f
            },
            emotional = new Emotional
            {
                energy = 0.5f,
                valence = 0.5f,
                arousal = 0.5f,
                tension = 0.5f
            },
            visual = new Visual
            {
                particleCount = 1000,
                colorIntensity = 0.5f,
                motionSpeed = 0.5f,
                patternComplexity = 0.5f
            },
            space = new Space
            {
                mood = "ambient",
                energy = 0.5f,
                activity = 0.5f
            },
            track = new Track
            {
                isPlaying = false,
                position = 0f,
                tempo = 120f
            },
            timestamp = System.DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()
        };
    }
    
    private void SendMessageToReact(string type, object data)
    {
        // Send message to React via JavaScript
        string message = JsonConvert.SerializeObject(new { type, data });
        Application.ExternalEval($"window.postMessage({message}, '*');");
    }
}
