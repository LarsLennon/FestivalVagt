import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
//import NavMenu from "./components/navbar/NavMenu";


export default function App() {
  return (
    //  <GlobalContextProvider>

    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </HashRouter>
    //  </GlobalContextProvider>
  );
}
