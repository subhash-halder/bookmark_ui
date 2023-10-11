export interface Bookmark {
  id: string;
  index: number;
  title: string;
  url?: string;
  children?: Bookmark[];
  parentId?: string;
}

export interface State {
  bookmarks: Bookmark[];
}
