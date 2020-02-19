import React from 'react';

function SongItem(props) {
  const { title, likes, onLike, onDislike } = props;

  return (
    <li>
      {title} - {likes} likes! -
      <button onClick={onLike}>Like</button>
      <button onClick={onDislike}>Dislike</button>
    </li>
  );
}

export default SongItem;
