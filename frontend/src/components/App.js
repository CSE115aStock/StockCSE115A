import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import {Register} from "./login/index";
import {Login} from "./login/index";
import HomePage from './HomePage';
import {FilterMethod} from "./stockfilterPage/filter.js";
export default function App() {
  return (
     <FilterMethod/>
  );
}
