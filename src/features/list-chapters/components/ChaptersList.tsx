import {
  IonItem,
  IonItemGroup,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonToast,
  RefresherEventDetail,
  useIonToast,
} from '@ionic/react';
import React, { useCallback, useEffect, useMemo } from 'react';
import { ChapterSortBy } from '../types/Chapter';
import { useChapersList } from '../api/useChapersList';
import { alertCircle } from 'ionicons/icons';
import { useAllJuzs } from '../api/useAllJuzs';
import { ChapterItem } from './ChapterItem';
import { SortedByJuz } from './SortedByJuz';

interface ChapetersListProps {
  sortBy: ChapterSortBy;
}

const ChapetersList: React.FC<ChapetersListProps> = ({ sortBy = 'surah' }) => {
  const [presentToast] = useIonToast();

  const {
    isLoading,
    error,
    data: chapterData,
    refetch: refetchChapters,
  } = useChapersList();
  const { data: allJuzsData, refetch: refetchAllJuzs } = useAllJuzs();

  // when refetching
  const handleRefresh = useCallback(
    (event: CustomEvent<RefresherEventDetail>) => {
      Promise.all([refetchChapters(), refetchAllJuzs()])
        .catch((err) => {
          presentToast({
            message: err.message,
            duration: 4500,
            position: 'bottom',
            icon: alertCircle,
          });
        })
        .finally(() => event.detail.complete());
    },
    [presentToast, refetchAllJuzs, refetchChapters]
  );

  // runs when 'sortBy' state changes
  useEffect(() => {
    Promise.all([refetchChapters(), refetchAllJuzs()]).catch((err) => {
      presentToast({
        message: err.message,
        duration: 4500,
        position: 'bottom',
        icon: alertCircle,
      });
    });
  }, [refetchChapters, presentToast, sortBy, refetchAllJuzs]);

  const sortedChapters = useMemo(
    () =>
      sortBy === 'revelation-order'
        ? chapterData?.chapters.sort(
            (a, b) => a.revelation_order - b.revelation_order
          )
        : chapterData?.chapters.sort((a, b) => a.id - b.id),
    [chapterData, sortBy]
  );

  return (
    <div className="my-3">
      <IonRefresher slot="fixed" className="z-40" onIonRefresh={handleRefresh}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>

      {/* when error appears */}
      {error ? (
        <IonToast
          isOpen={Boolean(error)}
          message={error ? (error as any).message : error}
          duration={4500}
          icon={alertCircle}
        />
      ) : null}

      {/* when api is loading */}
      {isLoading && (
        <IonItem
          lines="none"
          className="flex items-center w-full [--inner-padding-end:0px]"
        >
          <IonSpinner className="mx-auto" />
        </IonItem>
      )}

      <IonItemGroup>
        {sortBy !== 'juz' ? (
          //  when succesfull data retrieve; and sortBy == 'revelation-order' or 'surah'
          sortedChapters?.map(
            ({ name_simple, verses_count, id, translated_name }, i) => (
              <ChapterItem
                name={name_simple}
                versesCount={verses_count}
                id={id}
                translatedName={translated_name.name}
                index={i}
              />
            )
          )
        ) : (
          // when succesfull data retrieve; and sortBy == 'juzs'
          <SortedByJuz
            chapters={chapterData?.chapters}
            juzs={allJuzsData?.juzs}
          />
        )}
      </IonItemGroup>
    </div>
  );
};

export { ChapetersList };
