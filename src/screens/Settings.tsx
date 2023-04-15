import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonPage,
  IonRippleEffect,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {
  QuranSettings,
  GeneralSettings,
  PrayerNotificationSettings,
} from 'features/settings';
import { chevronForwardOutline } from 'ionicons/icons';
import packageJson from '../../package.json';

const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY={false} className="ion-padding">
        <IonList>
          <GeneralSettings />
          <QuranSettings />
          <PrayerNotificationSettings />

          <IonItemGroup className="pb-3">
            <IonItem
              routerLink="/about"
              lines="none"
              className="[--padding-start:0px] [--inner-padding-end:0px] cursor-pointer duration-300"
            >
              <IonLabel>
                <b>About</b>
              </IonLabel>
            </IonItem>
          </IonItemGroup>
        </IonList>

        <IonText className="opacity-30 text-center">
          <p className="mt-6 mb-4">App version {packageJson.version}</p>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
