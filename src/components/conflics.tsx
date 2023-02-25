export enum ConflictType {
  None = 0,
  NeedExperience,
  NeedDriver,
  TimeConflict,
  AlreadyAssigned,
  NotSelectable,
  TooManyShifts,
  ShiftFull,
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
      return "Du har en vagt der overlapper";

    case ConflictType.AlreadyAssigned:
      return "Du har allerede denne vagt";

    case ConflictType.NotSelectable:
      return "Denne vagt skal tildeles";

    case ConflictType.TooManyShifts:
      return "Du kan ikke tage flere vagter";

    case ConflictType.ShiftFull:
      return "Ingen ledige pladser";

    default:
      return "Ukendt konflikt! Type: " + conflict;
  }

}