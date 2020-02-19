import React from "react";
import SongItem from "./song-item.jsx";

const LIKE_ENDPOINT = "/like";
const DISLIKE_ENDPOINT = "/dislike";

const onButtonPress = (endpoint, ytId, token, URL) => () => {
  fetch(URL + endpoint, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ytId
    })
  });
};

function Table(props) {
  const { list, token, URL } = props;

  return (
    <ul>
      {list.map(({ ytId, likes, title }) => (
        <SongItem
          key={ytId}
          title={title}
          likes={likes}
          onLike={onButtonPress(LIKE_ENDPOINT, ytId, token, URL)}
          onDislike={onButtonPress(DISLIKE_ENDPOINT, ytId, token, URL)}
        />
      ))}
    </ul>
  );
}

export default Table;
