import React, { useState, useRef, useCallback, type ChangeEvent, type DragEvent } from 'react';
import classNames from 'classnames';
import { Button } from '@cloudrabbit/design.actions.button';
import { TextInput } from '@cloudrabbit/design.inputs.text-input';
import { UploadCloudIcon } from './icons/upload-cloud-icon.js';
import { MusicFileIcon } from './icons/music-file-icon.js';
import { XIcon } from './icons/x-icon.js';
import styles from './audio-upload-input.module.scss';

export type AudioUploadData = {
  file: File;
  title: string;
  artist: string;
};

export type AudioUploadInputProps = {
  /**
   * Callback fired when the upload button is clicked.
   */
  onUpload: (data: AudioUploadData) => void;

  /**
   * Accepted file types.
   * @default "audio/*"
   */
  accept?: string;

  /**
   * Current upload progress (0-100).
   * If provided, shows a progress bar.
   */
  uploadProgress?: number;

  /**
   * Whether the component is in a loading/uploading state.
   */
  isUploading?: boolean;

  /**
   * Error message to display.
   */
  error?: string | null;

  /**
   * Additional class name.
   */
  className?: string;

  /**
   * Inline styles.
   */
  style?: React.CSSProperties;
};

export function AudioUploadInput({
  onUpload,
  accept = 'audio/*',
  uploadProgress = 0,
  isUploading = false,
  error,
  className,
  style,
}: AudioUploadInputProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = useCallback((bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / (k ** i)).toFixed(2))} ${sizes[i]}`;
  }, []);

  const validateAndSetFile = useCallback((file: File) => {
    if (file && file.type.startsWith('audio/')) {
      setSelectedFile(file);
      // Auto-fill title from filename if empty
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  }, [title, setTitle, setSelectedFile]);

  const handleDrag = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        validateAndSetFile(e.dataTransfer.files[0]);
      }
    },
    [validateAndSetFile]
  );

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  }, [validateAndSetFile]);

  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    // Optionally clear metadata, but keeping it might be better UX
  }, []);

  const handleSubmit = useCallback(() => {
    if (selectedFile && title) {
      onUpload({
        file: selectedFile,
        title,
        artist,
      });
    }
  }, [selectedFile, title, artist, onUpload]);

  const isUploadDisabled = !selectedFile || !title || isUploading;

  return (
    <div className={classNames(styles.container, className)} style={style}>
      {!selectedFile ? (
        <div
          className={classNames(styles.dropZone, {
            [styles.active]: dragActive,
            [styles.disabled]: isUploading,
          })}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            className={styles.dropInput}
            onChange={handleChange}
            accept={accept}
            disabled={isUploading}
            aria-label="Upload audio file"
          />
          <div className={styles.iconWrapper}>
            <UploadCloudIcon />
          </div>
          <div className={styles.dropText}>
            <span className={styles.primaryText}>Click or drag audio file to upload</span>
            <span className={styles.secondaryText}>MP3, WAV, or OGG (Max 50MB)</span>
          </div>
        </div>
      ) : (
        <div className={styles.filePreview}>
          <div className={styles.fileIcon}>
            <MusicFileIcon />
          </div>
          <div className={styles.fileDetails}>
            <span className={styles.fileName}>{selectedFile.name}</span>
            <span className={styles.fileSize}>{formatFileSize(selectedFile.size)}</span>
            {(isUploading || uploadProgress > 0) && (
              <div className={styles.progressContainer}>
                <div className={styles.progressBarTrack}>
                  <div
                    className={styles.progressBarFill}
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <div className={styles.progressLabel}>
                  <span>{isUploading ? 'Uploading...' : 'Upload Complete'}</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
              </div>
            )}
          </div>
          {!isUploading && (
            <button
              type="button"
              className={styles.removeButton}
              onClick={handleRemoveFile}
              aria-label="Remove file"
            >
              <XIcon />
            </button>
          )}
        </div>
      )}

      {selectedFile && (
        <div className={styles.metadataForm}>
          <TextInput
            label="Track Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Summer Vibes"
            disabled={isUploading}
            id="track-title"
          />
          <TextInput
            label="Artist (Optional)"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="e.g. The CloudHoppers"
            disabled={isUploading}
            id="track-artist"
          />
        </div>
      )}

      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.actions}>
        <Button
          appearance="primary"
          onClick={handleSubmit}
          disabled={isUploadDisabled}
        >
          {isUploading ? 'Uploading...' : 'Upload Track'}
        </Button>
      </div>
    </div>
  );
}