export const Urls = {
  posts: {
    List: '/Posts',
    ById: (id: number) => `/Posts/${id}`,
  },
  Users: {
    list: '/Users',
    ById: (id: number) => `/users/${id}`,
  },
};
