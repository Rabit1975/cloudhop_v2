'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useVisibility } from '../hooks/useVisibility';

interface MediaEmbedProps {
  url: string;
  className?: string;
}

export default function MediaEmbed({ url, className }: MediaEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const platform = detectPlatform(url);
  const src = buildEmbedUrl(platform, url);

  /* -----------------------------
     CPU THROTTLING: VISIBILITY WATCHER
  ------------------------------ */
  const { ref: visibilityRef } = useVisibility('MediaEmbed');

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        const isIntersecting = entry.isIntersecting;
        setIsVisible(isIntersecting);

        // Pause/resume media based on visibility
        if (iframeRef.current && !isIntersecting) {
          pauseMedia(platform, iframeRef.current);
        } else if (iframeRef.current && isIntersecting) {
          playMedia(platform, iframeRef.current);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [platform]);

  /* -----------------------------
     IF NOT VISIBLE → PAUSE (NO IFRAME)
  ------------------------------ */
  if (!isVisible) {
    return (
      <div ref={containerRef} className={className ?? 'w-full h-full bg-black/20 rounded-lg'}>
        {/* Placeholder to keep layout stable */}
        <div className="flex items-center justify-center h-full text-white/40">
          <div className="text-center">
            <div className="text-2xl mb-2">⏸️</div>
            <div className="text-sm">Media paused</div>
          </div>
        </div>
      </div>
    );
  }

  /* -----------------------------
     VISIBLE → RENDER IFRAME
  ------------------------------ */
  return (
    <div ref={containerRef} className={className ?? 'w-full h-full'}>
      <iframe
        ref={iframeRef}
        src={src}
        frameBorder="0"
        allowFullScreen
        {...iframeAttributes(platform)}
        className="w-full h-full"
      />
    </div>
  );
}

/* -----------------------------
   PLATFORM DETECTION
------------------------------ */
function detectPlatform(url: string) {
  if (url.includes('music.youtube.com')) return 'youtube_music';
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  if (url.includes('player.twitch.tv')) return 'twitch_player';
  if (url.includes('twitch.tv') && url.includes('chat')) return 'twitch_chat';
  if (url.includes('twitch.tv')) return 'twitch_player';
  return 'unknown';
}

/* -----------------------------
   EMBED URL BUILDER
------------------------------ */
function buildEmbedUrl(platform: string, url: string) {
  switch (platform) {
    case 'youtube_music': {
      const id = extractYouTubeId(url);
      return `https://music.youtube.com/embed/${id}?autoplay=1&enablejsapi=1&origin=https://cloudhop.cloud`;
    }
    case 'youtube': {
      const id = extractYouTubeId(url);
      return `https://www.youtube.com/embed/${id}?autoplay=1&enablejsapi=1&modestbranding=1&origin=https://cloudhop.cloud`;
    }
    case 'twitch_player': {
      const channel = extractTwitchChannel(url);
      return `https://player.twitch.tv/?channel=${channel}&parent=cloudhop.cloud`;
    }
    case 'twitch_chat': {
      const channel = extractTwitchChannel(url);
      return `https://www.twitch.tv/embed/${channel}/chat?parent=cloudhop.cloud`;
    }
    default:
      return url;
  }
}

/* -----------------------------
   IFRAME ATTRIBUTES PER PLATFORM
------------------------------ */
function iframeAttributes(platform: string) {
  const sandbox = 'allow-same-origin allow-scripts allow-popups allow-forms';

  switch (platform) {
    case 'youtube_music':
      return { allow: 'autoplay; encrypted-media', sandbox };
    case 'youtube':
      return {
        allow: 'autoplay; encrypted-media; fullscreen; picture-in-picture',
        sandbox,
      };
    case 'twitch_player':
      return { allow: 'autoplay; fullscreen', sandbox };
    case 'twitch_chat':
      return { sandbox };
    default:
      return {};
  }
}

/* -----------------------------
   MEDIA CONTROL FUNCTIONS
------------------------------ */
function pauseMedia(platform: string, iframe: HTMLIFrameElement) {
  if (!iframe.contentWindow) return;

  switch (platform) {
    case 'youtube_music':
    case 'youtube':
      iframe.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: 'pauseVideo',
        }),
        '*'
      );
      break;
    case 'twitch_player':
      iframe.contentWindow.postMessage({ event: 'pause' }, '*');
      break;
  }
}

function playMedia(platform: string, iframe: HTMLIFrameElement) {
  if (!iframe.contentWindow) return;

  switch (platform) {
    case 'youtube_music':
    case 'youtube':
      iframe.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: 'playVideo',
        }),
        '*'
      );
      break;
    case 'twitch_player':
      iframe.contentWindow.postMessage({ event: 'play' }, '*');
      break;
  }
}

/* -----------------------------
   HELPERS
------------------------------ */
function extractYouTubeId(url: string) {
  const match =
    url.match(/v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/) || url.match(/embed\/([^?]+)/);
  return match ? match[1] : '';
}

function extractTwitchChannel(url: string) {
  const match = url.match(/twitch\.tv\/([^/?]+)/);
  return match ? match[1] : '';
}
