import {
  ListChapters,
  ChapterSortBy,
  useAllJuzs,
  useChapersList,
} from 'features/list-chapters';
import {
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { FC, createRef, useState } from 'react';
import DisplayError from 'components/DisplayError';

const Quran: FC = () => {
  // eslint-disable-next-line no-undef
  const contentRef = createRef<HTMLIonContentElement>();
  const [sortBy, setSortBy] = useState<ChapterSortBy>('surah');
  const [search, setSearch] = useState('');

  const {
    isLoading,
    error,
    data: chaptersData,
    refetch: refetchChapters,
  } = useChapersList();
  const { data: allJuzsData } = useAllJuzs();

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Quran</IonTitle>
        </IonToolbar>

        <IonToolbar>
          <IonSearchbar
            onIonInput={(e) => setSearch(e.detail.value!)}
            className="sticky top-0 z-30 !pb-0"
          />
        </IonToolbar>

        <IonToolbar>
          <IonSegment
            className="mx-auto mb-1.5 w-full max-w-[calc(100%-1.5rem)]"
            value={sortBy}
            onIonChange={(e) => setSortBy(e.detail.value as ChapterSortBy)}
          >
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
        </IonToolbar>
      </IonHeader>
      <IonContent
        ref={contentRef}
        className="ion-padding-horizontal"
        fullscreen
        scrollY={false}
      >
        {isLoading && (
          <div className="grid h-3/4 w-full place-items-center">
            <IonSpinner />
          </div>
        )}

        {Boolean(error) && (
          <DisplayError
            className="h-full"
            error={error}
            toastOnly={Boolean(chaptersData?.chapters.length)}
            onRetry={refetchChapters}
          />
        )}

        {chaptersData?.chapters && (
          <ListChapters
            chapters={chaptersData?.chapters ?? []}
            juzs={allJuzsData?.juzs ?? []}
            search={search}
            sortBy={sortBy}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Quran;
