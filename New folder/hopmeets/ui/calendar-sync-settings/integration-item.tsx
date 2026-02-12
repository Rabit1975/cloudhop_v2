import React, { useCallback } from 'react';
import classNames from 'classnames';
import { Button } from '@cloudrabbit/design.actions.button';
import { Paragraph } from '@cloudrabbit/design.typography.paragraph';
import type { HopmeetsCalendarIntegration } from '@cloudrabbit/hopmeets.hooks.use-calendar-events';
import styles from './integration-item.module.scss';

export type IntegrationItemProps = {
  /**
   * The integration data to display.
   */
  integration: HopmeetsCalendarIntegration;

  /**
   * Callback fired when the disconnect button is clicked.
   */
  onDisconnect: (integrationId: string) => void;

  /**
   * Whether the item is currently being disconnected.
   */
  isDisconnecting?: boolean;

  /**
   * Additional class name.
   */
  className?: string;
};

export function IntegrationItem({
  integration,
  onDisconnect,
  isDisconnecting = false,
  className,
}: IntegrationItemProps) {
  const handleDisconnect = useCallback(() => {
    onDisconnect(integration.id);
  }, [onDisconnect, integration.id]);

  const providerName =
    integration.provider.charAt(0).toUpperCase() + integration.provider.slice(1);

  return (
    <div className={classNames(styles.item, className)}>
      <div className={styles.info}>
        <div className={classNames(styles.iconPlaceholder, styles[integration.provider])}>
          {integration.provider.charAt(0).toUpperCase()}
        </div>
        <div className={styles.details}>
          <div className={styles.provider}>{providerName} Calendar</div>
          <Paragraph size="small" className={styles.email}>
            {integration.email}
          </Paragraph>
          <span className={styles.connectedAt}>
            Connected on {new Date(integration.connectedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <Button
        appearance="secondary"
        onClick={handleDisconnect}
        disabled={isDisconnecting}
        className={styles.disconnectButton}
      >
        {isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
      </Button>
    </div>
  );
}