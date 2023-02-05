import { createContext, useContext, useEffect, useState } from "react"

export type GlobalContent = {
  sectionId: string
  setSectionId: (c: string) => void
  sectionName: string
  setSectionName: (c: string) => void
}

export const MyGlobalContext = createContext<GlobalContent>({
  sectionId: "", // set a default value
  setSectionId: () => { },
  sectionName: "", // set a default value
  setSectionName: () => { },
})

const getSectionId = (localStorageItem: string) => {
  if (localStorage.getItem(localStorageItem) === null)
    localStorage.setItem(
      localStorageItem, "default"
    );
  return localStorage.getItem(localStorageItem)!;
};

export const useGlobalContext = () => useContext(MyGlobalContext)

export function GlobalContextProvider(props: any) {
  const [sectionId, setSectionId] = useState<string>(getSectionId("sectionId"))
  useEffect(() => { localStorage.setItem("sectionId", sectionId); }, [sectionId]);

  const [sectionName, setSectionName] = useState<string>(getSectionId("sectionName"))
  useEffect(() => { localStorage.setItem("sectionName", sectionName); }, [sectionName]);

  return (
    <MyGlobalContext.Provider value={{ sectionId, setSectionId, sectionName, setSectionName }}>
      {props.children}
    </MyGlobalContext.Provider>
  );
}