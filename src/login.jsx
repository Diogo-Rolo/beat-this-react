import React, {Fragment} from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      authFailed: false,
    };
  }

  handleChange = event => {
    this.setState({[event.target.id]: event.target.value});
  };

  handleSubmit = async event => {
      console.log(event)
    event.preventDefault();
    const response = await this.sendRequest();
    const json = await response.json();
    if (!json.token) {
      this.setState({password: '', authFailed: true});
      return;
    }
    this.props.setToken(json.token);
  };

  sendRequest = value => {
    const {email, password} = this.state;
    const credentials = {email, password};

    return fetch(this.props.URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  };

  render() {
    return (
      <Fragment>
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input id="email" type="text" value={this.state.email} />
            Password:
            <input id="password" type="password" value={this.state.password} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.state.authFailed && (
          <div>Login failed, email or password invalid</div>
        )}
        <button  onClick={this.props.setCreating}>Create new user</button>
      </Fragment>
    );
  }
}

export default Login;
