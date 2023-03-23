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
import { Virtuoso } from 'react-virtuoso';

interface ChapetersListProps {
  sortBy: ChapterSortBy;
  search: string;
}

const ChaptersList: React.FC<ChapetersListProps> = ({
  sortBy = 'surah',
  search,
}) => {
  const [presentToast] = useIonToast();

  const {
    isLoading,
    error,
    data: chapterData,
    refetch: refetchChapters,
  } = useChapersList();
  const { data: allJuzsData, refetch: refetchAllJuzs } = useAllJuzs();

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

  const searchedChapters = useMemo(() => {
    if (search.trim()) {
      return chapterData?.chapters?.filter((chapter) => {
        (chapter as any).t = chapter.translated_name.name;
        return Object.values(chapter)
          .join(' ')
          .toLowerCase()
          .replace('[object object]', '')
          .includes(search.toLowerCase());
      });
    }
  }, [chapterData?.chapters, search]);

  const sortedChapters = useMemo(() => {
    const sorted =
      sortBy === 'revelation-order'
        ? chapterData?.chapters.sort(
            (a, b) => a.revelation_order - b.revelation_order
          )
        : chapterData?.chapters.sort((a, b) => a.id - b.id);

    return sorted;
  }, [chapterData, sortBy]);

  const chapters = searchedChapters ?? sortedChapters ?? [];

  return (
    <div className="my-3 h-[calc(100%-6.5rem)]">
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

      <IonItemGroup className="h-full">
        {sortBy !== 'juz' ? (
          //  when succesfull data retrieve; and sortBy == 'revelation-order' or 'surah'
          <Virtuoso
            className="ion-content-scroll-host h-full w-full"
            data={chapters}
            itemContent={(
              index,
              { name_simple, verses_count, id, translated_name }
            ) => {
              return (
                <ChapterItem
                  name={name_simple}
                  versesCount={verses_count}
                  id={id}
                  translatedName={translated_name.name}
                  index={index}
                  key={id}
                />
              );
            }}
          />
        ) : (
          // when succesfull data retrieve; and sortBy == 'juzs'
          <SortedByJuz
            chapters={searchedChapters ?? chapterData?.chapters}
            juzs={allJuzsData?.juzs}
          />
        )}
      </IonItemGroup>
    </div>
  );
};

export { ChaptersList };
