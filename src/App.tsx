import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import NavMenu from "./components/navbar/NavMenu";
import { GlobalContextProvider, MyGlobalContext } from "./hooks/GlobalContent";

export default function App() {
  return (
     <GlobalContextProvider>
      <BrowserRouter>
        <NavMenu></NavMenu>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}
