import { useAtomValue } from 'jotai/react';
import { SettingsType, settingsAtom } from 'stores/settings';
import { numToArabic } from 'utils/string';

type Props = {
  className?: string;
};

function BismiVerse({ className }: Props) {
  const { quran: quranSettings } = useAtomValue(settingsAtom);

  return (
    <div
      style={{
        fontSize: quranSettings.fontSize,
        fontFamily: quranSettings.fontFamily,
      }}
      lang="ar"
      className={`block text-center leading-[225%] ${className}`}
    >
      بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
    </div>
  );
}

export { BismiVerse };
