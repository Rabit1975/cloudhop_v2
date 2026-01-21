import React from 'react'
import { useMeeting } from './useMeeting'
import MeetingsModule from '../../meetings/MeetingsModule'

export default function MeetingChannel({ channelId }) {
  const { inCall, callActive, participants, startCall, joinCall, leaveCall } = useMeeting(channelId)

  if (inCall) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#1a1a2e' }}>
        {/* Call Controls Header */}
        <div style={{
          padding: '16px 24px',
          background: '#0f3460',
          borderBottom: '1px solid #e94560',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#4ade80',
              animation: 'pulse 2s infinite'
            }} />
            <span style={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}>
              Call Active · {participants} participant{participants !== 1 ? 's' : ''}
            </span>
          </div>
          <button
            onClick={leaveCall}
            style={{
              padding: '10px 20px',
              background: '#ef4444',
              border: 'none',
              borderRadius: '6px',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600
            }}
          >
            Leave Call
          </button>
        </div>

        {/* Embedded Meeting UI */}
        <div style={{ flex: 1 }}>
          <MeetingsModule />
        </div>
      </div>
    )
  }

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#1a1a2e',
      gap: '24px'
    }}>
      {callActive ? (
        <>
          <div style={{
            textAlign: 'center',
            color: '#fff'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎥</div>
            <h2 style={{ margin: '0 0 12px 0', fontSize: '24px', fontWeight: 600 }}>
              Meeting in Progress
            </h2>
            <p style={{ margin: 0, color: '#aaa', fontSize: '16px' }}>
              {participants} participant{participants !== 1 ? 's' : ''} currently in the call
            </p>
          </div>
          <button
            onClick={joinCall}
            style={{
              padding: '16px 32px',
              background: '#4ade80',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(74, 222, 128, 0.3)'
            }}
          >
            Join Call
          </button>
        </>
      ) : (
        <>
          <div style={{
            textAlign: 'center',
            color: '#fff'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>📞</div>
            <h2 style={{ margin: '0 0 12px 0', fontSize: '24px', fontWeight: 600 }}>
              No Active Meeting
            </h2>
            <p style={{ margin: 0, color: '#aaa', fontSize: '16px' }}>
              Start a call to begin the meeting
            </p>
          </div>
          <button
            onClick={startCall}
            style={{
              padding: '16px 32px',
              background: '#e94560',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(233, 69, 96, 0.3)'
            }}
          >
            Start Call
          </button>
        </>
      )}
    </div>
  )
}
