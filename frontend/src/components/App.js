import React from "react";
import {useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import {Register} from "./login/index";
import {Login} from "./login/index";
import HomePage from './HomePage';


export default function App() {
  const [token,setToken] = useState([])
  useEffect(() => {
    fetch('/social/edit_comment', {
      method: 'PUT',
      headers: new Headers({
        'Authorization': 'Bearer ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0NDQ1MzgwNiwianRpIjoiZDYwM2I2OWEtZTRkZi00Nzc3LTkxYjgtMzg4OTI5MDM2NDA2IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImpvaG5AbWFpbC5jb20iLCJuYmYiOjE2NDQ0NTM4MDYsImV4cCI6MTY0NDQ1NzQwNn0.FMTe2GVgFEQhxIktbm9Pqy73gvrhxkY1XLYkjTt-Y-o"
      }),
      body: JSON.stringify({
        "time_stmp":"Sun, 02 Oct 2022 01:00:41 GMT", "comment":"excited"
      })
    } ).then(
      res => res.json()
      ).then(
        token => {
          setToken(token);
          console.log(token)
        }
      )

  }, [])

  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/homepage" element={<HomePage/>} />
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </div>
    </Router>
  );
}
