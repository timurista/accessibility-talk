import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import { ExampleButton } from "./components";

// ARIA STATES

// EXAMPLE 1
//

function App() {
  return (
    <div className="App">
      <h5>Aria States</h5>
      <h1>Testing Out Accessibility</h1>
      <ExampleButton />
    </div>
  );
}

// EXAMPLE 1: using totally to identify sematic issues in your html

// the role of headers
// they signify ordering of importance for screen readers

// screen readers will parse the orders h2 and h1 tags in incorrect order causing confusion
// for the listener

// function App() {
//   return (
//     <div className="App">
//       <h2>User Experience</h2>
//       <h1>Testing Out Accessibility</h1>
//       <h5>Start editing to see some magic happen!</h5>
//     </div>
//   );
// }

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
