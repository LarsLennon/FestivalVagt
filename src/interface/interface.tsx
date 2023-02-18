
export interface MemberDTO {
  memberId?: number;
  name?: string;
  membaNumber?: string;
  driver?:boolean;
  experienced?:boolean;
  firstAid?:boolean;
  units?:number;

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
}

export interface SectionDetailsDTO {
  sectionId: string;
  ShiftId?: number;
  name?: string;
  Slots?: number;
  StartTime?: string;
  EndTime?: string;
  team: TeamDTO;
}

export interface SectionCreateDTO {
  TeamId: number;
  Name: string;
}

export interface ShiftDTO {
  shiftId?: number;
  name?: string;
  slots?: number;
  startTime?: string;
  endTime?: string;
  members: MemberDTO[];
}

export interface CalendarShiftDTO {
  shiftId: string;
  name?: string;
  slots?: number;
  startTime?: string;
  endTime?: string;
  myShift?: string;
  conflict?: number;
  members: MemberDTO[];
}

export interface CalendarDTO {
  name: string;
  openTime: string;
  closeTime: string;
  firstDate: string;
  lastDate: string;
  isOpen: boolean;
  shifts: CalendarShiftDTO[];

}