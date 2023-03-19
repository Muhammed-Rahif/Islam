export interface VersesUthmani {
  verses: Verse[];
  meta: Meta;
}

export interface Meta {
  filters: Filters;
}

export interface Filters {
  chapter_number: string;
}

export interface Verse {
  id: number;
  verse_key: string;
  text_uthmani: string;
}
