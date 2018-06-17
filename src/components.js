import React, { Component } from "react";

export class ExampleButton extends Component {
  state = {
    on: false
  };
  handleClick = () => this.setState({ on: !this.state.on });
  render() {
    return (
      <div>
        <button
          role="switch"
          aria-checked="true"
          id="speakerPower"
          class="switch"
          onClick={this.handleClick}
        >
          <span>{this.state.on ? "on" : "off"}</span>
        </button>
        <label for="speakerPower" class="switch">
          Speaker power
        </label>
      </div>
    );
  }
}

// dialog role

// using hidden

// states
