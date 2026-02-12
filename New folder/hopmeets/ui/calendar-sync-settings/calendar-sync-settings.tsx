import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import {
  useCalendarIntegrations,
  useAddCalendarIntegration,
  useRemoveCalendarIntegration,
  type HopmeetsCalendarIntegration,
} from '@cloudrabbit/hopmeets.hooks.use-calendar-events';
import { Heading } from '@cloudrabbit/design.typography.heading';
import { Paragraph } from '@cloudrabbit/design.typography.paragraph';
import { Button } from '@cloudrabbit/design.actions.button';
import { IntegrationItem } from './integration-item.js';
import styles from './calendar-sync-settings.module.scss';

export type CalendarSyncSettingsProps = {
  /**
   * Additional class names for the container.
   */
  className?: string;

  /**
   * Inline styles for the container.
   */
  style?: React.CSSProperties;

  /**
   * Optional mock data for integrations list to be passed to the hook.
   */
  mockIntegrations?: HopmeetsCalendarIntegration[];
};

export function CalendarSyncSettings({
  className,
  style,
  mockIntegrations,
}: CalendarSyncSettingsProps) {
  const {
    integrations = [],
    loading: listLoading,
    error: listError,
    refetch,
  } = useCalendarIntegrations({ mockData: mockIntegrations });

  const {
    addIntegration,
    loading: addLoading,
    error: addError,
  } = useAddCalendarIntegration();

  const {
    removeIntegration,
    loading: removeLoading,
    error: removeError,
  } = useRemoveCalendarIntegration();

  const [disconnectingId, setDisconnectingId] = useState<string | null>(null);

  const handleConnect = useCallback(
    async (provider: string) => {
      try {
        // In a real app, this would redirect to an OAuth flow or open a popup.
        await addIntegration({
          provider,
          authCode: 'mock-auth-code',
          redirectUri: window.location.origin,
        });
        refetch();
      } catch (err) {
        console.error('Failed to connect calendar', err);
      }
    },
    [addIntegration, refetch]
  );

  const handleDisconnect = useCallback(
    async (id: string) => {
      setDisconnectingId(id);
      try {
        await removeIntegration(id);
        refetch();
      } catch (err) {
        console.error('Failed to disconnect calendar', err);
      } finally {
        setDisconnectingId(null);
      }
    },
    [removeIntegration, refetch]
  );

  const availableProviders = [
    { id: 'google', name: 'Google Calendar' },
    { id: 'outlook', name: 'Outlook Calendar' },
    { id: 'apple', name: 'iCloud Calendar' },
  ];

  return (
    <div
      className={classNames(styles.container, className)}
      style={style}
    >
      <div className={styles.header}>
        <Heading element="h2" visualLevel="h4" className={styles.title}>
          Calendar Synchronization
        </Heading>
        <Paragraph size="medium" className={styles.description}>
          Connect your external calendars to automatically sync meetings and availability with HopMeets.
        </Paragraph>
      </div>

      <div className={styles.section}>
        <Heading element="h3" visualLevel="h6" className={styles.sectionTitle}>
          Connected Calendars
        </Heading>

        {listLoading && <div className={styles.loading}>Loading integrations...</div>}
        
        {listError && (
          <div className={styles.error}>
            Failed to load integrations. Please try again later.
          </div>
        )}

        {!listLoading && !listError && integrations.length === 0 && (
          <div className={styles.emptyState}>
            <Paragraph size="small">No calendars connected yet.</Paragraph>
          </div>
        )}

        <div className={styles.list}>
          {integrations.map((integration) => (
            <IntegrationItem
              key={integration.id}
              integration={integration}
              onDisconnect={handleDisconnect}
              isDisconnecting={disconnectingId === integration.id || removeLoading}
            />
          ))}
        </div>
        {removeError && (
          <div className={styles.error}>
             Failed to disconnect calendar.
          </div>
        )}
      </div>

      <div className={styles.section}>
        <Heading element="h3" visualLevel="h6" className={styles.sectionTitle}>
          Add New Calendar
        </Heading>
        <div className={styles.providers}>
          {availableProviders.map((provider) => (
            <div key={provider.id} className={styles.providerCard}>
              <div className={styles.providerInfo}>
                <div className={classNames(styles.providerIcon, styles[provider.id])}>
                  {provider.name.charAt(0)}
                </div>
                <span className={styles.providerName}>{provider.name}</span>
              </div>
              <Button
                appearance="primary"
                onClick={() => handleConnect(provider.id)}
                disabled={addLoading}
                className={styles.connectButton}
              >
                {addLoading ? 'Connecting...' : 'Connect'}
              </Button>
            </div>
          ))}
        </div>
        {addError && (
          <div className={styles.error}>
             Failed to add calendar. Please try again.
          </div>
        )}
      </div>
    </div>
  );
}