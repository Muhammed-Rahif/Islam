import { Capacitor } from '@capacitor/core';
import {
  Geolocation as NativeGeolocation,
  Position,
} from '@capacitor/geolocation';

export async function getGeoLocation(): Promise<Position | undefined> {
  if (Capacitor.isNativePlatform()) {
    // for android
    const reqForLocation = await NativeGeolocation.requestPermissions();

    if (reqForLocation.coarseLocation === 'granted') {
      return await NativeGeolocation.getCurrentPosition();
    } else {
      throw Error('Location permission not granted');
    }
  } else {
    // for web
    return await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );
  }
}
