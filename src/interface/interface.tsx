
export interface MemberDTO {
  memberId?: number;
  name?: string;
  membaNumber?: string;
  driver?:boolean;
  experienced?:boolean;
  firstAid?:boolean;
  requireAttributes?:boolean;
  units?:number;
}

export interface MemberAttributesDTO {
  driver?:boolean;
  firstAid?:boolean;
}

export interface TeamDetailsDTO {
  teamId: number;
  name?: string;
  number?: string;
  sections: SectionDTO[];
}
export interface TeamDTO {
  teamId: number;
  name?: string;
  number?: string;
}

export interface MembaTeamDTO {
  TeamNumber?: string;
  TeamId?: number;
  TeamParentId?: number;
  TeamName?: string;
  IsGroup?: boolean;
  SeasonId?: number;
  CopyOfTeamId?: number;
}


export interface SectionDTO {
  sectionId: string;
  ShiftId?: number;
  name?: string;
  Slots?: number;
  StartTime?: string;
  EndTime?: string;
  isActive?: boolean;
}

export interface SectionDetailsDTO {
  sectionId: string;
  ShiftId?: number;
  name?: string;
  Slots?: number;
  StartTime?: string;
  EndTime?: string;
  isActive?: boolean;
  team: TeamDTO;
}

export interface SectionCreateDTO {
  TeamId: number;
  Name: string;
  // IsActive?: boolean;
}

export interface SectionEditDTO {
  SectionId: string;
  Name: string;
  isActive?: boolean;
  openTime?: string;
  closeTime?: string;
}

export interface MyShiftsDTO {
  shiftId?: number;
  units: number;
  name?: string;
  slots?: number;
  startTime?: string;
  endTime?: string;
  shifts: ShiftDTO[];
}

export interface ShiftDTO {
  shiftId?: number;
  units: number;
  name?: string;
  slots?: number;
  startTime?: string;
  endTime?: string;
  members: MemberDTO[];
}

export interface ShiftWithMemberDTO {
  shiftId?: number;
  name?: string;
  slots?: number;
  startTime?: string;
  endTime?: string;
  members: MemberDTO[];
}

export interface CalendarShiftMemberDTO {
  memberId: number;
  name?: string;
}

export interface CalendarShiftDTO {
  shiftId: string;
  name?: string;
  allDay: boolean;
  units: number;
  slots?: number;
  reqDrivers?: string;
  reqExperienced?: string;
  timeFactor?: string;
  startTime?: string;
  endTime?: string;
  myShift?: string;
  conflict?: number;
  priority: number;
  description?: string;
  members: CalendarShiftMemberDTO[];
}

export interface CalendarDTO {
  name: string;
  requireAttributes: boolean;
  units: number;
  openTime: string;
  closeTime: string;
  firstDate: string;
  lastDate: string;
  isOpen: boolean;
  shifts: CalendarShiftDTO[];

}

// ShiftTypes

export interface ShiftTypeCreateDTO {
  teamId: number;
  priority: string;
  name: string;
  description: string;
}