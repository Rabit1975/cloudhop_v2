import React, { useState } from 'react';
import { puterService } from '../services/puter';

const PuterDemo: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState('gpt-5-nano');
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'vision'>('text');

  const handleTextGeneration = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const result = await puterService.generateText(prompt, { model });
      setResponse(result);
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleImageGeneration = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const imageElement = await puterService.generateImage(prompt);
      // Convert image element to data URL for display
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx && imageElement.width && imageElement.height) {
        canvas.width = imageElement.width;
        canvas.height = imageElement.height;
        ctx.drawImage(imageElement, 0, 0);
        const dataUrl = canvas.toDataURL();
        setResponse(`<img src="${dataUrl}" alt="Generated image" class="max-w-full rounded-lg" />`);
      }
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleImageAnalysis = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      // Using a sample image URL for demo
      const imageUrl = 'https://assets.puter.site/doge.jpeg';
      const result = await puterService.analyzeImage(prompt, imageUrl, { model });
      setResponse(result);
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    switch (activeTab) {
      case 'text':
        handleTextGeneration();
        break;
      case 'image':
        handleImageGeneration();
        break;
      case 'vision':
        handleImageAnalysis();
        break;
    }
  };

  if (!puterService.isAvailable()) {
    return (
      <div className="p-6 bg-[#0E1430] rounded-lg border border-[#1E3A5F]">
        <h3 className="text-lg font-semibold mb-4 text-[#53C8FF]">Puter.js Demo</h3>
        <p className="text-white/70">Loading Puter.js...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#0E1430] rounded-lg border border-[#1E3A5F]">
      <h3 className="text-lg font-semibold mb-4 text-[#53C8FF]">Puter.js AI Demo</h3>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('text')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'text'
              ? 'bg-[#53C8FF] text-black'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          Text Generation
        </button>
        <button
          onClick={() => setActiveTab('image')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'image'
              ? 'bg-[#53C8FF] text-black'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          Image Generation
        </button>
        <button
          onClick={() => setActiveTab('vision')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'vision'
              ? 'bg-[#53C8FF] text-black'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          Image Analysis
        </button>
      </div>

      {/* Model Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-white/70 mb-2">Model:</label>
        <select
          value={model}
          onChange={e => setModel(e.target.value)}
          className="w-full px-3 py-2 bg-[#050819] border border-[#1E3A5F] rounded-lg text-white focus:outline-none focus:border-[#53C8FF]"
        >
          <option value="gpt-5-nano">GPT-5 Nano (Fast)</option>
          <option value="gpt-5-mini">GPT-5 Mini</option>
          <option value="gpt-5">GPT-5</option>
          <option value="gpt-5.1">GPT-5.1</option>
          <option value="gpt-5.2">GPT-5.2</option>
          <option value="gpt-4o">GPT-4o</option>
          <option value="o1">O1</option>
        </select>
      </div>

      {/* Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-white/70 mb-2">
          {activeTab === 'text' && 'Enter your prompt:'}
          {activeTab === 'image' && 'Describe the image you want to generate:'}
          {activeTab === 'vision' && 'What do you want to know about the image?'}
        </label>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder={
            activeTab === 'text'
              ? 'What are the benefits of exercise?'
              : activeTab === 'image'
                ? 'A futuristic cityscape at night'
                : 'What do you see in this image?'
          }
          className="w-full px-3 py-2 bg-[#050819] border border-[#1E3A5F] rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#53C8FF] resize-none"
          rows={3}
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading || !prompt.trim()}
        className="w-full px-4 py-2 bg-[#53C8FF] text-black font-semibold rounded-lg hover:bg-[#A3E7FF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </span>
        ) : activeTab === 'text' ? (
          'Generate Text'
        ) : activeTab === 'image' ? (
          'Generate Image'
        ) : (
          'Analyze Image'
        )}
      </button>

      {/* Response */}
      {response && (
        <div className="mt-4 p-4 bg-[#050819] border border-[#1E3A5F] rounded-lg">
          <h4 className="text-sm font-medium text-[#53C8FF] mb-2">Response:</h4>
          {activeTab === 'image' && response.startsWith('<img') ? (
            <div dangerouslySetInnerHTML={{ __html: response }} />
          ) : (
            <p className="text-white/90 whitespace-pre-wrap">{response}</p>
          )}
        </div>
      )}

      {/* Info */}
      <div className="mt-4 text-xs text-white/50">
        <p>Powered by Puter.js - Free OpenAI API access</p>
        <p>No API keys required • User-pays model</p>
      </div>
    </div>
  );
};

export default PuterDemo;
