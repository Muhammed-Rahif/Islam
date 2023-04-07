import { IonItemGroup, IonSpinner, useIonViewDidEnter } from '@ionic/react';
import React, { useMemo, useRef, useState } from 'react';
import { ChapterSortBy } from '../types/Chapter';
import { useChapersList } from '../api/useChapersList';
import { useAllJuzs } from '../api/useAllJuzs';
import { ChapterItem } from './ChapterItem';
import { SortedByJuz } from './SortedByJuz';
import { FixedSizeList as List } from 'react-window';
import DisplayError from 'components/DisplayError';

interface ChapetersListProps {
  sortBy: ChapterSortBy;
  search: string;
}

const ChaptersList: React.FC<ChapetersListProps> = ({
  sortBy = 'surah',
  search,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [chapterListHeight, setChapterListHeight] = useState(
    window.innerHeight
  );

  const { isLoading, error, data: chapterData } = useChapersList();
  const { data: allJuzsData } = useAllJuzs();

  useIonViewDidEnter(() => {
    setChapterListHeight(
      contentRef.current?.clientHeight ?? window.innerHeight
    );
  });

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

  // chapters after sorted and searched
  const chapters = useMemo(
    () => searchedChapters ?? sortedChapters ?? [],
    [searchedChapters, sortedChapters]
  );

  return (
    <div className="my-3 h-[calc(100%-6.6rem)]" ref={contentRef}>
      {/* when error appears */}
      {error ? <DisplayError error={error} /> : null}

      {/* when api is loading */}
      {isLoading && (
        <div className="w-full h-full grid place-items-center">
          <IonSpinner />
        </div>
      )}

      <IonItemGroup className="h-full">
        {sortBy !== 'juz' ? (
          //  when succesfull data retrieve; and sortBy == 'revelation-order' or 'surah'
          <List
            height={chapterListHeight}
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
