const numToArabic = (s: string | number) =>
  s
    .toString()
    .replace(/\d/g, (d: string | number) => '٠١٢٣٤٥٦٧٨٩'[d as number]);

const arNumToInt = (s: {
  replace: (arg0: RegExp, arg1: (d: any) => number) => any;
}) => s.replace(/[٠-٩]/g, (d: string) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));

const removeHtmlTags = (
  s: string,
  { removeContent = false }: { removeContent?: boolean } = {}
) => s.replace(removeContent ? /<[^>]*>([^<]*)<\/[^>]*>/g : /<[^>]*>/g, '');

const truncate = (input: string, length = 5) =>
  input.length > length ? `${input.substring(0, length)}...` : input;

export { arNumToInt, numToArabic, removeHtmlTags, truncate };
