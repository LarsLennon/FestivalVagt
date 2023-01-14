import './Calendar.css';
import CalendarMonth from '../components/calendar.component';
import { useEffect, useState } from 'react';
import { BackendAPI } from '../services/api.service';
import CalendarMonth2 from '../components/calendar2.component';

interface IFooBar {
    ShiftId?: number;
    Name?: string;
    Slots?: number;
    StartTime?: string;
    EndTime?: string;

  }

export default function Calendar() {
    let itemInstance = {
        header: "",
        status: "",
        from: "",
        to: "",
        bookingsCount: "",
        bookingPercentage: "",
        incidents: [],
      };
    const [itemResources, setItemResources] = useState(null);
    const id = 0;
    //console.log("Calendar");
    const reloadItemResources = () => {
        BackendAPI("Shifts")
            .get()
            .then((res) => {
              setItemResources(res.data);
              //console.log(res.data);
            //console.log("Response");
            //console.log("Response");
            });
      };
    
  useEffect(() => {
    reloadItemResources();
  }, [id]);

    //const user: IFooBar = JSON.parse(itemResources!)
    
  //console.log(itemResources![1]);
  const shift:IFooBar[] = itemResources!;
  
//   if(itemResources != null)
//   {
//     const shift:IFooBar[] = itemResources;
//     console.log(shift[5].ShiftId);
//     console.log(shift[5].StartTime);
//     console.log(shift[5].EndTime);

//   }
const events = 
[{
    "ShiftId": 1,
    "Name": "VoV Skranke",
    "StartTime": "2021-06-19T08:15:00",
    "EndTime": "2021-06-19T19:00:00",
    "Slots": 5,
    "TimeFactor": 1,
    "SectionId": 1,
},{
    "ShiftId": 2,
    "Name": "VoV Skranke",
    "StartTime": "2021-06-19T08:15:00",
    "EndTime": "2021-06-19T19:00:00",
    "Slots": 5,
    "TimeFactor": 1,
    "SectionId": 1,
}
];
    return (
        <div>
            {/* <p>{itemResources![0]}</p> */}
            <CalendarMonth2 events = {itemResources!}></CalendarMonth2>
        </div>
    );
}