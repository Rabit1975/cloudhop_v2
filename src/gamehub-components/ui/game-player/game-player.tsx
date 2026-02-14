import React, { useState, useCallback, useId } from 'react';
import classNames from 'classnames';
import styles from './game-player.module.scss';
import type { GamePlayerProps } from './game-player-type.js';

export function GamePlayer({
  gameUrl,
  platform,
  title,
  coverUrl,
  autoPlay = false,
  className,
  style,
}: GamePlayerProps) {
  const uniqueId = useId();
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isLoading, setIsLoading] = useState(true);

  const handlePlayClick = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Determine iframe source attributes based on platform
  const getIframeProps = () => {
    const commonProps = {
      src: gameUrl,
      // Ensure the title is unique, especially when a specific title is not provided
      title: title ? `${title}` : `Embedded ${platform} Game (${uniqueId})`,
      allowFullScreen: true,
      onLoad: handleLoad,
    };

    if (platform === 'unity') {
      return {
        ...commonProps,
        className: classNames(styles.frame, styles.unityFrame),
        // Unity games might need specific sandbox permissions or heavy feature policies
        allow: 'autoplay; fullscreen; gyroscope; accelerometer; encrypted-media',
      };
    }

    // Default HTML5
    return {
      ...commonProps,
      className: styles.frame,
      allow: 'autoplay; fullscreen; geolocation; microphone; camera; midi',
    };
  };

  const showOverlay = !isPlaying && coverUrl;

  return (
    <div className={classNames(styles.gamePlayer, className)} style={style}>
      {showOverlay ? (
        <div 
          className={styles.overlay} 
          style={{ backgroundImage: `url(${coverUrl})` }}
        >
          <button 
            className={styles.playButton} 
            onClick={handlePlayClick}
            aria-label={`Play ${title || 'Game'}`}
          >
            <svg viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          {title && <div className={styles.titleOverlay}>{title}</div>}
        </div>
      ) : (
        <>
          {isLoading && (
            <div className={styles.loader}>
              <span>Loading {platform === 'unity' ? 'Unity Environment' : 'Game'}...</span>
            </div>
          )}
          <iframe
            {...getIframeProps()}
            style={isLoading ? { opacity: 0 } : { opacity: 1 }}
          />
        </>
      )}
    </div>
  );
}