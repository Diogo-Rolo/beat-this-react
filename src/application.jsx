import React from 'react';
import App from './App';
import Login from './login.jsx';
import CreateUser from './create-user.jsx';

class Test extends React.Component {
  state = {
    URL: 'http://localhost:3000',
    logged: false,
    creating: false,
  };

  setToken = token => {
    localStorage.setItem('token', token);
    this.setState({logged: true});
  };

  setCreating = creating => {
    this.setState({creating: creating});
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const response = await fetch(this.state.URL + '/users/me', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    this.setState({logged: response.status === 200});
  }

  render() {
    const token = localStorage.getItem('token');
    return this.state.creating ? (
      <CreateUser setCreating={this.setCreating} URL={this.state.URL + '/users'} />
    ) : this.state.logged ? (
      <App token={token} URL={this.state.URL + '/songs'} />
    ) : (
      <Login
        setToken={this.setToken}
        setCreating={this.setCreating}
        URL={this.state.URL + '/users/login'}
      />
    );
  }
}

export default Test;
