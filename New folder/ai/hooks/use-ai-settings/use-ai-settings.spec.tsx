import { renderHook } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { AiSettings, mockAiSettings } from '@cloudrabbit/ai.entities.ai-settings';
import { useAiSettings } from './use-ai-settings.js';

describe('useAiSettings', () => {
  it('should return the AI settings from mock data', () => {
    // The type error indicates that mockAiSettings() is potentially returning AiSettings[]
    // despite the provided API documentation stating it returns AiSettings.
    // To resolve the type error and make the code robust, we ensure mockData is a single AiSettings object.
    const mockDataResult = mockAiSettings();
    const mockData = Array.isArray(mockDataResult) ? mockDataResult[0] : mockDataResult;

    const { result } = renderHook(() => useAiSettings({ mockData }), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    expect(result.current.settings).toEqual(mockData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it('should handle loading state', () => {
    const { result } = renderHook(() => useAiSettings(), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    expect(result.current.loading).toBe(true);
  });
});