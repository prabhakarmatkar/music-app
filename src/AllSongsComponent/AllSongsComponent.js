import { useEffect, useState } from "react";
import { SearchSongComponent } from "../SearchSongComponent/SearchSongComponent";
import { SongListItemComponent } from "../SongListItemComponent/SongListItemComponent";
import "./AllSongsComponent.css";
import { FixedSizeList as List } from "react-window";

export const AllSongsComponent = ({
  songs,
  excludeSongs = [],
  actions = [],
  listItemHeight = 600,
}) => {
  const [allSongs, setAllSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    setAllSongs(songs);
    setFilteredSongs(songs);
  }, [songs]);

  const searchSongs = (event) => {
    let searchResults = allSongs;
    if (event.target.value && event.target.value.length >= 3) {
      searchResults = allSongs.filter(
        (song) =>
          song.title.toLowerCase().includes(event.target.value.toLowerCase()) &&
          excludeSongs.indexOf(song.id) === -1
      );
    } else if (event.target.value.length === 0) {
      searchResults = allSongs.filter(
        (song) => excludeSongs.indexOf(song.id) === -1
      );
    }
    setFilteredSongs(searchResults);
  };

  const Row = ({ index, key, style }) => {
    return (
      <div>
        <div key={key} style={style} className="">
          <SongListItemComponent
            actions={actions}
            song={filteredSongs[index]}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="all-songs-container">
      <div className="search-songs-container">
        <SearchSongComponent handleChange={searchSongs} />
      </div>
      <div className="infinity-scroll-wrapper">
        <List
          width={"100%"}
          height={listItemHeight}
          itemCount={filteredSongs.length}
          itemSize={50}
        >
          {Row}
        </List>
      </div>
    </div>
  );
};
