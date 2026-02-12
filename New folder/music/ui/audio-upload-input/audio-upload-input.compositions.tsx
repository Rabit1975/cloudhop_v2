import React, { useState, useCallback } from 'react';
import { CloudrabbitTheme } from '@cloudrabbit/design.cloudrabbit-theme';
import { AudioUploadInput, type AudioUploadData } from './audio-upload-input.js';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <CloudrabbitTheme>
    <div style={{
      padding: '48px',
      backgroundColor: 'var(--colors-surface-background)',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start'
    }}>
      {children}
    </div>
  </CloudrabbitTheme>
);

export const BasicUsage = () => {
  const handleUpload = useCallback((data: AudioUploadData) => {
    console.log('Upload triggered:', data);
    alert(`Ready to upload "${data.title}" by ${data.artist || 'Unknown'}`);
  }, []);

  return (
    <Wrapper>
      <AudioUploadInput onUpload={handleUpload} />
    </Wrapper>
  );
};

export const SimulatedUploadProcess = () => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [complete, setComplete] = useState(false);

  const handleUpload = useCallback((data: AudioUploadData) => {
    setIsUploading(true);
    setProgress(0);
    setComplete(false);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  }, [setIsUploading, setProgress, setComplete]);

  const handleUploadAnother = useCallback(() => {
    setComplete(false);
    setProgress(0);
  }, [setComplete, setProgress]);

  return (
    <Wrapper>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '500px' }}>
        <h3 style={{ margin: 0, color: 'var(--colors-text-primary)' }}>Music Studio Upload</h3>
        {complete ? (
          <div style={{
            padding: '24px',
            backgroundColor: 'var(--colors-status-positive-subtle)',
            color: 'var(--colors-status-positive-default)',
            borderRadius: '8px',
            textAlign: 'center',
            border: '1px solid var(--colors-status-positive-default)'
          }}>
            <strong>Success!</strong> Your track has been uploaded to the library.
            <button
              onClick={handleUploadAnother}
              style={{
                display: 'block',
                margin: '16px auto 0',
                padding: '8px 16px',
                background: 'transparent',
                border: '1px solid currentColor',
                borderRadius: '4px',
                cursor: 'pointer',
                color: 'inherit'
              }}
            >
              Upload Another
            </button>
          </div>
        ) : (
          <AudioUploadInput
            onUpload={handleUpload}
            isUploading={isUploading}
            uploadProgress={progress}
          />
        )}
      </div>
    </Wrapper>
  );
};

export const WithErrorState = () => {
  const handleUpload = useCallback((data: AudioUploadData) => {
    console.log('Upload triggered for error state:', data);
    alert('Upload failed due to error prop');
  }, []);

  return (
    <Wrapper>
      <AudioUploadInput
        onUpload={handleUpload}
        error="File too large. Please upload files smaller than 50MB."
      />
    </Wrapper>
  );
};

export const DarkModeUsage = () => {
  const handleUpload = useCallback((data: AudioUploadData) => {
    console.log('Upload triggered for dark mode:', data);
    alert(`Ready to upload (Dark Mode) "${data.title}" by ${data.artist || 'Unknown'}`);
  }, []);

  return (
    <CloudrabbitTheme initialTheme="dark">
      <div style={{
        padding: '48px',
        backgroundColor: 'var(--colors-surface-background)',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}>
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <h2 style={{
            color: 'var(--colors-text-primary)',
            marginBottom: '24px',
            fontFamily: 'var(--typography-font-family)'
          }}>
            Upload to Nebula
          </h2>
          <AudioUploadInput onUpload={handleUpload} />
        </div>
      </div>
    </CloudrabbitTheme>
  );
};