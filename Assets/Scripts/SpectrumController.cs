using UnityEngine;
using Newtonsoft.Json;

namespace CloudHop
{
    public class SpectrumController : MonoBehaviour
    {
        [System.Serializable]
        public class SpectrumData
        {
            public float[] frequencies;
            public EmotionalState emotionalState;
            public VisualParams visualParams;
        }

        [System.Serializable]
        public class EmotionalState
        {
            public float energy;
            public float valence;
            public float arousal;
            public float tension;
        }

        [System.Serializable]
        public class VisualParams
        {
            public float intensity;
            public float speed;
            public string mood;
        }

        [Header("Particle Systems")]
        public ParticleSystem mainParticleSystem;
        public ParticleSystem secondaryParticleSystem;

        [Header("Lighting")]
        public Light mainLight;
        public Light ambientLight;

        [Header("Materials")]
        public Material primaryMaterial;
        public Material secondaryMaterial;

        [Header("Frequency Bands")]
        public int bandCount = 7;

        private SpectrumData currentSpectrumData;
        private Color targetColor;
        private float currentIntensity = 1f;
        private float currentSpeed = 1f;
        private string currentMood = "calm";

        private void Awake()
        {
            InitializeDefaults();
            RegisterWithBridge();
        }

        private void InitializeDefaults()
        {
            if (mainParticleSystem == null)
            {
                mainParticleSystem = GetComponentInChildren<ParticleSystem>();
            }

            targetColor = new Color(0.5f, 0.5f, 1f);
            currentSpectrumData = new SpectrumData
            {
                frequencies = new float[bandCount],
                emotionalState = new EmotionalState
                {
                    energy = 0.5f,
                    valence = 0.5f,
                    arousal = 0.5f,
                    tension = 0.5f
                },
                visualParams = new VisualParams
                {
                    intensity = 1f,
                    speed = 1f,
                    mood = "calm"
                }
            };
        }

        private void RegisterWithBridge()
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            Application.ExternalEval(@"
                if (window.UnityBridge) {
                    window.UnityBridge.SendMessage('SpectrumController', 'OnUnityReady', '');
                }
            ");
#endif
        }

        public void OnUnityReady()
        {
            Debug.Log("Unity SpectrumController ready");
        }

        public void ReceiveSpectrumData(string jsonData)
        {
            try
            {
                currentSpectrumData = JsonConvert.DeserializeObject<SpectrumData>(jsonData);
                UpdateVisuals();
            }
            catch (System.Exception e)
            {
                Debug.LogError($"Error parsing spectrum data: {e.Message}");
            }
        }

        private void UpdateVisuals()
        {
            UpdateColors();
            UpdateParticles();
            UpdateLighting();
            UpdateMaterials();
        }

        private void UpdateColors()
        {
            if (currentSpectrumData == null || currentSpectrumData.emotionalState == null)
                return;

            var emotional = currentSpectrumData.emotionalState;
            targetColor = CalculateEmotionalColor(emotional);
            currentMood = currentSpectrumData.visualParams.mood;

            if (currentMood == "intense")
            {
                targetColor = Color.Lerp(targetColor, Color.red, 0.5f);
            }
            else if (currentMood == "dreamy")
            {
                targetColor = Color.Lerp(targetColor, new Color(0.5f, 0.2f, 0.8f), 0.5f);
            }
            else if (currentMood == "chaotic")
            {
                targetColor = Color.Lerp(targetColor, new Color(1f, 0.5f, 0f), 0.5f);
            }
        }

        private Color CalculateEmotionalColor(EmotionalState emotional)
        {
            float r = emotional.energy * emotional.arousal;
            float g = emotional.valence;
            float b = (1f - emotional.tension) * emotional.valence;

            return new Color(r, g, b);
        }

        private void UpdateParticles()
        {
            if (currentSpectrumData == null || currentSpectrumData.visualParams == null)
                return;

            float targetIntensity = currentSpectrumData.visualParams.intensity;
            float targetSpeed = currentSpectrumData.visualParams.speed;

            currentIntensity = Mathf.Lerp(currentIntensity, targetIntensity, Time.deltaTime * 2f);
            currentSpeed = Mathf.Lerp(currentSpeed, targetSpeed, Time.deltaTime * 2f);

            if (mainParticleSystem != null)
            {
                var main = mainParticleSystem.main;
                main.startSpeed = main.startSpeed.constant * currentSpeed;
                main.startLifetime = main.startLifetime.constant * (2f / currentSpeed);

                var emission = mainParticleSystem.emission;
                emission.rateOverTime = emission.rateOverTime.constant * currentIntensity;
            }

            if (secondaryParticleSystem != null)
            {
                var main = secondaryParticleSystem.main;
                main.startSpeed = main.startSpeed.constant * currentSpeed * 0.5f;
            }
        }

        private void UpdateLighting()
        {
            if (mainLight != null)
            {
                mainLight.color = Color.Lerp(mainLight.color, targetColor, Time.deltaTime * 1f);
                mainLight.intensity = Mathf.Lerp(mainLight.intensity, currentIntensity, Time.deltaTime * 1f);
            }

            if (ambientLight != null)
            {
                ambientLight.color = Color.Lerp(ambientLight.color, targetColor * 0.3f, Time.deltaTime * 0.5f);
            }
        }

        private void UpdateMaterials()
        {
            if (primaryMaterial != null)
            {
                primaryMaterial.color = Color.Lerp(primaryMaterial.color, targetColor, Time.deltaTime * 1f);
            }

            if (secondaryMaterial != null)
            {
                secondaryMaterial.color = Color.Lerp(secondaryMaterial.color, targetColor * 0.7f, Time.deltaTime * 1f);
            }
        }

        public void SetFrequencyBandData(string bandDataJson)
        {
            try
            {
                float[] bands = JsonConvert.DeserializeObject<float[]>(bandDataJson);
                if (bands != null && bands.Length >= bandCount)
                {
                    for (int i = 0; i < bandCount; i++)
                    {
                        currentSpectrumData.frequencies[i] = bands[i];
                    }
                    UpdateFrequencyBasedEffects();
                }
            }
            catch (System.Exception e)
            {
                Debug.LogError($"Error parsing frequency bands: {e.Message}");
            }
        }

        private void UpdateFrequencyBasedEffects()
        {
            if (currentSpectrumData == null || currentSpectrumData.frequencies == null)
                return;

            float subBass = currentSpectrumData.frequencies[0];
            float bass = currentSpectrumData.frequencies[1];
            float lowMid = currentSpectrumData.frequencies[2];
            float mid = currentSpectrumData.frequencies[3];
            float highMid = currentSpectrumData.frequencies[4];
            float high = currentSpectrumData.frequencies[5];
            float ultraHigh = currentSpectrumData.frequencies[6];

            if (mainLight != null)
            {
                mainLight.intensity = 1f + (bass * 0.5f);
            }

            if (mainParticleSystem != null)
            {
                var main = mainParticleSystem.main;
                main.startSize = new ParticleSystem.MinMaxCurve(
                    1f + (subBass * 0.3f),
                    3f + (bass * 0.5f)
                );
            }
        }

        private void Update()
        {
            UpdateMaterials();
            UpdateLighting();
        }
    }
}
