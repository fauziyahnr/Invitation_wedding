export interface Guest {
  name: string;
  status: 'hadir' | 'tidak_hadir';
  count: number;
  wish: string;
  formatted?: boolean;
  date: string;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
