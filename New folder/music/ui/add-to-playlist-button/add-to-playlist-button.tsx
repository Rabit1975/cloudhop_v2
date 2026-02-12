import React, { useState, type CSSProperties, type MouseEvent } from 'react';
import classNames from 'classnames';
import { Button } from '@cloudrabbit/design.actions.button';
import { Dropdown } from '@cloudrabbit/design.overlays.dropdown';
import { MusicTrack } from '@cloudrabbit/music.entities.music-track';
import { 
  useListMusicPlaylists, 
  useAddTrackToMusicPlaylist, 
  useCreateMusicPlaylist 
} from '@cloudrabbit/music.hooks.use-music-playlists';
import styles from './add-to-playlist-button.module.scss';

export type AddToPlaylistButtonProps = {
  /**
   * The music track to be added to a playlist.
   */
  track: MusicTrack;

  /**
   * Additional class name for the root container.
   */
  className?: string;

  /**
   * Inline styles for the root container.
   */
  style?: CSSProperties;
};

export function AddToPlaylistButton({ track, className, style }: AddToPlaylistButtonProps) {
  const [playlists, { loading: loadingPlaylists }] = useListMusicPlaylists();
  const [addTrackToPlaylist] = useAddTrackToMusicPlaylist();
  const [createPlaylist, { loading: creatingPlaylist }] = useCreateMusicPlaylist();
  
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [addedToPlaylists, setAddedToPlaylists] = useState<string[]>([]);

  const handleAddToPlaylist = async (playlistId: string, event: MouseEvent) => {
    event.stopPropagation();
    try {
      await addTrackToPlaylist({
        playlistId,
        trackId: track.id,
      });
      setAddedToPlaylists((prev) => [...prev, playlistId]);
    } catch (error) {
      console.error('Failed to add track to playlist:', error);
    }
  };

  const handleCreatePlaylist = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newPlaylistName.trim()) return;

    try {
      const newPlaylist = await createPlaylist({
        name: newPlaylistName,
        isPublic: false,
      });

      if (newPlaylist) {
        setNewPlaylistName('');
        // Immediately add the track to the new playlist
        await addTrackToPlaylist({
          playlistId: newPlaylist.id,
          trackId: track.id,
        });
        setAddedToPlaylists((prev) => [...prev, newPlaylist.id]);
      }
    } catch (error) {
      console.error('Failed to create playlist:', error);
    }
  };

  const TriggerButton = (
    <Button 
      appearance="secondary" 
      className={styles.triggerButton}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
      </svg>
      Add to Playlist
    </Button>
  );

  return (
    <div className={classNames(styles.container, className)} style={style}>
      <Dropdown 
        placeholder={TriggerButton} 
        openPosition="right"
        // Removed the onClick prop to avoid type conflict. Dropdown handles its own toggle.
      >
        <div className={styles.menu} onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            Select Playlist
          </div>
          
          <div className={styles.list}>
            {loadingPlaylists && (
              <div className={styles.emptyState}>Loading playlists...</div>
            )}
            
            {!loadingPlaylists && playlists && playlists.length === 0 && (
              <div className={styles.emptyState}>No playlists found</div>
            )}

            {playlists?.map((playlist) => {
              const isAdded = addedToPlaylists.includes(playlist.id);
              // Simple check if track is already in playlist based on client-side knowledge
              const alreadyHasTrack = playlist.tracks?.some(t => t.id === track.id) || isAdded;

              return (
                <div 
                  key={playlist.id} 
                  className={classNames(styles.playlistItem, { [styles.added]: alreadyHasTrack })}
                  onClick={(e) => !alreadyHasTrack && handleAddToPlaylist(playlist.id, e)}
                  role="button"
                  tabIndex={0}
                >
                  <span className={styles.playlistName}>{playlist.name}</span>
                  {alreadyHasTrack && (
                    <span className={styles.checkIcon}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className={styles.createSection}>
            <form onSubmit={handleCreatePlaylist} className={styles.createForm}>
              <input
                type="text"
                placeholder="New playlist name..."
                className={styles.input}
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                disabled={creatingPlaylist}
                onClick={(e) => e.stopPropagation()}
              />
              <button 
                type="submit" 
                className={styles.createButton}
                disabled={creatingPlaylist || !newPlaylistName.trim()}
                title="Create and add"
              >
                {creatingPlaylist ? '...' : '+'}
              </button>
            </form>
          </div>
        </div>
      </Dropdown>
    </div>
  );
}