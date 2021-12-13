export function compareDate(date1: Date, date2: Date): number {
  // With Date object we can compare dates them using the >, <, <= or >=.
  // The ==, !=, ===, and !== operators require to use date.getTime(),
  // so we need to create a new instance of Date with 'new Date()'
  let d1 = toJSTDate(date1);
  let d2 = toJSTDate(date2);

  // Check if the dates are equal
  let same = d1.getTime() === d2.getTime();
  if (same) return 0;

  // Check if the first is greater than second
  if (d1 > d2) return 1;

  return -1;
}

export function addDays(baseDate: Date, days: number): Date {
  var futureDate = toJSTDate(baseDate);
  futureDate.setDate(futureDate.getDate() + days);
  return futureDate;
}

export function isInRange(
  target: Date,
  startDate: Date,
  endDate: Date
): boolean {
  // before start
  if (compareDate(target, startDate) < 0) {
    return false;
  }
  // after end
  if (compareDate(target, endDate) > 0) {
    return false;
  }
  return true;
}

export function getImageUrl(url: string): string {
  if (!url) {
    return `${process.env.PUBLIC_URL}/images/noimage.png`;
  } else {
    return url;
  }
}

export function getFallbackImageUrl(): string {
  return `${process.env.PUBLIC_URL}/images/loading.svg`;
}

function toJSTDate(date: Date): Date {
  const jst = new Date(
    date.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })
  );
  return new Date(jst.getFullYear(), jst.getMonth(), jst.getDate());
}
