import React from 'react';
import classNames from 'classnames';
import { type PlainAsset } from '@cloudrabbit/spaces.entities.asset';
import { Image } from '@cloudrabbit/design.content.image';
import { Paragraph } from '@cloudrabbit/design.typography.paragraph';
import { Icon } from '@cloudrabbit/design.content.icon';
import { FileIconPath, ImageIconPath, VideoIconPath, AudioIconPath } from './file-icons.js';
import styles from './asset-preview.module.scss';

export type AssetPreviewProps = {
  /**
   * The asset to preview.
   */
  asset: PlainAsset;

  /**
   * Optional click handler for the asset preview.
   */
  onClick?: (asset: PlainAsset) => void;

  /**
   * Custom class name for the container.
   */
  className?: string;

  /**
   * Custom styles for the container.
   */
  style?: React.CSSProperties;
};

export function AssetPreview({ asset, onClick, className, style }: AssetPreviewProps) {
  const isImage = asset.type.startsWith('image/');
  const isVideo = asset.type.startsWith('video/');
  const isAudio = asset.type.startsWith('audio/');
  
  const handleOnClick = () => {
    if (onClick) {
      onClick(asset);
    }
  };

  const renderIcon = () => {
    if (isImage) return <ImageIconPath />;
    if (isVideo) return <VideoIconPath />;
    if (isAudio) return <AudioIconPath />;
    return <FileIconPath />;
  };

  return (
    <div
      className={classNames(
        styles.assetPreview,
        { [styles.clickable]: !!onClick },
        className
      )}
      style={style}
      onClick={handleOnClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick(asset);
        }
      }}
    >
      <div className={styles.previewArea}>
        {isImage ? (
          <Image
            src={asset.url || asset.thumbnailUrl}
            alt={asset.name}
            className={styles.imagePreview}
          />
        ) : (
          <Icon size={48} className={styles.iconPreview}>
            {renderIcon()}
          </Icon>
        )}
      </div>
      <div className={styles.details}>
        <Paragraph className={styles.name} size="medium" element="span">
          {asset.name}
        </Paragraph>
        <span className={styles.type}>{asset.type}</span>
      </div>
    </div>
  );
}