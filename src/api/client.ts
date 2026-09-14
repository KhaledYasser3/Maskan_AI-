import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://student-housing-backend-api.azurewebsites.net/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('maskan_auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Envelope Unwrapping & Global Error Handling
apiClient.interceptors.response.use(
  (response) => {
    // If backend uses standard { data, meta } envelope, return response.data
    return response.data;
  },
  (error: AxiosError<{ error?: { code?: string; message?: string; details?: any } }>) => {
    const status = error.response?.status;
    const errorData = error.response?.data?.error;

    if (status === 401) {
      // Clear token and broadcast auth expiry
      localStorage.removeItem('maskan_auth_token');
      localStorage.removeItem('maskan_user_profile');
      window.dispatchEvent(new Event('auth:unauthorized'));
    }

    const customMessage =
      errorData?.message ||
      (status === 403
        ? 'You do not have permission to perform this action.'
        : status === 404
        ? 'Requested resource not found.'
        : error.code === 'ECONNABORTED'
        ? 'Request timed out. Please try again.'
        : 'An unexpected network error occurred.');

    const formattedError = new Error(customMessage);
    (formattedError as any).code = errorData?.code || `HTTP_${status || 'UNKNOWN'}`;
    (formattedError as any).status = status;
    (formattedError as any).details = errorData?.details;

    return Promise.reject(formattedError);
  }
);
