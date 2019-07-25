export interface Snippet {
  id?: any;
  title: string;
  desc: string;
  code: {
    html: string;
    css: string;
    lang: string;
  };
}
