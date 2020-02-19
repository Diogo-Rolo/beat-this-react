import React, {Fragment} from 'react';
import Dropdown from './dropdown/dropdown.jsx';

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      creationFailed: false,
      location: '',
    };
  }

  handleChange = event => {
    this.setState({[event.target.id]: event.target.value});
  };

  handleSubmit = async event => {
    const response = await this.sendRequest();
    const json = await response.json();
    if (!json.token) {
      this.setState({password: '', creationFailed: true});
      return;
    }
    this.props.setCreating(false);
  };

    backToLogin = () => {
        this.props.setCreating(false)
    }

  sendRequest = value => {
    const {email, password, location} = this.state;
    const credentials = {email, password, location};

    return fetch(this.props.URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  };

  setLocation = event => {
    console.log(event.target.innerText);
    this.setState({location: event.target.innerText.toLowerCase()});
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
          <Dropdown location={this.state.location} setLocation={this.setLocation} />
        </form>
        {this.state.creationFailed && (
          <div>Creation failed. Invalid email or location.</div>
        )}
        <button onClick={this.backToLogin}>Back to login</button>
      </Fragment>
    );
  }
}

export default CreateUser;
