import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import NavMenu from "./components/navbar/NavMenu";
import { MyGlobalContext } from "./hooks/GlobalContent";

export default function App() {

  const getCopy = (userType: string):string => 
  {
     if (userType.toLowerCase() === 'admin')
     {
        return 'Hello Admin User!'
     }
     return 'Welcome user!'
  }

  const [copy, setCopy] = useState<string>("")
  const [sectionId, setSectionId] = useState<string>("")

  return (
     <MyGlobalContext.Provider value= {{ copy, setCopy, sectionId, setSectionId }}>
      <BrowserRouter>
        <NavMenu></NavMenu>
      </BrowserRouter>
    </MyGlobalContext.Provider>
  );
}
