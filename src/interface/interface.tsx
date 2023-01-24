
export interface MemberDTO {
    Name?: string;
    MemberId?: number;
  
  }
  
export interface ShiftDTO {
    ShiftId?: number;
    Name?: string;
    Slots?: number;
    StartTime?: string;
    EndTime?: string;
    Members: MemberDTO[];
  
  }