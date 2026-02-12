import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { SectionLayout } from '@cloudrabbit/design.layouts.section-layout';
import { Button } from '@cloudrabbit/design.actions.button';
import { TextInput } from '@cloudrabbit/design.inputs.text-input';
import { SelectList, type SelectOption } from '@cloudrabbit/design.inputs.select-list';
import { useAiSettings, useUpdateAiSettings } from '@cloudrabbit/ai.hooks.use-ai-settings';
import type { PlainAiSettings } from '@cloudrabbit/ai.entities.ai-settings';
import styles from './spaces-ai-settings.module.scss';

export type SpacesAiSettingsProps = {
  /**
   * Additional class names for the component.
   */
  className?: string;
};

const providerOptions: SelectOption[] = [
  { value: 'openai', label: 'OpenAI (GPT-4)' },
  { value: 'anthropic', label: 'Anthropic (Claude 3)' },
  { value: 'mistral', label: 'Mistral AI' },
  { value: 'local', label: 'Local LLM' },
];

export function SpacesAiSettings({ className }: SpacesAiSettingsProps) {
  const { settings, loading: isLoadingSettings } = useAiSettings();
  const { updateAiSettings, loading: isSaving } = useUpdateAiSettings(); // Changed isLoading to loading

  const [provider, setProvider] = useState<string>('openai');
  const [model, setModel] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [temperature, setTemperature] = useState<string>('0.7');
  const [maxTokens, setMaxTokens] = useState<string>('2048');

  // Sync state when settings are loaded
  useEffect(() => {
    if (settings) {
      const plainSettings = settings.toObject();
      setProvider(plainSettings.defaultProvider || 'openai');
      setModel(plainSettings.defaultModel || '');
      setApiKey(plainSettings.apiKey || '');
      setTemperature(plainSettings.temperature?.toString() || '0.7');
      setMaxTokens(plainSettings.maxTokens?.toString() || '2048');
    }
  }, [settings]);

  const handleSave = useCallback(async () => {
    const updatedSettings: PlainAiSettings = {
      defaultProvider: provider,
      defaultModel: model,
      apiKey,
      temperature: parseFloat(temperature),
      maxTokens: parseInt(maxTokens, 10),
    };

    try {
      await updateAiSettings(updatedSettings);
    } catch (error) {
      console.error('Failed to update AI settings', error);
    }
  }, [provider, model, apiKey, temperature, maxTokens, updateAiSettings]);

  if (isLoadingSettings) {
    return (
      <div className={classNames(styles.loadingContainer, className)}>
        <div className={styles.loader}>Loading AI Configuration...</div>
      </div>
    );
  }

  return (
    <SectionLayout
      title="Spaces Intelligence"
      subtitle="Configure how artificial intelligence interacts with your creative spaces. Set default models, manage API keys, and tune generation parameters."
      caption="AI Configuration"
      className={classNames(styles.container, className)}
      contentClassName={styles.content}
    >
      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Provider Settings</h3>
            <p className={styles.cardDescription}>
              Select the underlying AI provider used for text generation and asset creation within your spaces.
            </p>
          </div>
          
          <div className={styles.formGroup}>
            <SelectList
              label="AI Provider"
              options={providerOptions}
              value={provider}
              onChange={setProvider}
              placeholder="Select a provider"
              className={styles.select}
            />
            
            <TextInput
              label="Model Identifier"
              placeholder="e.g. gpt-4-turbo-preview"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className={styles.input}
            />

            <TextInput
              label="API Key"
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Generation Parameters</h3>
            <p className={styles.cardDescription}>
              Fine-tune the creativity and length of the AI responses. These defaults apply to all new content generation in spaces.
            </p>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.parameterRow}>
              <div className={styles.parameterInfo}>
                <label className={styles.parameterLabel}>Temperature</label>
                <span className={styles.parameterValue}>{temperature}</span>
              </div>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                className={styles.rangeInput}
              />
              <p className={styles.parameterHelp}>
                Lower values are more deterministic. Higher values are more creative.
              </p>
            </div>

            <TextInput
              label="Max Tokens"
              type="number"
              value={maxTokens}
              onChange={(e) => setMaxTokens(e.target.value)}
              placeholder="2048"
              className={styles.input}
            />
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <Button appearance="tertiary">Reset Defaults</Button>
        <Button 
          appearance="primary" 
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Configuration'}
        </Button>
      </div>
    </SectionLayout>
  );
}