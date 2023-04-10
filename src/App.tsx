import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  book,
  bookOutline,
  settings,
  settingsOutline,
  time,
  timeOutline,
  // chatbubble, happy
} from 'ionicons/icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useAtomValue } from 'jotai/react';
import { settingsAtom } from 'stores/settings';
import { SplashScreen } from '@capacitor/splash-screen';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/styles.css';

/* Pages */
import QuranPage from 'screens/Quran';
import ViewChapterPage from 'screens/ViewChapter';
import SettingsPage from 'screens/Settings';
import PrayerTimes from 'screens/PrayerTimes';
// const QuranPage = React.lazy(() => import('screens/Quran'));
// const ViewChapterPage = React.lazy(() => import('screens/ViewChapter'));
// const SettingsPage = React.lazy(() => import('screens/Settings'));

setupIonicReact({
  mode: 'ios',
});

const routes: {
  name: string;
  path: string;
  icon: string;
}[] = [
  {
    name: 'Quran',
    path: '/quran',
    icon: bookOutline,
  },
  // {
  //   name: 'Sunnah',
  //   path: '/sunnah',
  //   icon: person,
  // },
  {
    name: 'Prayer Times',
    path: '/prayer-times',
    icon: timeOutline,
  },
  // {
  //   name: 'Dhikr',
  //   path: '/dhikr',
  //   icon: chatbubble,
  // },
  // {
  //   name: 'Good Deeds',
  //   path: '/good-deeds',
  //   icon: happy,
  // },
  {
    name: 'Settings',
    path: '/settings',
    icon: settingsOutline,
  },
];

const queryClient = new QueryClient();

const App: React.FC = () => {
  const settings = useAtomValue(settingsAtom);

  useEffect(() => {
    settings.general.theme === 'dark'
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark');
  }, [settings.general.theme]);

  useEffect(() => {
    setTimeout(async () => await SplashScreen.hide(), 500);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet animated>
              <Route
                exact
                path="/prayer-times"
                render={() => <PrayerTimes />}
              />
              <Route exact path="/quran" render={() => <QuranPage />} />
              <Route
                exact
                path="/quran/:chapterNo"
                render={() => <ViewChapterPage />}
              />
              <Route exact path="/settings" render={() => <SettingsPage />} />

              <Redirect exact path="/" to="/quran" />
            </IonRouterOutlet>

            <IonTabBar
              slot="bottom"
              className="py-1.5 border-t-[.5px] border-[var(--border-color)]"
            >
              {routes.map(({ icon, name, path }, indx) => (
                <IonTabButton tab={name} href={path} key={name}>
                  <IonIcon aria-hidden="true" icon={icon} />
                  <IonLabel>{name}</IonLabel>
                </IonTabButton>
              ))}
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </QueryClientProvider>
  );
};

export default App;
