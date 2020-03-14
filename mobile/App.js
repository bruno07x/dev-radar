import React from 'react';
import { StatusBar, YellowBox } from "react-native";
import Routes from "./src/routes";

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);
export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroungColor="#7d40e7"></StatusBar>
      <Routes></Routes>
    </>
  );
}