import React from "react";
import { Radio } from "antd";
import "antd/dist/antd.css";
import "./MusicAppContainer.css";
import { PlaylistComponent } from "./PlaylistComponent/PlaylistComponent";
import { AllSongsComponent } from "./AllSongsComponent/AllSongsComponent";
import { getAllAlbums, getAllSongs } from "./utils";

class MusicAppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "all",
      songs: [],
    };
  }

  componentDidMount() {
    getAllSongs().then((songs) => {
      this.setState({ songs });
    });
    getAllAlbums().then((result) => {
      const albums = {};
      result.forEach((res) => (albums[res.id] = res));
      localStorage.setItem("albums", JSON.stringify(albums));
    });
  }

  handleModeChange = (event) => {
    this.setState({ mode: event.target.value });
  };

  renderContent = () => {
    const { mode, songs } = this.state;
    let contentToRender = null;
    if (mode === "all") contentToRender = <AllSongsComponent songs={songs} />;
    else contentToRender = <PlaylistComponent songs={songs} />;

    return contentToRender;
  };

  render() {
    const { mode } = this.state;
    return (
      <div className="music-app-container">
        <div className="mode-container">
          <Radio.Group
            onChange={this.handleModeChange}
            value={mode}
            style={{ marginBottom: 8 }}
          >
            <Radio.Button value="all">All songs</Radio.Button>
            <Radio.Button value="playlist">Playlists</Radio.Button>
          </Radio.Group>
        </div>
        <div className="mode-content">{this.renderContent()}</div>
      </div>
    );
  }
}

export default MusicAppContainer;
