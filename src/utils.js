import { ALL_SONGS_URL, ALL_ALBUMS_URL } from "./constants";

export const getAllSongs = () => {
  return fetch(ALL_SONGS_URL).then((res) => res.json());
};

export const getAllAlbums = () => {
  return fetch(ALL_ALBUMS_URL).then((res) => res.json());
};
