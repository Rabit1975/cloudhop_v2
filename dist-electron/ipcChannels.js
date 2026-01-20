"use strict";
// IPC Channels for Electron communication
Object.defineProperty(exports, "__esModule", { value: true });
exports.IPC_CHANNELS = void 0;
exports.IPC_CHANNELS = {
    // Music Engine channels
    MUSIC_PLAY: 'music:play',
    MUSIC_PAUSE: 'music:pause',
    MUSIC_STOP: 'music:stop',
    MUSIC_NEXT: 'music:next',
    MUSIC_PREVIOUS: 'music:previous',
    MUSIC_SET_VOLUME: 'music:setVolume',
    MUSIC_GET_STATE: 'music:getState',
    MUSIC_LOAD_TRACK: 'music:loadTrack',
    // GFN (GeForce NOW) channels
    GFN_CONNECT: 'gfn:connect',
    GFN_DISCONNECT: 'gfn:disconnect',
    GFN_GET_STATUS: 'gfn:getStatus',
    GFN_START_STREAM: 'gfn:startStream',
    GFN_STOP_STREAM: 'gfn:stopStream',
    GFN_SET_QUALITY: 'gfn:setQuality',
    // System channels
    SYSTEM_GET_INFO: 'system:getInfo',
    SYSTEM_MINIMIZE: 'system:minimize',
    SYSTEM_MAXIMIZE: 'system:maximize',
    SYSTEM_CLOSE: 'system:close',
    // Audio analysis channels
    AUDIO_START_ANALYSIS: 'audio:startAnalysis',
    AUDIO_STOP_ANALYSIS: 'audio:stopAnalysis',
    AUDIO_GET_FEATURES: 'audio:getFeatures'
};
