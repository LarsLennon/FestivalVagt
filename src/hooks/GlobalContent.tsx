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
})

const getSectionId = (localStorageItem: string) => {
  if (localStorage.getItem(localStorageItem) === null)
    localStorage.setItem(
      localStorageItem, ""
    );
  return localStorage.getItem(localStorageItem)!;
};

export const useGlobalContext = () => useContext(MyGlobalContext)

export function GlobalContextProvider(props: any) {
  const [sectionId, setSectionId] = useState<string>(getSectionId("sectionId"))
  useEffect(() => { localStorage.setItem("sectionId", sectionId); }, [sectionId]);

  const [sectionName, setSectionName] = useState<string>(getSectionId("sectionName"))
  useEffect(() => { localStorage.setItem("sectionName", sectionName); }, [sectionName]);

  const [calendarTimeline, setCalendarTimeline] = useState<string>(getSectionId("calendarTimeline"))
  useEffect(() => { localStorage.setItem("calendarTimeline", calendarTimeline); }, [calendarTimeline]);

  const [calendarDate, setCalendarDate] = useState<string>(getSectionId("calendarDate"))
  useEffect(() => { localStorage.setItem("calendarDate", calendarDate); }, [calendarDate]);

  return (
    <MyGlobalContext.Provider value={{ sectionId, setSectionId, sectionName, setSectionName, calendarTimeline, setCalendarTimeline, calendarDate, setCalendarDate }}>
      {props.children}
    </MyGlobalContext.Provider>
  );
}