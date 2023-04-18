import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { ListContributors } from 'features/list-contributors';
import packageJson from '../../package.json';
import { ListStargazers } from 'features/list-stargazers';
import Divider from 'components/Divider';
import { FC } from 'react';

const About: FC = () => {
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
            easy access to the Quran, Sunnah, and Dhikrs. Whether you&apos;re a
            seasoned scholar or a newcomer to the faith, this app is designed to
            help you deepen your understanding of Islam and improve your
            practice.
            <br />
            <br />
            Built on the Ionic iOS theme, the app offers a user-friendly
            interface that&apos;s easy to navigate. Users can choose between
            dark and white modes to suit their preferences.
            <br />
            <br />
            One of the unique features of the Islam Application is that it
            provides an opportunity for its contributors to earn sadaqah
            jariyah. By contributing to the development of the app, you can earn
            ongoing charity that continues to benefit you even after you&apos;ve
            passed away.
            <br />
            <br />
            Our goal with the Islam Application is to provide a comprehensive
            resource that will benefit Muslims worldwide. We welcome your
            feedback and suggestions on how we can improve the app and make it
            even more valuable to the community.
          </p>
        </IonText>

        <Divider className="my-3 opacity-20" />

        <ListContributors />
        <Divider className="my-3 opacity-20" />
        <ListStargazers />

        <IonItem
          href={`https://github.com/Muhammed-Rahif/Islam/releases/tag/${packageJson.version}`}
          target="_blank"
          lines="none"
          className="cursor-pointer opacity-40 duration-300 [--inner-padding-end:0px] [--padding-start:0px]"
        >
          <IonLabel>App version</IonLabel>
          <IonLabel slot="end">{packageJson.version}</IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default About;
