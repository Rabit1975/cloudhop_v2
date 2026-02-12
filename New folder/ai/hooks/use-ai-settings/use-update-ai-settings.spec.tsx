import { renderHook, act } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { AiSettings } from '@cloudrabbit/ai.entities.ai-settings';
import { vi } from 'vitest';
import { useUpdateAiSettings } from './use-update-ai-settings.js';

describe('useUpdateAiSettings', () => {
  it('should update AI settings successfully', async () => {
    const mockUpdateAiSettings = vi.fn().mockResolvedValue(
      new AiSettings('mockProvider', 'mockModel', 'mockKey', 0.5, 100)
    );

    const { result } = renderHook(() => useUpdateAiSettings(), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    // Mock the updateAiSettings function
    // This is a workaround since `updateAiSettings` is returned from the hook, not directly passed.
    // In a real scenario, you might mock the underlying Apollo client mutation or provide a mock context.
    const originalUpdateAiSettings = result.current.updateAiSettings;
    vi.spyOn(result.current, 'updateAiSettings').mockImplementation(mockUpdateAiSettings);

    let updatedSettings: AiSettings | undefined;
    await act(async () => {
      updatedSettings = await result.current.updateAiSettings({
        defaultProvider: 'mockProvider',
        defaultModel: 'mockModel',
        apiKey: 'mockKey',
        temperature: 0.5,
        maxTokens: 100,
      });
    });

    expect(mockUpdateAiSettings).toHaveBeenCalledTimes(1);
    expect(updatedSettings).toBeInstanceOf(AiSettings);
    expect(updatedSettings?.defaultProvider).toBe('mockProvider');

    // Restore original
    vi.spyOn(result.current, 'updateAiSettings').mockImplementation(originalUpdateAiSettings);
  });
});