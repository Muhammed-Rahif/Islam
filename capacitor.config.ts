import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'tech.rahif.islam',
  appName: 'Islam',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 7000,
      launchAutoHide: true,
    },
    LocalNotifications: {
      smallIcon: 'icon_black',
      iconColor: '#ffffff',
      sound: 'beep.wav',
    },
  },
};

export default config;
