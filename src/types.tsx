export type Post = {
  id: number;
  title: string;
  body: string;
};

export type PostListProps = {
  posts: Post[] | undefined;
  selectedPostID: number;
  setSelectedPostID: (id: number) => void;
};
