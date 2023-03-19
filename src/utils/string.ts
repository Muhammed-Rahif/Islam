const numToArabic = (s: string | number) =>
  s
    .toString()
    .replace(/\d/g, (d: string | number) => '٠١٢٣٤٥٦٧٨٩'[d as number]);

const arNumToInt = (s: {
  replace: (arg0: RegExp, arg1: (d: any) => number) => any;
}) => s.replace(/[٠-٩]/g, (d: string) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));

const removeHtmlTags = (s: string) => s.replace(/<[^>]*>?/gm, '');

export { arNumToInt, numToArabic, removeHtmlTags };
