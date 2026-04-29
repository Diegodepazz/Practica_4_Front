export type UserT = {
  id: string;
  username: string;
  email?: string;
  bio?: string;
  followersCount?: number;
  followingCount?: number;
  isFollowing?: boolean;
};

export type CommentT = {
  id: string;
  content: string;
  createdAt: string;
  author: UserT;
};

export type PostT = {
  id: string;
  content: string;
  createdAt: string;
  likesCount: number;
  retweetsCount: number;
  likedByMe?: boolean;
  retweetedByMe?: boolean;
  author: UserT;
  comments?: CommentT[];
};

export type HomeResponseT = {
  posts: PostT[];
  page: number;
  totalPages: number;
};

export type AuthResponseT = {
  token: string;
  user?: UserT | null;
};

export type ProfileResponseT = {
  user: UserT;
  posts: PostT[];
  page?: number;
  totalPages?: number;
};