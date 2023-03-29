export type Translations = Translation[];

export interface Translation {
  id: number;
  name: string;
  author_name: string;
  slug: null | string;
  language_name: string;
  translated_name: TranslatedName;
}

export interface TranslatedName {
  name: string;
}
