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
import { book, person, cog, chatbubble } from 'ionicons/icons';
import { QueryClient, QueryClientProvider } from 'react-query';

import QuranPage from './pages/Quran';

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
import './theme/custom.css';

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
    name: 'Settings',
    path: '/settings',
    icon: cog,
  },
];

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/quran">
              <QuranPage />
            </Route>
            {/* <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route> */}
            <Route exact path="/">
              <Redirect to="/quran" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
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
