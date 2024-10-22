export const Urls = {
  posts: {
    List: '/Posts',
    ByTag: (tag: string) => `/Posts/tag/${tag}`,
    ById: (id: number) => `/Posts/${id}`,
  },
  Users: {
    list: '/Users',
    ById: (id: number) => `/users/${id}`,
  },
  comments: {
    ByPostId: (Pid: number) => `/comments/post/${Pid}`,
  },
};
