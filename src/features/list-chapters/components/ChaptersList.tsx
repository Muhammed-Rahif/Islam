import { quranApiInstance } from 'config/api';
import {
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonRefresher,
  IonRefresherContent,
  IonRippleEffect,
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

interface ChapetersListProps {
  sortBy: ChapterSortBy;
}

const ChapetersList: React.FC<ChapetersListProps> = ({ sortBy = 'surah' }) => {
  const [presentToast] = useIonToast();

  const {
    isLoading,
    error,
    data: chapterData,
    refetch,
  } = useChapersList({
    sortBy,
  });
  const { data: allJuzsData } = useAllJuzs({
    sortBy,
  });

  const handleRefresh = useCallback(
    (event: CustomEvent<RefresherEventDetail>) => {
      refetch()
        .then(() => event.detail.complete())
        .catch((err) => {
          presentToast({
            message: err.message,
            duration: 4500,
            position: 'bottom',
            icon: alertCircle,
          });
        });
    },
    [presentToast, refetch]
  );

  useEffect(() => {
    refetch().catch((err) => {
      presentToast({
        message: err.message,
        duration: 4500,
        position: 'bottom',
        icon: alertCircle,
      });
    });
  }, [refetch, presentToast, sortBy]);

  const juzsItems = useMemo(
    () =>
      allJuzsData?.juzs.map(({ verse_mapping, juz_number }, indx) => {
        const juzChapters = chapterData?.chapters.filter((chapter) =>
          // getting juzs chapters
          Object.keys(verse_mapping).includes(chapter.id.toString())
        );

        return (
          <>
            <IonItemDivider className="z-20">
              <IonLabel>Juz {juz_number}</IonLabel>
            </IonItemDivider>

            {juzChapters?.map(
              ({ name_simple, verses_count, id, translated_name }, i) => {
                return (
                  <ChapterItem
                    name={name_simple}
                    versesCount={verses_count}
                    id={id}
                    translatedName={translated_name.name}
                    index={i}
                  />
                );
              }
            )}
          </>
        );
      }),
    [allJuzsData?.juzs, chapterData?.chapters]
  );

  const chaptersItems = useMemo(
    () =>
      chapterData?.chapters?.map(
        ({ name_simple, verses_count, id, translated_name }, i) => (
          <ChapterItem
            name={name_simple}
            versesCount={verses_count}
            id={id}
            translatedName={translated_name.name}
            index={i}
          />
        )
      ),
    [chapterData?.chapters]
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
        {sortBy !== 'juz'
          ? //  when succesfull data retrieve; and sortBy != 'revelation-order' or 'surah'
            chaptersItems
          : // when succesfull data retrieve; and sortBy == 'juzs'
            juzsItems}
      </IonItemGroup>
    </div>
  );
};

export { ChapetersList };
