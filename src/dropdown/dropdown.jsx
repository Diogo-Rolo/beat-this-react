import React from 'react';
//import './style.css';

class Dropdown extends React.Component {
  constructor() {
    super();

    this.state = {
      displayMenu: false,
    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  }

  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({displayMenu: true}, () => {
      document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({displayMenu: false}, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });
  }

  render() {
    return (
      <div className="dropdown" >
        <button className="button" onClick={this.showDropdownMenu}>
            {this.props.location || 'Choose your location'}
        </button>

        {this.state.displayMenu ? (
          <ul>
            <li>
                <button onClick={this.props.setLocation}>Lisbon</button>
            </li>
            <li>
              <button onClick={this.props.setLocation}>Utrecht</button>
            </li>
          </ul>
        ) : null}
      </div>
    );
  }
}

export default Dropdown;
