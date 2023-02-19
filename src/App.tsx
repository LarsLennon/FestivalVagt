import { BrowserRouter } from "react-router-dom";
import NavMenu from "./components/navbar/NavMenu";
import { GlobalContextProvider } from "./hooks/GlobalContent";


export default function App() {
  
  
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <NavMenu></NavMenu>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}
