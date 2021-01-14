import { Button } from "antd";
import { useEffect, useState } from "react";
import { PlaylistItemComponent } from "../PlaylistItemComponent/PlaylistItemComponent";
import { PlaylistSongsComponent } from "../PlaylistSongsComponent/PlaylistSongsComponent";
import "./PlaylistComponent.css";

export const PlaylistComponent = ({ songs }) => {
  const [playlists, setPlaylists] = useState({});
  const [activePlaylist, setActivePlaylist] = useState(null);

  useEffect(() => {
    refreshPlaylists();
  }, []);

  const refreshPlaylists = () => {
    setPlaylists(JSON.parse(localStorage.getItem("playlists")) || {});
  };

  const renderPlaylistItems = () => {
    return Object.keys(playlists).map((playlistId, key) => (
      <PlaylistItemComponent
        key={key}
        setActivePlaylist={setActivePlaylist}
        playlist={playlists[playlistId]}
      />
    ));
  };

  const handleCreatePlaylist = () => {
    const playlistId = Object.keys(playlists).length + 1;
    const newPlaylist = {
      name: `Playlist ${playlistId}`,
      createdAt: Date.now(),
      id: playlistId,
      songs: [],
    };
    let newPlaylists = { ...playlists, [playlistId]: newPlaylist };
    localStorage.setItem("playlists", JSON.stringify(newPlaylists));
    refreshPlaylists();
  };

  const updatePlaylist = (playlist) => {
    let newPlaylists = { ...playlists, [playlist.id]: playlist };
    localStorage.setItem("playlists", JSON.stringify(newPlaylists));
    refreshPlaylists();
  };

  const resetActivePlaylist = () => {
    setActivePlaylist(null);
  };

  return (
    <div className="playlist-container">
      {activePlaylist ? (
        <PlaylistSongsComponent
          updatePlaylist={updatePlaylist}
          songs={songs}
          resetActivePlaylist={resetActivePlaylist}
          playlist={playlists[activePlaylist]}
        />
      ) : (
        <>
          <div className="playlist-actions-container">
            <Button onClick={handleCreatePlaylist}>Create playlist</Button>
          </div>
          <div className="playlist-items-container">
            {renderPlaylistItems()}
          </div>
        </>
      )}
    </div>
  );
};
