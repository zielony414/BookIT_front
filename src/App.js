import React, { useState, useEffect } from 'react'

function App() {

  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/members").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div>
      {typeof data.members === 'undefined' ? (
        <p>Loading...</p>
      ) : (
        data.members.map((member, i) => (
          <p key={i}>"HALO DZIAŁAJ"{member}</p>
        ))
      )}
    </div>
  );
}

export default App;