import React, { useState, useEffect } from 'react';


/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {

  //fetch sample user from backend.
  const [data,setData] = useState([])
  
  useEffect(() => {
    fetch('auth/user').then(
      res => res.json()
      ).then(
        data => {
          setData(data);
          console.log(data)
        }
      )

  }, [])

  return (
    <div>
      Social Stock
    </div>
  );

}

export default App;
