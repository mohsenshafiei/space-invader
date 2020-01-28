import React from "react";
import ReactDOM from "react-dom";
import { SpaceInvader } from './space-invader';

const App = () => <SpaceInvader />
const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
