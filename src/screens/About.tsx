import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItemDivider,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { ListContributors } from 'features/list-contributors';
import packageJson from '../../package.json';

const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons>
            <IonBackButton type="reset" defaultHref="/"></IonBackButton>
          </IonButtons>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonText className="mb-4">
          <h2 className="text-xl">
            <b>
              The Islam Application - Your Comprehensive Resource for Enhancing
              Your Knowledge and Practice of Islam
            </b>
          </h2>

          <p className="mt-4">
            The Islam Application is a mobile app that provides Muslims with
            easy access to the Quran, Sunnah, and Dhikrs. Whether you're a
            seasoned scholar or a newcomer to the faith, this app is designed to
            help you deepen your understanding of Islam and improve your
            practice.
            <br />
            <br />
            Built on the Ionic iOS theme, the app offers a user-friendly
            interface that's easy to navigate. Users can choose between dark and
            white modes to suit their preferences.
            <br />
            <br />
            One of the unique features of the Islam Application is that it
            provides an opportunity for its contributors to earn sadaqah
            jariyah. By contributing to the development of the app, you can earn
            ongoing charity that continues to benefit you even after you've
            passed away.
            <br />
            <br />
            Our goal with the Islam Application is to provide a comprehensive
            resource that will benefit Muslims worldwide. We welcome your
            feedback and suggestions on how we can improve the app and make it
            even more valuable to the community.
          </p>
        </IonText>

        <hr className="mt-3 mb-5  opacity-20" />

        <ListContributors />

        <IonText className="opacity-30 text-center">
          <p className="mt-6 mb-4">App version {packageJson.version}</p>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default About;
