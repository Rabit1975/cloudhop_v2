import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { Asset } from '@cloudrabbit/spaces.entities.asset';
import * as useAssetsHooks from '@cloudrabbit/spaces.hooks.use-assets';
import { AssetUploader } from './asset-uploader.js';
import styles from './asset-uploader.module.scss';

describe('AssetUploader', () => {
  const spaceId = 'test-space';
  const mockRefetch = vi.fn();
  const mockUploadAssetFn = vi.fn();
  const mockDeleteAssetFn = vi.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();

    // Spy on the hooks and provide default mock implementations
    vi.spyOn(useAssetsHooks, 'useAssets').mockReturnValue({
      assets: [],
      loading: false,
      error: undefined,
      refetch: mockRefetch,
    });
    vi.spyOn(useAssetsHooks, 'useUploadAsset').mockReturnValue({
      uploadAsset: mockUploadAssetFn.mockImplementation(async () => 
        new Asset('new-asset-id', spaceId, 'uploaded.png', 'image/png', 'http://example.com/uploaded.png', 200, new Date().toISOString(), 'uploader-id')
      ),
      loading: false,
      error: undefined,
    });
    vi.spyOn(useAssetsHooks, 'useDeleteAsset').mockReturnValue({
      deleteAsset: mockDeleteAssetFn.mockImplementation(async () => true),
      loading: false,
      error: undefined,
    });
  });

  it('should render the drag and drop area', () => {
    render(
      <MockProvider>
        <AssetUploader spaceId={spaceId} />
      </MockProvider>
    );

    expect(screen.getByText('Drag & drop files here')).toBeInTheDocument();
    expect(screen.getByText('or click to browse from your computer')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Select Files' })).toBeInTheDocument();
  });

  it('should trigger file input click when upload zone is clicked', () => {
    render(
      <MockProvider>
        <AssetUploader spaceId={spaceId} />
      </MockProvider>
    );

    const uploadZone = screen.getByText('Drag & drop files here');
    const fileInput = screen.getByTestId('file-input') as HTMLInputElement;

    const clickSpy = vi.spyOn(fileInput, 'click');

    fireEvent.click(uploadZone);

    expect(clickSpy).toHaveBeenCalled();
  });

  it('should display "No assets uploaded yet" when there are no assets', () => {
    // Default mock setup already provides empty assets and loading: false
    render(
      <MockProvider>
        <AssetUploader spaceId={spaceId} />
      </MockProvider>
    );
    
    expect(screen.getByText('No assets uploaded yet.')).toBeInTheDocument();
  });

  it('should display uploaded assets', async () => {
    const mockAssetData = new Asset('asset-1', spaceId, 'test.png', 'image/png', 'http://example.com/test.png', 100, new Date().toISOString(), 'user-id');
    
    // Override the mock for this specific test
    vi.spyOn(useAssetsHooks, 'useAssets').mockReturnValue({
      assets: [mockAssetData],
      loading: false,
      error: undefined,
      refetch: mockRefetch,
    });

    render(
      <MockProvider>
        <AssetUploader spaceId={spaceId} />
      </MockProvider>
    );

    await waitFor(() => expect(screen.getByText('test.png')).toBeInTheDocument());
  });

  it('should show spinner when assets are loading', () => {
    // Override the mock for this specific test
    vi.spyOn(useAssetsHooks, 'useAssets').mockReturnValue({
      assets: [],
      loading: true, // Simulate loading state
      error: undefined,
      refetch: mockRefetch,
    });

    render(
      <MockProvider>
        <AssetUploader spaceId={spaceId} />
      </MockProvider>
    );

    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('should show spinner when uploading an asset', async () => {
    // Override the mock for this specific test
    vi.spyOn(useAssetsHooks, 'useUploadAsset').mockReturnValue({
      uploadAsset: mockUploadAssetFn.mockImplementation(async () => new Promise(() => {})), // Never resolve to keep loading true
      loading: true,
      error: undefined,
    });

    render(
      <MockProvider>
        <AssetUploader spaceId={spaceId} />
      </MockProvider>
    );

    // Simulate file selection to trigger upload logic
    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, {
      target: {
        files: [new File(['content'], 'image.png', { type: 'image/png' })],
      },
    });

    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('should call deleteAsset when delete button is clicked', async () => {
    const mockAssetData = new Asset('asset-1', spaceId, 'test.png', 'image/png', 'http://example.com/test.png', 100, new Date().toISOString(), 'user-id');
    
    vi.spyOn(useAssetsHooks, 'useAssets').mockReturnValue({
      assets: [mockAssetData],
      loading: false,
      error: undefined,
      refetch: mockRefetch,
    });

    render(
      <MockProvider>
        <AssetUploader spaceId={spaceId} />
      </MockProvider>
    );

    // Wait for the asset to appear
    const assetNameElement = await screen.findByText('test.png');
    const assetItemWrapper = assetNameElement.closest(`.${styles.assetItemWrapper}`);
    
    // Simulate mouseEnter on the wrapper to activate the delete button
    if (assetItemWrapper) {
      fireEvent.mouseEnter(assetItemWrapper);
    }
    
    // The delete button becomes visible and clickable on hover due to CSS.
    // In JSDOM, fireEvent.mouseEnter might not directly affect pointer-events.
    // We explicitly make it clickable for the test environment.
    const deleteButton = await screen.findByLabelText('Delete asset');
    (deleteButton as HTMLElement).style.pointerEvents = 'auto';

    fireEvent.click(deleteButton);

    expect(mockDeleteAssetFn).toHaveBeenCalledWith({ spaceId, assetId: 'asset-1' });
    expect(mockRefetch).toHaveBeenCalled(); // Expect refetch to be called after delete
  });

  it('should call onUploadComplete after successful upload', async () => {
    const onUploadComplete = vi.fn();
    const uploadedAssetInstance = new Asset('new-id-success', spaceId, 'success.png', 'image/png', 'http://example.com/success.png', 200, new Date().toISOString(), 'uploader-id');
    
    vi.spyOn(useAssetsHooks, 'useUploadAsset').mockReturnValue({
      uploadAsset: mockUploadAssetFn.mockImplementation(async () => uploadedAssetInstance),
      loading: false,
      error: undefined,
    });

    render(
      <MockProvider>
        <AssetUploader spaceId={spaceId} onUploadComplete={onUploadComplete} />
      </MockProvider>
    );

    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, {
      target: {
        files: [new File(['content'], 'success.png', { type: 'image/png' })],
      },
    });

    await waitFor(() => expect(mockUploadAssetFn).toHaveBeenCalled());
    await waitFor(() => expect(onUploadComplete).toHaveBeenCalledWith(uploadedAssetInstance.toObject()));
    expect(mockRefetch).toHaveBeenCalled(); // Expect refetch to be called after upload
  });
});