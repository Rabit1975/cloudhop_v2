import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { useCreateChannel } from '@cloudrabbit/hophub.hooks.use-channels';
import { useCreateDirectMessage } from '@cloudrabbit/hophub.hooks.use-direct-messages';
import { vi, type Mock } from 'vitest';
import styles from './create-conversation-modal.module.scss';
import { CreateConversationModal } from './create-conversation-modal.js';

// Mock the hooks to control their return values in tests
const mockCreateChannel = vi.fn();
const mockCreateDirectMessage = vi.fn();

vi.mock('@cloudrabbit/hophub.hooks.use-channels', () => ({
  useCreateChannel: vi.fn(() => ({
    createChannel: mockCreateChannel,
    loading: false,
    error: undefined,
  })),
}));

vi.mock('@cloudrabbit/hophub.hooks.use-direct-messages', () => ({
  useCreateDirectMessage: vi.fn(() => ({
    createDirectMessage: mockCreateDirectMessage,
    loading: false,
    error: undefined,
  })),
}));

describe('CreateConversationModal', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockCreateChannel.mockReset().mockResolvedValue(undefined);
    mockCreateDirectMessage.mockReset().mockResolvedValue(undefined);
    (useCreateChannel as Mock).mockReturnValue({
      createChannel: mockCreateChannel,
      loading: false,
      error: undefined,
    });
    (useCreateDirectMessage as Mock).mockReturnValue({
      createDirectMessage: mockCreateDirectMessage,
      loading: false,
      error: undefined,
    });
  });

  it('should render the modal when isOpen is true', () => {
    render(
      <MockProvider>
        <CreateConversationModal isOpen onClose={() => {}} />
      </MockProvider>
    );

    expect(screen.getByRole('dialog', { name: 'Create Conversation' })).toBeInTheDocument();
    expect(screen.getByText('New Channel')).toBeInTheDocument();
  });

  it('should not render the modal when isOpen is false', () => {
    render(
      <MockProvider>
        <CreateConversationModal isOpen={false} onClose={() => {}} />
      </MockProvider>
    );
    expect(screen.queryByRole('dialog', { name: 'Create Conversation' })).not.toBeInTheDocument();
  });

  it('should close the modal when the close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <MockProvider>
        <CreateConversationModal isOpen onClose={onClose} />
      </MockProvider>
    );

    const closeButton = screen.getByRole('button', { name: 'Close modal' });
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  it('should call createChannel hook and close modal with channel name', async () => {
    const onClose = vi.fn();
    render(
      <MockProvider>
        <CreateConversationModal isOpen onClose={onClose} />
      </MockProvider>
    );

    const channelNameInput = screen.getByLabelText('Channel Name') as HTMLInputElement;
    fireEvent.change(channelNameInput, { target: { value: 'testChannel' } });

    const createButton = screen.getByRole('button', { name: 'Create Channel' });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(mockCreateChannel).toHaveBeenCalledWith('testChannel', '');
      expect(onClose).toHaveBeenCalled();
    });
  });

  it('should call createDirectMessage hook and close modal with user ids', async () => {
    const onClose = vi.fn();
    render(
      <MockProvider>
        <CreateConversationModal isOpen onClose={onClose} />
      </MockProvider>
    );

    // Click the SelectList trigger to open options
    const selectListTrigger = screen.getByRole('button', { name: /New Channel/i });
    fireEvent.click(selectListTrigger);

    // Select "Direct Message" type
    const dmOption = screen.getByText('Direct Message');
    fireEvent.click(dmOption);

    // Input user IDs
    const userIdInput = screen.getByLabelText('User ID(s)') as HTMLInputElement;
    fireEvent.change(userIdInput, { target: { value: 'user1, user2' } });

    const startMessageButton = screen.getByRole('button', { name: 'Start Message' });
    fireEvent.click(startMessageButton);

    await waitFor(() => {
      expect(mockCreateDirectMessage).toHaveBeenCalledWith(['user1', 'user2']);
      expect(onClose).toHaveBeenCalled();
    });
  });

  it('should display initialUserId when provided and switch to DM type', () => {
    render(
      <MockProvider>
        <CreateConversationModal isOpen onClose={() => {}} initialUserId="testUser123" />
      </MockProvider>
    );

    // Expect DM tab to be active
    expect(screen.getByRole('button', { name: /Direct Message/i })).toBeInTheDocument();

    const userIdInput = screen.getByLabelText('User ID(s)') as HTMLInputElement;
    expect(userIdInput.value).toBe('testUser123');
  });

  it('should show an error message if channel creation fails', async () => {
    const error = new Error('Failed to create channel');
    (useCreateChannel as Mock).mockReturnValue({
      createChannel: mockCreateChannel.mockRejectedValue(error),
      loading: false,
      error,
    });
    const onClose = vi.fn();

    render(
      <MockProvider>
        <CreateConversationModal isOpen onClose={onClose} />
      </MockProvider>
    );

    const channelNameInput = screen.getByLabelText('Channel Name') as HTMLInputElement;
    fireEvent.change(channelNameInput, { target: { value: 'invalidChannel' } });

    const createButton = screen.getByRole('button', { name: 'Create Channel' });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(screen.getByText('Failed to create channel')).toBeInTheDocument();
      expect(onClose).not.toHaveBeenCalled(); // Modal should not close on error
    });
  });

  it('should disable buttons when loading', () => {
    (useCreateChannel as Mock).mockReturnValue({
      createChannel: mockCreateChannel,
      loading: true, // Set loading to true
      error: undefined,
    });
    render(
      <MockProvider>
        <CreateConversationModal isOpen onClose={() => {}} />
      </MockProvider>
    );

    expect(screen.getByRole('button', { name: 'Creating...' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
    expect(screen.getByLabelText('Channel Name')).toBeDisabled();
    expect(screen.getByLabelText('Description')).toBeDisabled();
  });
});