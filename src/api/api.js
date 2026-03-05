/**
 * Central API base URL.
 * - Dev  : http://localhost:5000  (from .env.local)
 * - Prod : https://meal-cage-server.vercel.app  (from .env.production)
 *
 * Usage:
 *   import { API_BASE } from '../../api/api';
 *   fetch(`${API_BASE}/menu`)
 *   axios.get(`${API_BASE}/menu`)
 */
export const API_BASE = import.meta.env.VITE_API_BASE_URL;
