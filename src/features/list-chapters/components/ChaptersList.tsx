import {
  IonItem,
  IonItemGroup,
  IonSpinner,
  IonToast,
  useIonToast,
} from '@ionic/react';
import React, { useEffect, useMemo, useRef } from 'react';
import { ChapterSortBy } from '../types/Chapter';
import { useChapersList } from '../api/useChapersList';
import { alertCircle } from 'ionicons/icons';
import { useAllJuzs } from '../api/useAllJuzs';
import { ChapterItem } from './ChapterItem';
import { SortedByJuz } from './SortedByJuz';
import { FixedSizeList as List } from 'react-window';

interface ChapetersListProps {
  sortBy: ChapterSortBy;
  search: string;
}

const ChaptersList: React.FC<ChapetersListProps> = ({
  sortBy = 'surah',
  search,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
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
        const chapterValues =
          `${chapter.translated_name.name}, ${chapter.id}, ${chapter.name_arabic}, ${chapter.name_simple}`.toLocaleLowerCase();

        return chapterValues.includes(search.toLowerCase());
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

  const chapters = useMemo(
    () => searchedChapters ?? sortedChapters ?? [],
    [searchedChapters, sortedChapters]
  );

  return (
    <div className="my-3 h-[calc(100%-6.6rem)]" ref={contentRef}>
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
          <List
            height={contentRef.current?.clientHeight ?? window.innerHeight}
            itemCount={chapters.length}
            itemSize={62}
            width="100%"
            itemData={chapters}
          >
            {({ index, style, data }) => (
              <ChapterItem
                style={style}
                name={data[index]?.name_simple}
                versesCount={data[index]?.verses_count}
                id={data[index]?.id}
                translatedName={data[index]?.translated_name.name}
                index={index}
                key={data[index]?.id}
              />
            )}
          </List>
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
