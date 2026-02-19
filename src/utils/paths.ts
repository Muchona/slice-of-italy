/**
 * Resolves the correct path for assets, handling GitHub Pages base URL.
 * @param path - The absolute path to the asset (e.g., "/assets/image.jpg")
 * @returns The resolved path including the base URL (e.g., "/slice-of-italy/assets/image.jpg")
 */
export const getAssetPath = (path: string) => {
    // Remove leading slash if present to avoid double slashes with BASE_URL
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${import.meta.env.BASE_URL}${cleanPath}`;
};
