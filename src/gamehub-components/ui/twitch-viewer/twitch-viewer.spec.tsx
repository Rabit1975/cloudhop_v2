import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { TwitchViewer } from './twitch-viewer.js';

it('should render the Twitch iframe with channel name', () => {
  const { container } = render(
    <MockProvider>
      <TwitchViewer channelName="testchannel" />
    </MockProvider>
  );
  const iframe = container.querySelector('iframe');
  expect(iframe).toBeTruthy();
  expect(iframe?.src).toContain('channel=testchannel');
});

it('should render the Twitch iframe with stream URL', () => {
  const { container } = render(
    <MockProvider>
      <TwitchViewer twitchStreamUrl="https://www.twitch.tv/testchannel" />
    </MockProvider>
  );
  const iframe = container.querySelector('iframe');
  expect(iframe).toBeTruthy();
  expect(iframe?.src).toContain('channel=testchannel');
});

it('should render a placeholder when channel is not found', () => {
  const { container } = render(
    <MockProvider>
      <TwitchViewer />
    </MockProvider>
  );
  const placeholder = container.querySelector('div');
  expect(placeholder).toBeTruthy();
});