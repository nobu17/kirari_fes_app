import { compareDate } from "./Utility";

export class PeriodCheckService {
  public checkRange(): PeriodCheckResult {
    const current = new Date();
    const [startDate, endDate] = this.getEventAvailalbleDates();
    // before start
    if (compareDate(current, startDate) < 0) {
        return new PeriodCheckResult("Before");
    }
    // after end
    if (compareDate(current, endDate) > 0) {
        return new PeriodCheckResult("After");
    }
    return new PeriodCheckResult("InRange");
  }

  public getStartAndEndDate(): Array<string> {
      return [this.getStartDate(), this.getEndDate()];
  }

  private getEventAvailalbleDates(): Array<Date> {
    return [new Date(this.getStartDate()), new Date(this.getEndDate())];
  }
  private getStartDate (): string {
      const start = process.env.REACT_APP_EVENT_START_DATE;
      if (!start) {
          throw new Error("Invalid start date");
      }
      return start;
  }
  private getEndDate (): string {
    const end = process.env.REACT_APP_EVENT_END_DATE;
    if (!end) {
        throw new Error("Invalid end date");
    }
    return end;
}
}

export type PeriodType = "Before" | "InRange" | "After";

export class PeriodCheckResult {
  constructor(public data: PeriodType) {}
}
