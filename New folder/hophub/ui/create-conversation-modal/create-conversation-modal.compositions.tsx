import React, { useState } from 'react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { Button } from '@cloudrabbit/design.actions.button';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { CreateConversationModal } from './create-conversation-modal.js';

export const BasicCreateConversation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MockProvider>
      <div style={{
        padding: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '400px',
        backgroundImage: 'url(https://storage.googleapis.com/bit-generated-images/images/image_abstract_digital_network_conne_0_1770835231719.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        <div style={{
          marginBottom: '20px',
          padding: '24px',
          backgroundColor: 'var(--colors-surface-background)',
          borderRadius: 'var(--borders-radius-large)',
          boxShadow: 'var(--effects-shadows-large)',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <h3 style={{ margin: '0 0 16px', color: 'var(--colors-text-primary)' }}>Conversation Manager</h3>
          <p style={{ margin: '0 0 24px', color: 'var(--colors-text-secondary)' }}>
            Start a new community channel or direct message to connect with others in the nebula.
          </p>
          <Button appearance="primary" onClick={() => setIsOpen(true)}>
            Start New Conversation
          </Button>
        </div>
        <CreateConversationModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    </MockProvider>
  );
};

export const DirectMessagePreselect = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <MockProvider>
      <div style={{
        padding: '50px',
        minHeight: '600px',
        backgroundColor: 'var(--colors-surface-background)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Button appearance="secondary" onClick={() => setIsOpen(true)}>
          Message User @nebula_walker
        </Button>
        <CreateConversationModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          initialUserId="nebula_walker"
        />
      </div>
    </MockProvider>
  );
};

export const DarkThemeModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <MockProvider noTheme>
      <CloudrabbitTheme initialTheme="dark">
        <div style={{
          padding: '50px',
          minHeight: '600px',
          backgroundColor: 'var(--colors-surface-background)',
          color: 'var(--colors-text-primary)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Button appearance="primary" onClick={() => setIsOpen(true)}>
            Open Dark Modal
          </Button>
          <CreateConversationModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        </div>
      </CloudrabbitTheme>
    </MockProvider>
  );
};