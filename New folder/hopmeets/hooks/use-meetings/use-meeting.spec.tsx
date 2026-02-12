import { renderHook } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockMeeting } from '@cloudrabbit/hopmeets.entities.meeting';
import { useMeeting } from './use-meeting.js';

it('should return the meeting data', () => {
  const meetingMock = mockMeeting();
  const { result } = renderHook(() => useMeeting({
    meetingOptions: { meetingId: meetingMock.id },
    mockData: meetingMock
  }), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    )
  });

  expect(result.current.meeting?.id).toBe(meetingMock.id);
});

it('should return loading as false when mockData is provided', async () => {
  const meetingMock = mockMeeting();
  const { result } = renderHook(() => useMeeting({
    meetingOptions: { meetingId: meetingMock.id },
    mockData: meetingMock
  }), {
    wrapper: ({ children }) => (
      <MockProvider>
        {children}
      </MockProvider>
    )
  });

  expect(result.current.loading).toBe(false);
});