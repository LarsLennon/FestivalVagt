
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
  ShiftId?: number;
  Name?: string;
  Slots?: number;
  StartTime?: string;
  EndTime?: string;
  Members: MemberDTO[];

}