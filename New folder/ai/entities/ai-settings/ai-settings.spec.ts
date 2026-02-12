import { AiSettings } from './ai-settings.js';

describe('AiSettings', () => {
  it('has a AiSettings.from() method', () => {
    expect(AiSettings.from).toBeTruthy();
  });

  it('should create an AiSettings instance from a plain object', () => {
    const plainObject = {
      defaultProvider: 'openai',
      defaultModel: 'gpt-4',
      apiKey: 'sk-mock-key-12345',
      temperature: 0.7,
      maxTokens: 2048,
    };

    const aiSettings = AiSettings.from(plainObject);

    expect(aiSettings).toBeInstanceOf(AiSettings);
    expect(aiSettings.defaultProvider).toBe(plainObject.defaultProvider);
    expect(aiSettings.defaultModel).toBe(plainObject.defaultModel);
    expect(aiSettings.apiKey).toBe(plainObject.apiKey);
    expect(aiSettings.temperature).toBe(plainObject.temperature);
    expect(aiSettings.maxTokens).toBe(plainObject.maxTokens);
  });

  it('should serialize an AiSettings instance to a plain object', () => {
    const aiSettings = new AiSettings(
      'openai',
      'gpt-4',
      'sk-mock-key-12345',
      0.7,
      2048
    );

    const plainObject = aiSettings.toObject();

    expect(plainObject).toEqual({
      defaultProvider: 'openai',
      defaultModel: 'gpt-4',
      apiKey: 'sk-mock-key-12345',
      temperature: 0.7,
      maxTokens: 2048,
    });
  });
});