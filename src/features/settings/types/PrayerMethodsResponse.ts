import {
  Location,
  Params,
} from '../../list-prayer-times/types/PrayerTimesResponse';

export interface PrayerTimeMethodsResponse {
  code: number;
  status: string;
  data: Data;
}

interface Data {
  [key: string]: PrayerMethod;
}

export interface PrayerMethod {
  id: number;
  name: string;
  params: Params;
  location: Location;
}
