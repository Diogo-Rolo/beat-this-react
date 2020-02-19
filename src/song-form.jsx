import React from 'react';

class SongForm extends React.Component {
    state = {
        value: ''
    };

  handleChange = event => {
    this.setState({value: event.target.value});
  };

  handleSubmit = async event => {
    event.preventDefault();
    const response = await this.sendRequest(this.state.value);
    if (response.status === 400) {
      alert('Song already exists or invalid ID');
      return;
    }
    alert('Song added successfully');
  };

  sendRequest = value => {
    return fetch(this.props.URL, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + this.props.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ytId: value}),
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Song's youTube URL:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default SongForm;
