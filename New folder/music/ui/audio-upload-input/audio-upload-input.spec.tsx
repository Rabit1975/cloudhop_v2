import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { AudioUploadInput, type AudioUploadData } from './audio-upload-input.js';
import styles from './audio-upload-input.module.scss';

describe('AudioUploadInput', () => {
  it('should render the component with initial state', () => {
    const { container } = render(
      <MockProvider>
        <AudioUploadInput onUpload={() => {}} />
      </MockProvider>
    );

    const dropZone = container.querySelector(`.${styles.dropZone}`);
    expect(dropZone).toBeInTheDocument();
  });

  it('should call onUpload with correct data when a file is selected and upload button is clicked', async () => {
    const onUploadMock = vi.fn();
    const fileName = 'test-audio.mp3';
    const file = new File(['audio content'], fileName, { type: 'audio/mp3' });

    const { container } = render(
      <MockProvider>
        <AudioUploadInput onUpload={onUploadMock} />
      </MockProvider>
    );

    const inputElement = container.querySelector(`.${styles.dropInput}`) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { files: [file] } });

    const titleInput = container.querySelector<HTMLInputElement>('#track-title');
    expect(titleInput).not.toBeNull();
    if (titleInput) {
      fireEvent.change(titleInput, { target: { value: 'Test Track' } });
    }

    const uploadButton = container.querySelector(`.${styles.actions} button`);
    expect(uploadButton).not.toBeNull();
    if (uploadButton) {
      fireEvent.click(uploadButton);
    }

    await waitFor(() => {
      expect(onUploadMock).toHaveBeenCalledTimes(1);
      const expectedData: AudioUploadData = {
        file,
        title: 'Test Track',
        artist: '',
      };
      expect(onUploadMock).toHaveBeenCalledWith(expectedData);
    });
  });

  it('should display an error message when an error prop is provided', () => {
    const errorMessage = 'Test error message';
    const { container } = render(
      <MockProvider>
        <AudioUploadInput onUpload={() => {}} error={errorMessage} />
      </MockProvider>
    );
    const errorElement = container.querySelector(`.${styles.errorMessage}`);
    expect(errorElement).toHaveTextContent(errorMessage);
  });
});