import "./PlaylistItemComponent.css";

export const PlaylistItemComponent = ({ playlist, setActivePlaylist }) => {
  const { createdAt, name, id } = playlist;
  return (
    <div
      className="playlist-item-container"
      onClick={() => setActivePlaylist(id)}
    >
      <div className="playlist-details-container">
        <span>{name}</span>
      </div>
      <div className="playlist-created-at-container">
        <span>Created At: {new Date(createdAt).toString()}</span>
      </div>
    </div>
  );
};
