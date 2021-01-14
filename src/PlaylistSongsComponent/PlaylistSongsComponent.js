import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useEffect, useState } from "react";
import { AllSongsComponent } from "../AllSongsComponent/AllSongsComponent";
import { SongListItemComponent } from "../SongListItemComponent/SongListItemComponent";
import "./PlaylistSongsComponent.css";

export const PlaylistSongsComponent = ({
  playlist,
  resetActivePlaylist,
  songs: allSongs,
  updatePlaylist,
}) => {
  const { songs } = playlist;
  const [openModal, setOpenModal] = useState(false);
  const [addedSongs, setAddedSongs] = useState([]);
  const [shuffledSongs, setShuffledSongs] = useState([]);

  useEffect(() => {
    setShuffledSongs(songs);
  }, [songs]);

  const shuffleSongs = () => {
    let tempSongs = [...shuffledSongs];
    var currentIndex = tempSongs.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = tempSongs[currentIndex];
      tempSongs[currentIndex] = tempSongs[randomIndex];
      tempSongs[randomIndex] = temporaryValue;
    }

    setShuffledSongs(tempSongs);
  };

  const deleteSong = (songToDelete) => {
    let newSongs = songs.filter((song) => song.id !== songToDelete.id);
    let newPlaylist = { ...playlist, songs: newSongs };
    updatePlaylist(newPlaylist);
  };
  const actions = [
    {
      actionTitle: "Delete",
      actionHandler: deleteSong,
    },
  ];

  const renderSongs = () => {
    return shuffledSongs.map((song, key) => (
      <SongListItemComponent key={key} song={song} actions={actions} />
    ));
  };

  const handleAddSong = () => {
    setOpenModal(true);
  };

  const handleCancel = () => {
    setOpenModal(false);
    setAddedSongs([]);
  };

  const addSongs = () => {
    if (addedSongs.length) {
      const newPlaylist = { ...playlist, songs: [...songs, ...addedSongs] };
      updatePlaylist(newPlaylist);
    }
    setOpenModal(false);
    setAddedSongs([]);
  };

  const selectSong = (selectedSong) => {
    if (addedSongs.every((song) => song.id !== selectedSong.id))
      setAddedSongs([...addedSongs, selectedSong]);
  };

  const renderAddSongModal = () => {
    let songsToExclude = songs.map((song) => song.id);
    songsToExclude = [...songsToExclude, addedSongs.map((song) => song.id)];
    const actions = [
      {
        actionTitle: "Add to playlist",
        actionHandler: selectSong,
      },
    ];
    return (
      <div>
        <Modal
          title={"Add songs"}
          visible={openModal}
          onOk={addSongs}
          onCancel={handleCancel}
          width={900}
          centered={true}
        >
          <AllSongsComponent
            songs={allSongs}
            excludeSongs={songsToExclude}
            actions={actions}
            listItemHeight={300}
          />
        </Modal>
      </div>
    );
  };

  return (
    <div className="playlist-songs-container">
      <div className="playlist-songs-actions">
        <Button onClick={resetActivePlaylist}>Back</Button>
        <Button onClick={shuffleSongs}>Shuffle songs</Button>
        <Button onClick={handleAddSong}>Add song</Button>
      </div>
      <div className="playlist-songs-list-container">{renderSongs()}</div>
      {openModal && renderAddSongModal()}
    </div>
  );
};
