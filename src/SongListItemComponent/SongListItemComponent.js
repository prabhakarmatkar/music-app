import { Button } from "antd";
import "./SongListItemComponent.css";

export const SongListItemComponent = ({ song, actions = [] }) => {
  const { albumId, id, title, url, thumbnailUrl } = song;

  const albums = JSON.parse(localStorage.getItem("albums"));

  const renderActions = () => {
    return actions.map((action, key) => (
      <Button key={key} type="link" onClick={() => action.actionHandler(song)}>
        {action.actionTitle}
      </Button>
    ));
  };

  return (
    <div className="song-list-item-container" key={id}>
      <div className="song-details-wrapper">
        <div className="thumbnail-container">
          <img src={thumbnailUrl} width={40} height={40} alt={title} />
        </div>
        <div className="song-details-container">
          <span>{title}</span>
          <span>{albums[albumId].title}</span>
        </div>
      </div>
      <div className="song-play-time-container">Play time</div>
      <div className="song-actions-container">{renderActions()}</div>
    </div>
  );
};
