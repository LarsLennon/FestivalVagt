import { createContext, useContext, useEffect, useState } from "react"

export type GlobalContent = {
  sectionId: string
  setSectionId: (c: string) => void
  sectionName: string
  setSectionName: (c: string) => void
  calendarTimeline: string
  setCalendarTimeline: (c: string) => void
  calendarDate: string
  setCalendarDate: (c: string) => void
  token: string
  setToken: (c: string) => void
  userName: string
  setUserName: (c: string) => void
}

export const MyGlobalContext = createContext<GlobalContent>({
  sectionId: "", // set a default value
  setSectionId: () => { },
  sectionName: "", // set a default value
  setSectionName: () => { },
  calendarTimeline: "", // set a default value
  setCalendarTimeline: () => { },
  calendarDate: "", // set a default value
  setCalendarDate: () => { },
  token: "", // set a default value
  setToken: () => { },
  userName: "", // set a default value
  setUserName: () => { },
})

const getLocalStorageItem = (localStorageItem: string) => {
  if (localStorage.getItem(localStorageItem) === null)
    localStorage.setItem(
      localStorageItem, ""
    );
  return localStorage.getItem(localStorageItem)!;
};

export const useGlobalContext = () => useContext(MyGlobalContext)

export function GlobalContextProvider(props: any) {
  const [sectionId, setSectionId] = useState<string>(getLocalStorageItem("sectionId"))
  useEffect(() => { localStorage.setItem("sectionId", sectionId); }, [sectionId]);

  const [sectionName, setSectionName] = useState<string>(getLocalStorageItem("sectionName"))
  useEffect(() => { localStorage.setItem("sectionName", sectionName); }, [sectionName]);

  const [calendarTimeline, setCalendarTimeline] = useState<string>(getLocalStorageItem("calendarTimeline"))
  useEffect(() => { localStorage.setItem("calendarTimeline", calendarTimeline); }, [calendarTimeline]);

  const [calendarDate, setCalendarDate] = useState<string>(getLocalStorageItem("calendarDate"))
  useEffect(() => { localStorage.setItem("calendarDate", calendarDate); }, [calendarDate]);

  const [token, setToken] = useState<string>(getLocalStorageItem("token"))
  useEffect(() => { localStorage.setItem("token", token); }, [token]);

  const [userName, setUserName] = useState<string>(getLocalStorageItem("userName"))
  useEffect(() => { localStorage.setItem("userName", userName); }, [userName]);

  return (
    <MyGlobalContext.Provider value={{ sectionId, setSectionId, sectionName, setSectionName, calendarTimeline, setCalendarTimeline, calendarDate, setCalendarDate, token, setToken, userName, setUserName }}>
      {props.children}
    </MyGlobalContext.Provider>
  );
}