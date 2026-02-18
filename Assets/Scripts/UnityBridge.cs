using UnityEngine;

namespace CloudHop
{
    public class UnityBridge : MonoBehaviour
    {
        private SpectrumController spectrumController;

        private void Awake()
        {
            spectrumController = FindObjectOfType<SpectrumController>();
        }

        private void Start()
        {
            RegisterExternalCall();
        }

        private void RegisterExternalCall()
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            Application.ExternalEval(@"
                (function() {
                    window.UnityBridge = {
                        SendSpectrumData: function(data) {
                            SendMessage('UnityBridge', 'ReceiveSpectrumData', data);
                        },
                        SendFrequencyBands: function(data) {
                            SendMessage('UnityBridge', 'ReceiveFrequencyBands', data);
                        },
                        SendEmotionalState: function(data) {
                            SendMessage('UnityBridge', 'ReceiveEmotionalState', data);
                        }
                    };
                })();
            ");
#endif
        }

        public void ReceiveSpectrumData(string jsonData)
        {
            if (spectrumController != null)
            {
                spectrumController.ReceiveSpectrumData(jsonData);
            }
        }

        public void ReceiveFrequencyBands(string jsonData)
        {
            if (spectrumController != null)
            {
                spectrumController.SetFrequencyBandData(jsonData);
            }
        }

        public void ReceiveEmotionalState(string jsonData)
        {
            if (spectrumController != null)
            {
                spectrumController.ReceiveSpectrumData(jsonData);
            }
        }

        public void SendMessageToReact(string message)
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            Application.ExternalEval($"window.postMessage({{{'type': 'unity', 'message': '{message}'}}, '*');");
#endif
            Debug.Log($"Message to React: {message}");
        }
    }
}
