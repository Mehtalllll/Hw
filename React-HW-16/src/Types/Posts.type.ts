export interface Iposts {
  id: number;
  title: string;
  body: string;
  tags: Array<string>;
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}
