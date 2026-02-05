import { useDJQueue } from '../dj/DJQueue'

export interface DJDiagnosticInfo {
  queueLength: number
  historyLength: number
  topVotedTrack: any
}

export function getDJDiagnostics(): DJDiagnosticInfo {
  const state = useDJQueue.getState()
  
  const topVoted = state.queue.length > 0
    ? state.queue.reduce((max, item) => item.votes > max.votes ? item : max, state.queue[0])
    : null

  return {
    queueLength: state.queue.length,
    historyLength: state.history.length,
    topVotedTrack: topVoted
  }
}

export function formatDJDiagnostics(info: DJDiagnosticInfo): string {
  return `
DJ System Diagnostics:
- Queue Length: ${info.queueLength}
- History Length: ${info.historyLength}
- Top Voted: ${info.topVotedTrack ? `${info.topVotedTrack.track.title} (${info.topVotedTrack.votes} votes)` : 'None'}
  `.trim()
}
