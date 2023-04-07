import { IonItemDivider, IonLabel } from '@ionic/react';
import { Chapter } from '../types/Chapter';
import { Juz } from '../types/Juz';
import { ChapterItem } from './ChapterItem';
import { GroupedVirtuoso } from 'react-virtuoso';
import { useMemo } from 'react';

type Props = {
  juzs?: Juz[];
  chapters?: Chapter[];
};

const SortedByJuz: React.FC<Props> = ({ juzs, chapters }) => {
  // array in array: chapters in juz. Eg: [[chapter-1,chapter-2],[chapter-2,chapter-3]]
  const juzChaptersGroup = useMemo(() => {
    if (!juzs) return null;
    if (!chapters) return null;

    return juzs.map((juz) => {
      const chapterIds = Object.keys(juz.verse_mapping);
      return chapterIds
        .map((chapterId) => {
          return chapters.find((chapter) => chapter.id === Number(chapterId));
        })
        .filter((chapter) => chapter);
    });
  }, [juzs, chapters]);

  // juz chapters cout like [2, 1, 3, 1, 4, 2, 2, 5]
  const juzChaptersCount = useMemo(
    () => juzChaptersGroup?.map((juzChapters) => juzChapters.length) ?? [],
    [juzChaptersGroup]
  );

  return (
    <GroupedVirtuoso
      groupCounts={juzChaptersCount}
      groupContent={(index) => {
        return juzChaptersGroup![index].length > 0 ? (
          <IonItemDivider className="z-40 relative">
            <IonLabel>Juz {juzs![index].juz_number}</IonLabel>
          </IonItemDivider>
        ) : (
          <div style={{ height: 0.5 }}></div>
        );
      }}
      className="w-full h-full"
      itemContent={(indx, groupIndx) => {
        if (!juzs) return;
        if (!chapters) return;

        const chapter = juzChaptersGroup?.flat(1)[indx];
        if (!chapter) return;

        return (
          <ChapterItem
            name={chapter.name_simple}
            versesCount={chapter.verses_count}
            id={chapter.id}
            translatedName={chapter.translated_name.name}
            key={chapter.id}
          />
        );
      }}
    />
  );
};

export { SortedByJuz };
