import React from 'react';
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
import { book, person, cog, chatbubble, happy } from 'ionicons/icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
// const QuranPage = React.lazy(() => import('./pages/Quran'));
// const ViewChapter = React.lazy(() => import('pages/ViewChapter'));

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
    icon: book,
  },
  {
    name: 'Sunnah',
    path: '/sunnah',
    icon: person,
  },
  {
    name: 'Dhikr',
    path: '/dhikr',
    icon: chatbubble,
  },
  {
    name: 'Good Deeds',
    path: '/good-deeds',
    icon: happy,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: cog,
  },
];

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet animated>
            <Route exact path="/quran" render={() => <QuranPage />} />
            <Route exact path="/quran/:id" render={() => <ViewChapterPage />} />

            <Redirect exact path="/" to="/quran" />
          </IonRouterOutlet>

          <IonTabBar slot="bottom" className="[border-top:1px_solid] py-1.5">
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

export default App;
