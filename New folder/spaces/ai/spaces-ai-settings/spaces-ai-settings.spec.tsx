import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { useAiSettings, useUpdateAiSettings } from '@cloudrabbit/ai.hooks.use-ai-settings';
import type { PlainAiSettings } from '@cloudrabbit/ai.entities.ai-settings';
import { SpacesAiSettings } from './spaces-ai-settings.js';

vi.mock('@cloudrabbit/ai.hooks.use-ai-settings', () => ({
  useAiSettings: vi.fn(),
  useUpdateAiSettings: vi.fn()
}));

const mockUseAiSettings = vi.mocked(useAiSettings);
const mockUseUpdateAiSettings = vi.mocked(useUpdateAiSettings);

describe('SpacesAiSettings', () => {
  const defaultSettings: PlainAiSettings = {
    defaultProvider: 'openai',
    defaultModel: 'gpt-4',
    apiKey: 'test-key',
    temperature: 0.7,
    maxTokens: 2048,
  };

  it('should render AI configuration settings', () => {
    mockUseAiSettings.mockReturnValue({
      settings: { toObject: () => defaultSettings },
      loading: false,
      error: null,
      refetch: vi.fn(), // Added refetch to mock
    });
    mockUseUpdateAiSettings.mockReturnValue({
      updateAiSettings: vi.fn(),
      loading: false // Changed isLoading to loading
    });

    render(
      <MockProvider>
        <SpacesAiSettings />
      </MockProvider>
    );

    expect(screen.getByText('AI Configuration')).toBeInTheDocument();
  });

  it('should allow updating AI provider', async () => {
    const updateAiSettingsMock = vi.fn();

    mockUseAiSettings.mockReturnValue({
      settings: { toObject: () => defaultSettings },
      loading: false,
      error: null,
      refetch: vi.fn(), // Added refetch to mock
    });
    mockUseUpdateAiSettings.mockReturnValue({
      updateAiSettings: updateAiSettingsMock,
      loading: false // Changed isLoading to loading
    });

    render(
      <MockProvider>
        <SpacesAiSettings />
      </MockProvider>
    );

    const selectElement = screen.getByText('OpenAI (GPT-4)');
    fireEvent.click(selectElement);
    const anthropicOption = await screen.findByText('Anthropic (Claude 3)');
    fireEvent.click(anthropicOption);

    const saveButton = screen.getByText('Save Configuration');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(updateAiSettingsMock).toHaveBeenCalled();
    });
  });
});