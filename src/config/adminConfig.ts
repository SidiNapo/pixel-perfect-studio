/**
 * Admin Dashboard Configuration
 * 
 * This module provides centralized configuration for admin routes.
 * The admin path is read from the VITE_ADMIN_PATH environment variable.
 * 
 * To set your custom admin path:
 * 1. Add VITE_ADMIN_PATH="/your-secret-path" to your .env file
 * 2. The path should start with "/" and be non-obvious (e.g., "/secure-portal-abc123")
 * 
 * If no environment variable is set, a secure default path is used.
 */

// Default secure path - non-obvious and won't be guessed by scanners
const DEFAULT_ADMIN_PATH = '/secure-portal-x7k9m2';

/**
 * Get the configured admin base path
 * @returns The admin base path (e.g., "/secure-portal-x7k9m2")
 */
export const getAdminBasePath = (): string => {
  const envPath = import.meta.env.VITE_ADMIN_PATH;
  
  if (envPath && typeof envPath === 'string' && envPath.startsWith('/')) {
    return envPath;
  }
  
  return DEFAULT_ADMIN_PATH;
};

/**
 * Get admin route paths
 * @returns Object containing all admin route paths
 */
export const getAdminPaths = () => {
  const basePath = getAdminBasePath();
  
  return {
    base: basePath,
    login: `${basePath}/login`,
    dashboard: `${basePath}/dashboard`,
    posts: `${basePath}/posts`,
    postEdit: (id: string) => `${basePath}/posts/${id}`,
    postNew: `${basePath}/posts/new`,
  };
};

/**
 * Check if a given path is an admin path
 * @param path - The path to check
 * @returns True if the path is an admin path
 */
export const isAdminPath = (path: string): boolean => {
  const basePath = getAdminBasePath();
  return path.startsWith(basePath);
};

// Export admin paths as constants for use in routes
export const ADMIN_PATHS = getAdminPaths();
