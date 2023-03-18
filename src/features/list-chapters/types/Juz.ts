export interface Juz {
  juz_number: number;
  first_verse_id: number;
  last_verse_id: number;
  verses_count: number;
  verse_mapping: { [key: string]: string };
}
