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

  return (
    <GroupedVirtuoso
      groupCounts={juzChaptersGroup?.map((juzChapters) => juzChapters.length)}
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
        if (!juzs) return null;
        if (!chapters) return null;

        const chapter = juzChaptersGroup?.flat(1)[indx];
        if (!chapter) return <div></div>;

        return (
          <ChapterItem
            name={chapter.name_simple}
            versesCount={chapter.verses_count}
            id={chapter.id}
            translatedName={chapter.translated_name.name}
            index={indx}
            key={chapter.id}
          />
        );
      }}
    />
  );
};

export { SortedByJuz };
