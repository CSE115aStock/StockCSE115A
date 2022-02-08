import React, { useState, useEffect } from 'react';
import {Register} from "./login/index";
import {Login} from "./login/index";

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {

  //fetch sample user from backend.

  return (
    <div className="App">
        <Login/>
    </div>
  );

}

export default App;
