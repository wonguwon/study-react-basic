export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_ENDPOINTS = {
  POSTS: '/posts',
  POST: (id) => `/posts/${id}`,
};
