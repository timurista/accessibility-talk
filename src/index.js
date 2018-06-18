import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import {
  AccessibleSwitch,
  UnaccessibleSwitch,
  UnaccessibleSignupForm,
  AccessibleSignupForm
} from "./components";

// ARIA STATES

const Section = styled.section`
  box-shadow: 0 2px 2px 2px #ccc;
  border: 1px solid #444;
  padding: 16px;
  margin: 16px;
  border-radius: 3px;
`;

function App() {
  return (
    <div className="App" role="main">
      <h1>Testing Out Accessibility</h1>
      <Section>
        <h2>Accessible Button</h2>
        <UnaccessibleSwitch />
        <AccessibleSwitch />
      </Section>
      <Section>
        <h2>Accessible Forms</h2>
        <UnaccessibleSignupForm />
        <p>More Accessible Form</p>
        <AccessibleSignupForm />
      </Section>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
