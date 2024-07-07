import React from "react";
import Home from "./components/Home";
import Body from "./components/Body";
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
      <Body />
      <Toaster />
    </>
  );
}

export default App;
