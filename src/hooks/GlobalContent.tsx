import { createContext, useContext } from "react"

export type GlobalContent = {
  copy: string
  setCopy:(c: string) => void
  sectionId: string
  setSectionId:(c: string) => void
}


export const MyGlobalContext = createContext<GlobalContent>({
copy: "", // set a default value
setCopy: () => {},
sectionId: "", // set a default value
setSectionId: () => {},
})



export const useGlobalContext = () => useContext(MyGlobalContext)

export default function useStateContext() {
  const { copy, setCopy } = useContext(MyGlobalContext);
  return {
    copy,
    setContext: (obj:string) => {
      setCopy( obj );
    },
    resetContext: () => {
      localStorage.removeItem("context");
      //setCopy(getFreshContext());
    },
  };
}
