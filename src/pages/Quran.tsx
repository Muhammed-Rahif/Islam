import {
  IonContent,
  IonFab,
  IonFabButton,
  IonRefresherContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRippleEffect,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  IonRefresher,
  RefresherEventDetail,
} from '@ionic/react';
import { arrowUp } from 'ionicons/icons';
import { createRef, useCallback } from 'react';

const Quran: React.FC = () => {
  const contentRef = createRef<HTMLIonContentElement>();

  const handleRefresh = useCallback(
    (event: CustomEvent<RefresherEventDetail>) => {
      setTimeout(() => {
        // Any calls to load data go here
        event.detail.complete();
      }, 2000);
    },
    []
  );

  const scrollToTop = useCallback(() => {
    // Passing a duration to the method makes it so the scroll slowly
    // goes to the top instead of instantly
    contentRef.current?.scrollToTop(500);
    console.log(contentRef.current);
  }, [contentRef]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Quran</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent ref={contentRef} fullscreen>
        <IonSearchbar className="sticky top-0 z-30" color="light" />

        <IonSegment className="max-w-[94%] mx-auto" value="surah">
          <IonSegmentButton value="surah">
            <IonLabel>Surah</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="juz">
            <IonLabel>Juz</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="revelation-order">
            <IonLabel>Revelation Order</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        <IonRefresher
          slot="fixed"
          className="z-40"
          onIonRefresh={handleRefresh}
        >
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <div className="my-3">
          {new Array(114).fill(0).map((_, i) => (
            <IonItem
              key={i}
              className="flex items-center w-full [--inner-padding-end:0px]"
              button
            >
              <IonRippleEffect type="unbounded" />
              <h1 className="my-2 ml-1 mr-4">
                <b>{i + 1}</b>
              </h1>
              <IonLabel>
                <h2>Al-Fatihah</h2>
                <p>The Opener</p>
              </IonLabel>
              <IonLabel slot="end" className="m-0">
                <p>7 Ayahs</p>
              </IonLabel>
            </IonItem>
          ))}
        </div>
      </IonContent>

      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton size="small" onClick={scrollToTop}>
          <IonIcon icon={arrowUp}></IonIcon>
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default Quran;
