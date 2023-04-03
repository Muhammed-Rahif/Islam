import { useAtomValue } from 'jotai/react';
import { SettingsType, settingsAtom } from 'stores/settings';
import { numToArabic } from 'utils/string';

function BismiVerse({ ayahNo }: { ayahNo?: number }) {
  const { quran: quranSettings } = useAtomValue(settingsAtom);

  return (
    <div
      style={{
        fontSize: quranSettings.fontSize,
        height: parseInt(quranSettings.fontSize.replace('%', '')) * 0.36,
        fontFamily: quranSettings.fontFamily,
      }}
      lang="ar"
      className="block text-center mt-1"
    >
      بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ{' '}
      {ayahNo && `  ﴿${numToArabic(ayahNo)}﴾  `}
    </div>
  );
}

export { BismiVerse };
