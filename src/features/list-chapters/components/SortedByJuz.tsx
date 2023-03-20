import { IonItemDivider, IonLabel } from '@ionic/react';
import { Fragment } from 'react';
import { Chapter } from '../types/Chapter';
import { Juz } from '../types/Juz';
import { ChapterItem } from './ChapterItem';

type Props = {
  juzs?: Juz[];
  chapters?: Chapter[];
};

const SortedByJuz: React.FC<Props> = ({ juzs, chapters }) => {
  return (
    <>
      {juzs?.map(({ verse_mapping, juz_number }, indx) => {
        const juzsChapters = chapters?.filter((chapter) =>
          // getting juzs chapters
          Object.keys(verse_mapping).includes(chapter.id.toString())
        );

        return (
          <Fragment key={indx}>
            {juzsChapters!.length > 0 && (
              <IonItemDivider className="z-20">
                <IonLabel>Juz {juz_number}</IonLabel>
              </IonItemDivider>
            )}

            {juzsChapters?.map(
              ({ name_simple, verses_count, id, translated_name }, i) => {
                return (
                  <ChapterItem
                    name={name_simple}
                    versesCount={verses_count}
                    id={id}
                    translatedName={translated_name.name}
                    index={id}
                  />
                );
              }
            )}
          </Fragment>
        );
      })}
    </>
  );
};

export { SortedByJuz };
