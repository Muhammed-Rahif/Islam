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
      <IonContent fullscreen className="ion-padding">
        <IonList>
          <GeneralSettings />
          <QuranSettings />
          <PrayerNotificationSettings />

          <IonItemGroup className="pb-3">
            <IonItem
              href="https://t.me/islam_app_community"
              target="_blank"
              lines="none"
              className="[--padding-start:0px] [--inner-padding-end:0px] cursor-pointer duration-300"
            >
              <IonLabel>Report a problem</IonLabel>
            </IonItem>

            <IonItem
              routerLink="/about"
              lines="none"
              className="[--padding-start:0px] [--inner-padding-end:0px] cursor-pointer duration-300"
            >
              <IonLabel>
                <b>About</b>
              </IonLabel>
            </IonItem>

            <IonItem
              href={`https://github.com/Muhammed-Rahif/Islam/releases/tag/${packageJson.version}`}
              target="_blank"
              lines="none"
              className="[--padding-start:0px] [--inner-padding-end:0px] cursor-pointer duration-300"
            >
              <IonLabel>App version</IonLabel>
              <IonLabel slot="end">{packageJson.version}</IonLabel>
            </IonItem>
          </IonItemGroup>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
