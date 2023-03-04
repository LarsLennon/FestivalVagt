export enum ConflictType {
  None = 0,
  NeedExperience,
  NeedDriver,
  TimeConflict,
  AlreadyAssigned,
  NotSelectable,
  TooManyShifts,
  ShiftFull,
  SectionClosed
}


export function calendarConflict(conflict: number) {

  switch (conflict) {

    case ConflictType.None:
      return "";

      case ConflictType.NotSelectable:
        return "Denne vagt skal tildeles";
        
    case ConflictType.NeedExperience:
      return "Denne vagt kræver erfaring";

    case ConflictType.NeedDriver:
      return "Denne vagt kræver kørekort";

    case ConflictType.TimeConflict:
      return "Du har anden vagt på samme tid";  

    default:
      return "";
  }

}

export default function conflict(conflict: number) {

  switch (conflict) {

    case ConflictType.None:
      return "";

    case ConflictType.NeedExperience:
      return "Denne vagt kræver erfaring";

    case ConflictType.NeedDriver:
      return "Denne vagt kræver kørekort";

    case ConflictType.TimeConflict:
      return "Du har anden vagt på samme tid";

    case ConflictType.AlreadyAssigned:
      return "Du har allerede denne vagt";

    case ConflictType.NotSelectable:
      return "Denne vagt skal tildeles";

    case ConflictType.TooManyShifts:
      return "";

    case ConflictType.ShiftFull:
      return "Ingen ledige pladser";

      case ConflictType.SectionClosed:
        return "Vagtplanen er lukket";
  

    default:
      return "Ukendt konflikt! Type: " + conflict;
  }

}