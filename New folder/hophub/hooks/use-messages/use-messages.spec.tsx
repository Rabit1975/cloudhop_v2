import { renderHook, act } from '@testing-library/react';
import React, { type ReactNode } from 'react';
import { MockedProvider, type MockedResponse } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockMessage } from '@cloudrabbit/hophub.entities.message';
import { useListMessages } from './use-list-messages.js';
import { useSendMessage, SEND_MESSAGE_MUTATION } from './use-send-message.js';
import { useMarkMessagesAsRead , MARK_MESSAGES_AS_READ_MUTATION } from './use-mark-messages-as-read.js';

type TestWrapperProps = {
  children?: ReactNode;
  mocks?: MockedResponse[];
};

// This wrapper is for tests that DO NOT make actual GraphQL requests,
// for example, useListMessages when provided with mockData,
// or other components that only rely on the contexts provided by MockProvider.
const NonGraphQLTestWrapper = ({ children }: TestWrapperProps) => {
  return (
    <MockProvider>
      {children}
    </MockProvider>
  );
};

// This wrapper is for tests that make actual GraphQL requests and require mocks.
// It manually sets up the contexts that MockProvider would (router, theme, mock context),
// but places MockedProvider at the outermost layer to ensure it receives the mocks.
const GraphQLTestWrapper = ({ children, mocks = [] }: TestWrapperProps) => {
  return (
    <MockedProvider mocks={mocks} addTypename={false} showWarnings={false}>
      <MockProvider>
        {children}
      </MockProvider>
    </MockedProvider>
  );
};

describe('useListMessages', () => {
  it('should return messages from mock data', () => {
    const mockData = [mockMessage()];
    const { result } = renderHook(() => useListMessages({ conversationId: '123', mockData }), {
      wrapper: NonGraphQLTestWrapper,
    });

    expect(result.current.messages).toEqual(mockData);
    expect(result.current.loading).toBe(false);
  });
});

describe('useSendMessage', () => {
  it('should call sendMessage and return a message', async () => {
    const sendMessageOptions = {
      conversationId: '123',
      text: 'Hello, world!',
    };

    const mocks = [
      {
        request: {
          query: SEND_MESSAGE_MUTATION,
          variables: {
            options: sendMessageOptions,
          },
        },
        result: {
          data: {
            hophubSendMessage: mockMessage({
              id: 'msg-1',
              conversationId: sendMessageOptions.conversationId,
              text: sendMessageOptions.text,
              senderId: 'user-test',
              createdAt: new Date().toISOString(),
            }).toObject(),
          },
        },
      },
    ];

    const { result } = renderHook(() => useSendMessage(), {
      wrapper: ({ children }) => <GraphQLTestWrapper mocks={mocks}>{children}</GraphQLTestWrapper>,
    });

    let sendMessageResult;
    await act(async () => {
      sendMessageResult = await result.current.sendMessage(sendMessageOptions);
    });

    expect(sendMessageResult?.data?.hophubSendMessage).toBeDefined();
    expect(sendMessageResult?.data?.hophubSendMessage.text).toBe(sendMessageOptions.text);
    expect(result.current.data?.text).toBe(sendMessageOptions.text);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });
});

describe('useMarkMessagesAsRead', () => {
  it('should call markMessagesAsRead', async () => {
    const markMessagesAsReadOptions = {
      conversationId: '123',
      lastReadMessageId: '456',
    };

    const mocks = [
      {
        request: {
          query: MARK_MESSAGES_AS_READ_MUTATION,
          variables: {
            options: markMessagesAsReadOptions,
          },
        },
        result: {
          data: {
            hophubMarkMessagesAsRead: {
              id: markMessagesAsReadOptions.conversationId,
              unreadCount: 0,
            },
          },
        },
      },
    ];

    const { result } = renderHook(() => useMarkMessagesAsRead(), {
      wrapper: ({ children }) => <GraphQLTestWrapper mocks={mocks}>{children}</GraphQLTestWrapper>,
    });

    let markMessagesAsReadResult;
    await act(async () => {
      markMessagesAsReadResult = await result.current.markMessagesAsRead(markMessagesAsReadOptions);
    });

    expect(markMessagesAsReadResult?.data?.hophubMarkMessagesAsRead).toBeDefined();
    expect(markMessagesAsReadResult?.data?.hophubMarkMessagesAsRead.unreadCount).toBe(0);
    expect(result.current.data?.unreadCount).toBe(0);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });
});