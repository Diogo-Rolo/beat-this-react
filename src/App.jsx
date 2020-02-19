import React, {Fragment} from 'react';
import Table from './table.jsx';
import SongForm from './song-form.jsx';
import VideoComponent from './video-component.jsx';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songList: [],
      currentSong: '',
      token: props.token,
    };
  }

  getTable = async () => {
    const data = await fetch(this.props.URL, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + this.state.token,
        'Content-Type': 'application/json',
      },
    });
    const {songList} = await data.json();
    this.setState({songList});
  };

  selectSong = () => {
    const randomSong = this.state.songList[
      Math.floor(Math.random() * this.state.songList.length)
    ].ytId;
    return randomSong === this.state.currentSong
      ? this.selectSong()
      : randomSong;
  };

  setRandomCurrentSong = () => {
    this.setState({
      currentSong: this.selectSong(),
    });
  };

  async componentDidMount() {
    await this.getTable();
    this.setRandomCurrentSong();
  }

  render() {
    return (
      <Fragment>
        <VideoComponent
          ytId={this.state.currentSong}
          onSongEnd={this.setRandomCurrentSong}
        />
        <div className="form">
          <SongForm URL={this.props.URL} token={this.state.token} />
        </div>
        <div className="App">
          <Table
            list={this.state.songList}
            URL={this.props.URL}
            token={this.state.token}
          />
        </div>
      </Fragment>
    );
  }
}

export default Player;
