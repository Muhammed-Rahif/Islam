export interface VersesUthmani {
  verses: UthmaniVerse[];
  meta: Meta;
}

export interface Meta {
  filters: Filters;
}

export interface Filters {
  chapter_number: string;
}

export interface UthmaniVerse {
  id: number;
  verse_key: string;
  text_uthmani: string;
}
