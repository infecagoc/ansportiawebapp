import axios from 'axios';
import { supabase } from './supabase';

// Axios instance pointed at the NestJS backend.
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1',
});

// Attach the Supabase access token to every request (once Auth is wired up).
api.interceptors.request.use(async (config) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  return config;
});
