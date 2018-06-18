import React, { Component } from "react";
import styled from "styled-components";

// Example 1
// Checking accessible contrast of buttons

const Switcher = styled.button`
  padding: 8px 16px;
  background: ${props => (props.on ? "#00cdbe" : "#fff")};
  text-transform: uppercase;
  border-radius: 3px;
  border: 1px solid #444;
  border-color: #00cdbe;
  margin: 2px;
  margin-right: 16px;
  color: ${props => (!props.on ? "#00cdbe" : "#fff")};

  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px white, 0 0 0 2px #00cdbe;
  }

  & + label {
    color: #666;
  }
`;

export class UnaccessibleSwitch extends Component {
  state = {
    on: false
  };
  handleClick = () => this.setState({ on: !this.state.on });
  render() {
    return (
      <div>
        <p>an unaccessible switcher</p>
        <Switcher id="switcher" on={this.state.on} onClick={this.handleClick}>
          <span>{this.state.on ? "on" : "off"}</span>
        </Switcher>
        <label htmlFor="switcher">Turn on this setting</label>
      </div>
    );
  }
}

// EXMAPLE 1 - Solution

const BetterSwitcher = styled(Switcher)`
  background-color: ${props => (props.on ? "#00857b" : "#fff")};
  border-color: #00857b;
  color: ${props => (!props.on ? "#00857b" : "#fff")};
`;

export class AccessibleSwitch extends Component {
  state = {
    on: false
  };
  handleClick = () => this.setState({ on: !this.state.on });
  render() {
    return (
      <div role="contentinfo">
        <h3 aria-hidden="true">I am compliant with wc3 guidelines</h3>
        <BetterSwitcher
          role="switch"
          aria-checked={this.state.on}
          id="betterSwitcher"
          on={this.state.on}
          onClick={this.handleClick}
        >
          <span>{this.state.on ? "on" : "off"}</span>
        </BetterSwitcher>
        <label htmlFor="betterSwitcher">Turn on this setting</label>
      </div>
    );
  }
}

// Example 2
// Making a Form accessible

const FormContainer = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  max-width: 500px;

  input {
    width: 100%;
    line-height: 24px;
    font-size: 16px;
    text-indent: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    outline: 0;
  }
`;

const Label = styled.label`
  display: block;
  margin: 8px 0;
  font-size: 20px;
  color: red;
`;

const OptionalLabel = styled(Label)`
  color: #444;
`;

const Submit = styled.input`
  padding: 8px 16px;
  background: #00857b;
  text-transform: uppercase;
  border-radius: 3px;
  border: 1px solid #444;
  border-color: #00857b;
  color: #fff;
  outline: 0;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const Hint = styled.p`
  margin: 32px 0 32px;
`;

const ReceiveEmail = styled(OptionalLabel)`
  display: flex;
  margin-top: 16px;
  input {
    flex: 1;
  }
`;

export class UnaccessibleSignupForm extends Component {
  render() {
    return (
      <FormContainer>
        <h2>Sign Up</h2>
        <Label>Username</Label>
        <input type="text" required placeholder="Enter your username" />
        <Label>Password</Label>
        <input type="password" required />
        <Label>Confirm Password</Label>
        <input type="password" required />
        <OptionalLabel>Nickname</OptionalLabel>
        <input
          type="text"
          required="false"
          placeholder="Enter a Nickname (optional)"
        />
        <ReceiveEmail>
          Receive our newslzetter?
          <input type="checkbox" checked="false" />
        </ReceiveEmail>

        <Hint>Fields marked in red are required</Hint>
        <Submit type="submit" />
      </FormContainer>
    );
  }
}

// Example 2
// Making a Form accessible part (solution)

const BetterFormContainer = styled(FormContainer.withComponent("form"))`
  background: #ccc;
`;

export class AccessibleSignupForm extends Component {
  render() {
    return (
      <BetterFormContainer>
        <h2>Sign Up</h2>
        <Label>Username</Label>
        <input type="text" required placeholder="Enter your username" />
        <Label>Password</Label>
        <input type="password" required />
        <Label>Confirm Password</Label>
        <input type="password" required />
        <OptionalLabel>Nickname</OptionalLabel>
        <input
          type="text"
          required="false"
          placeholder="Enter a Nickname (optional)"
        />
        <ReceiveEmail>
          Receive our newslzetter?
          <input type="checkbox" checked="false" />
        </ReceiveEmail>

        <Hint>Fields marked in red are required</Hint>
        <Submit type="submit" />
      </BetterFormContainer>
    );
  }
}
