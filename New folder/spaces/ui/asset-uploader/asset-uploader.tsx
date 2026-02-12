import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import classNames from 'classnames';
import { Button } from '@cloudrabbit/design.actions.button';
import { Spinner } from '@cloudrabbit/design.loaders.spinner';
import { Icon } from '@cloudrabbit/design.content.icon';
import { AssetPreview } from '@cloudrabbit/spaces.ui.asset-preview';
import { useAssets, useUploadAsset, useDeleteAsset } from '@cloudrabbit/spaces.hooks.use-assets';
import { Asset, type PlainAsset } from '@cloudrabbit/spaces.entities.asset';
import { UploadIconPath, DeleteIconPath } from './upload-icon.js';
import styles from './asset-uploader.module.scss';

export type AssetUploaderProps = {
  /**
   * The ID of the space to upload assets to.
   */
  spaceId: string;

  /**
   * Optional content ID to associate uploaded assets with.
   */
  contentId?: string;

  /**
   * Optional mock data for previewing or testing without a backend.
   */
  mockAssets?: Asset[];

  /**
   * Custom class name for the container.
   */
  className?: string;

  /**
   * Callback triggered when an asset is successfully uploaded.
   */
  onUploadComplete?: (asset: PlainAsset) => void;
};

export function AssetUploader({
  spaceId,
  contentId,
  mockAssets,
  className,
  onUploadComplete,
}: AssetUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { assets, loading: listLoading, refetch } = useAssets({ 
    spaceId, 
    contentId,
    mockData: mockAssets 
  });
  
  const { uploadAsset, loading: uploadLoading } = useUploadAsset();
  const { deleteAsset, loading: deleteLoading } = useDeleteAsset();

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFile = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const result = reader.result as string;
      
      try {
        const uploadedAsset = await uploadAsset({
          spaceId,
          filename: file.name,
          mimeType: file.type,
          fileData: result,
          metadata: contentId ? { contentId } : undefined,
        });

        if (uploadedAsset) {
          refetch();
          if (onUploadComplete) {
            onUploadComplete(uploadedAsset.toObject());
          }
        }
      } catch (error) {
        console.error('Upload failed:', error);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      Array.from(e.dataTransfer.files).forEach(processFile);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      Array.from(e.target.files).forEach(processFile);
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleDelete = async (assetId: string) => {
    try {
      await deleteAsset({ spaceId, assetId });
      refetch();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const isLoading = uploadLoading || deleteLoading;

  return (
    <div className={classNames(styles.assetUploader, className)}>
      <div
        className={classNames(styles.uploadZone, {
          [styles.dragging]: isDragging,
          [styles.disabled]: isLoading,
        })}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClickUpload}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClickUpload();
          }
        }}
      >
        <Icon size={48} className={styles.uploadIcon}>
          <UploadIconPath />
        </Icon>
        <h3 className={styles.uploadText}>
          Drag & drop files here
        </h3>
        <p className={styles.uploadSubtext}>
          or click to browse from your computer
        </p>
        <Button 
          appearance="primary" 
          disabled={isLoading} 
          onClick={(e) => {
            e.stopPropagation();
            handleClickUpload();
          }}
        >
          Select Files
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          className={styles.fileInput}
          onChange={handleFileSelect}
          multiple
          accept="image/*,video/*,application/pdf"
          data-testid="file-input"
        />
        
        {isLoading && (
          <div className={styles.loadingOverlay}>
            <Spinner size="large" variant="primary" />
          </div>
        )}
      </div>

      <div className={styles.assetList}>
        {listLoading ? (
           <div style={{ gridColumn: '1/-1', display: 'flex', justifyContent: 'center', padding: '32px' }}>
             <Spinner size="medium" variant="secondary" />
           </div>
        ) : assets.length > 0 ? (
          assets.map((assetEntity) => {
            const asset = assetEntity.toObject();
            return (
              <div key={asset.id} className={styles.assetItemWrapper}>
                <AssetPreview asset={asset} />
                <button
                  className={styles.deleteButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(asset.id);
                  }}
                  aria-label="Delete asset"
                  type="button"
                >
                  <Icon size={16} color="currentColor">
                    <DeleteIconPath />
                  </Icon>
                </button>
              </div>
            );
          })
        ) : (
          <div className={styles.emptyState}>
            No assets uploaded yet.
          </div>
        )}
      </div>
    </div>
  );
}