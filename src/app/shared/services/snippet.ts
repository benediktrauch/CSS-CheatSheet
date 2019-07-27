export interface Snippet {
  id?: any;
  title: string;
  desc: string;
  code: {
    html: string;
    css: string;
    js?: string;
    lang: string;
  };
  tags?: any[];
  likes?: number;
  createdBy?: string;
  createdAt?: any;
  updatedBy?: string;
  updatedAt?: any;
  deleted?: boolean;
}
