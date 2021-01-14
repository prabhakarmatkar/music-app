import { Input } from "antd";
import "./SearchSongComponent.css";

export const SearchSongComponent = ({ handleChange }) => {
  return <Input onChange={handleChange} placeholder={"Search for songs"} />;
};
