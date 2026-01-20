// preload.ts
// CloudHop OS - Electron Preload Bridge
// Safe, sandbox-approved bridge for exposing Twitch API to renderer

import { contextBridge, ipcRenderer } from "electron";

// Twitch API Bridge
contextBridge.exposeInMainWorld("twitch", {
  getFollowedStreams: () => ipcRenderer.invoke("twitch:getFollowedStreams"),
  getRecommendedStreams: () => ipcRenderer.invoke("twitch:getRecommendedStreams"),
  getStreamInfo: (channel: string) =>
    ipcRenderer.invoke("twitch:getStreamInfo", channel),
  getChatMessages: (channel: string) =>
    ipcRenderer.invoke("twitch:getChatMessages", channel),
});
