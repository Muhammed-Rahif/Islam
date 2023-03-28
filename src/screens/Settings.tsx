import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { QuranSettings, GeneralSettings } from 'features/settings';

const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY={false} className="ion-padding">
        <IonList>
          <GeneralSettings />
          <QuranSettings />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
