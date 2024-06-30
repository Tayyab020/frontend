import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Utility function to handle errors
const handleError = (error) => {
  const errorMessage = error.response && error.response.data && error.response.data.message 
    ? error.response.data.message 
    : error.message;

  throw new Error(errorMessage);
};



export const login = async (data) => {
  try {
    const response = await api.post("/login", data);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const signup = async (data) => {
  try {
    const response = await api.post("/register", data);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const signout = async () => {
  try {
    const response = await api.post("/logout");
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const getAllBlogs = async () => {
  try {
    const response = await api.get("/blog/all");
    return response;
  } catch (error) {
    handleError(error);
  }
};



export const getBlogById = async (id) => {
  try {
    const response = await api.get(`/blog/${id}`);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const deleteBlog = async (id) => {
  try {
    const response = await api.delete(`/blog/${id}`);
    return response;
  } catch (error) {
    handleError(error);
  }
};






// Axios interceptor for auto token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalReq = error.config;
    const errorMessage = error.response && error.response.data && error.response.data.message;

    if (
      errorMessage === 'Unauthorized' &&
      (error.response.status === 401 || error.response.status === 500) &&
      originalReq &&
      !originalReq._isRetry
    ) {
      originalReq._isRetry = true;

      try {
        await api.get("/refresh", { withCredentials: true });
        return api.request(originalReq);
      } catch (error) {
        handleError(error);
      }
    }
    handleError(error);
  }
);
