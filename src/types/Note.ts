export interface Note {
  createdTime: {
    date: number;
    day: number;
    hours: number;
    minutes: number;
    month: number;
    seconds: number;
    time: number;
    timezoneOffset: number;
    year: number;
  };
  createdTimeFormatted: string;
  lastEditedTime: {
    date: number;
    day: number;
    hours: number;
    minutes: number;
    month: number;
    seconds: number;
    time: number;
    timezoneOffset: number;
    year: number;
  };
  lastEditedTimeFormatted: string;
  lat: number;
  lon: number;
  name: string;
  text: string;
  uid: number;
}
