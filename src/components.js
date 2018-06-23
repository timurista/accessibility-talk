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

const Errors = styled.ul`
  background: pink;
  color: darkred;
  border: 1px solid red;

  li {
    color: darkred;
  }
`;

export class UnaccessibleSignupForm extends Component {
  state = {
    loading: false,
    errors: null
  };
  timer;
  handleSubmit = () => {
    this.setState({ loading: true });
    this.timer = window.setTimeout(() => {
      window.clearTimeout(this.timer);
      this.setState({
        loading: false,
        errors: ["Invalid username", "Invalid password", "Incorrect nickname"]
      });
    }, 1500);
  };
  render() {
    return (
      <FormContainer>
        {this.state.errors ? (
          <Errors>
            <b>The following errors have occurred:</b>
            <button onClick={() => this.setState({ errors: null })}>x</button>
            <ul>{this.state.errors.map(err => <li>{err}</li>)}</ul>
          </Errors>
        ) : (
          []
        )}
        <h2>Sign Up</h2>
        <Label>Username</Label>
        <input
          aria-autocomplete="true"
          autoCorrect="true"
          type="text"
          required
          placeholder="Enter your username"
        />
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
          Receive our newsletter?
          <input type="checkbox" />
        </ReceiveEmail>

        <Hint>Fields marked in red are required</Hint>
        <Submit
          type="submit"
          onClick={this.handleSubmit}
          value={
            !this.state.loading
              ? "Submit"
              : "Submitting, I hope nothing goes wrong..."
          }
        />
      </FormContainer>
    );
  }
}

// Example 2
// Making a Form accessible part (solution)

const BetterFormContainer = styled(FormContainer.withComponent("form"))`
  fieldset {
    border: 1px solid #aaa;
  }

  fieldset + fieldset {
    margin-top: 16px;
  }
`;

// FIELDSET lets non sighted users to understand field params
// Legend Element provides a title

// CORRECTING ERRORS INSIDE FORMS
// really hard for non sighted users

// Errors should do 3 things
//  * show them where error occurred (correct format)
//  * let user fix the error
//  * let user resubmit the form

// include textual instructions when necessary
// ensure keyboard can allow users to interact

// p tags break up paragraphs, they read everything all at once

// use Semantic Markup
// AVOID pixel length for sizing, because you want users to be able to easily resize
// elements

const BetterLabel = styled(Label)`
  color: #444;
  font-weight: 600;
  cursor: pointer;

  & + input:active,
  & + input:focus {
    box-shadow: 0 0 0 2px #00cdbe;
  }
`;

const CheckboxLabel = styled.label`
  padding: 0 8px;
  border-radius: 3px;
  width: auto;
  align-items: center;
  justify-content: space-between;

  & + input {
    flex: 1;
    width: auto;
  }
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  &:active,
  &:focus {
    box-shadow: 0 0 0 2px #00cdbe;
  }
`;

const HiddenStar = () => <span aria-hidden>*</span>;

export type State = {
  errors: any
};

export class AccessibleSignupForm extends Component<State> {
  state: {
    errors: {}
  };
  hanldeSubmit = e => {
    e.preventDefault();
    const errors = {
      username: {
        message: "Please remove special characters in your username"
      }
    };
    this.setState({ errors });
  };
  render() {
    const errors = this.state ? this.state.errors : {};

    return (
      <BetterFormContainer action={this.handleSubmit}>
        <h2>Sign Up</h2>
        <fieldset>
          <legend>User Info</legend>
          <BetterLabel htmlFor="username" aria-label="Username">
            Username <HiddenStar />
          </BetterLabel>
          <input
            id="username"
            type="text"
            required
            placeholder="Enter your username"
          />
          {errors.username && (
            <p aria-describedby="username" role="alert">
              {errors.username.message}
            </p>
          )}
          <BetterLabel htmlFor="password">
            Password <HiddenStar />
          </BetterLabel>
          <input id="password" type="password" required />
          <BetterLabel htmlFor="confirmPassword">
            Confirm Password <HiddenStar />
          </BetterLabel>
          <input id="confirmPassword" type="password" required />
          <OptionalLabel htmlFor="nickname">Nickname</OptionalLabel>
          <input
            id="nickname"
            type="text"
            placeholder="Enter a Nickname (optional)"
          />
        </fieldset>
        <fieldset>
          <legend>Preferences</legend>
          <FlexRow>
            <CheckboxLabel htmlFor="newsletter">
              Receive our newsletter?
            </CheckboxLabel>
            <input id="newsletter" type="checkbox" />
          </FlexRow>
        </fieldset>
        <Hint>* are required</Hint>
        <Submit type="submit" aria-label="complete sign up" />
      </BetterFormContainer>
    );
  }
}

// Images
// 125 char or less for alt attributes
// meaningful content, not redudant
// exmaple not avatar, avatar with user submited image

// figure
// no alt text needed

// link element
// alt text explains destination of link
// Home - Weedmaps.com

// image performs a function?
// describe in alt text

// Links
// dropdown need href attribute still

//
// multiple ways to get to content

// Cognitive limitations might prefer to use site map

// 2 of the following 6
// links to related content
// table of contents
// sitemap structure of site
// search function without navigating
// link

// meaning of content depends on structure

// focus order / tab order
// all interactive elemnts in intended order
// can use tabindex -1 > 32,000
// lowest to highest order
// 0 is that it should be in order
// p tag can be tabbed using 0

// Aria roles, states

const Header = styled.nav`
  display: flex;
  background: black;
  color: white;
  padding: 10px;
  margin: bottom: 200px;
  justify-content: space-between;
`;

const MainContent = styled.div`
  height: 250px;
`

export class AccessibleNavigation extends Component {
  state = {
    searchResults: [],
    locationResults: [],
    loading: false,
  }

  renderLocationResults = () => {
    return []
  }

  renderSearchResults = () => {
    return []
  }
  

  render() {
    const { renderLocationResults, renderSearchResults } = this;
    const { searchResults, locationResults, loading } = this.state;
    return (
      <div>
        <Header role="menu">
        <span>
          <a href="www.weedmaps.com">
            Home
          </a>
        </span>
        <span>
          <input placeholder="search item" aria-busy={loading} />
          { searchResults && renderSearchResults()}
          <input placeholder="search location" />
          { locationResults && renderLocationResults()}          
        </span>
        <span>
        <button>Login</button>
        <button>Sign up</button>
        </span>
      </Header>
      <MainContent>
        CONTENT
      </MainContent>
      </div>
    );
  }
}

// aria-busy
// aria-hidden
// aria-live, types updates to expect
