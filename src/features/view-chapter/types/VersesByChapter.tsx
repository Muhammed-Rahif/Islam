export interface VersesByChapter {
  verses: Verse[];
  pagination: Pagination;
}

export interface Pagination {
  per_page: number;
  current_page: number;
  next_page: null;
  total_pages: number;
  total_records: number;
}

export interface Verse {
  id: number;
  verse_number: number;
  verse_key: string;
  hizb_number: number;
  rub_el_hizb_number: number;
  ruku_number: number;
  manzil_number: number;
  sajdah_number: null;
  page_number: number;
  juz_number: number;
  words: Word[];
}

export interface Word {
  id: number;
  position: number;
  audio_url: null | string;
  char_type_name: CharTypeName;
  text_uthmani: string;
  location: string;
  page_number: number;
  line_number: number;
  text: string;
  translation: Translation;
  transliteration: Translation;
}

export enum CharTypeName {
  End = 'end',
  Word = 'word',
}

export interface Translation {
  text: null | string;
  language_name: LanguageName;
}

export enum LanguageName {
  English = 'english',
}
