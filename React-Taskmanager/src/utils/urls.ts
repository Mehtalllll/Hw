export const Urls = {
  User: { info: '/user' },
  Create: { info: '/user' },
  auth: { Login: '/auth/login', Signup: '/auth/Signup' },
  Task: {
    list: '/task',
    Create: '/task',
    done: (id: number) => `/task/done/${id}`,
    removeById: (id: number) => `/task/${id}`,
    inprogress: (id: number) => `/task/inprogress/${id}`,
  },
};
