export interface Snippet {
  id: any;
  title: string;
  desc: string;
  code: {
    html: string;
    css: string;
    htmlSource: string;
    cssSource: string;
    lang: string;
  };
}
