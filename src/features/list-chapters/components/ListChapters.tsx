import { IonItemGroup, IonSpinner, useIonViewDidEnter } from '@ionic/react';
import React, { useMemo, useRef, useState } from 'react';
import { ChapterSortBy } from '../types/Chapter';
import { ChapterItem } from './ChapterItem';
import { SortedByJuz } from './SortedByJuz';
import { FixedSizeList as List } from 'react-window';
import { Chapter } from '../types/Chapter';
import { Juz } from '../types/Juz';

interface ListChaptersProps {
  sortBy: ChapterSortBy;
  search: string;
  chapters: Chapter[];
  juzs: Juz[];
}

const ListChapters: React.FC<ListChaptersProps> = ({
  sortBy = 'surah',
  search,
  chapters,
  juzs,
}) => {
  const contentRef = useRef<HTMLIonItemGroupElement>(null);
  const [chapterListHeight, setChapterListHeight] = useState(
    window.innerHeight
  );

  useIonViewDidEnter(() => {
    setChapterListHeight(
      contentRef.current?.clientHeight ?? window.innerHeight
    );
  });

  const searchedChapters = useMemo(() => {
    if (search.trim()) {
      return chapters?.filter((chapter) => {
        const chapterValues =
          `${chapter.translated_name.name}, ${chapter.id}, ${chapter.name_arabic}, ${chapter.name_simple}`.toLocaleLowerCase();

        return chapterValues.includes(search.toLowerCase());
      });
    }
  }, [chapters, search]);

  const sortedChapters = useMemo(() => {
    const sorted =
      sortBy === 'revelation-order'
        ? chapters.sort((a, b) => a.revelation_order - b.revelation_order)
        : chapters.sort((a, b) => a.id - b.id);

    return sorted;
  }, [chapters, sortBy]);

  // chapters after sorted and searched
  const updatedChaptersArr = useMemo(
    () => searchedChapters ?? sortedChapters ?? [],
    [searchedChapters, sortedChapters]
  );

  return (
    <div className="h-full">
      <IonItemGroup className="h-full" ref={contentRef}>
        {sortBy !== 'juz' ? (
          //  when succesfull data retrieve; and sortBy == 'revelation-order' or 'surah'
          <List
            height={chapterListHeight}
            style={{ height: '100%' }}
            itemCount={updatedChaptersArr.length}
            itemSize={62}
            width="100%"
            itemData={updatedChaptersArr}
            className="ion-content-scroll-host"
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
            chapters={searchedChapters ?? updatedChaptersArr}
            juzs={juzs}
          />
        )}
      </IonItemGroup>
    </div>
  );
};

export { ListChapters };
