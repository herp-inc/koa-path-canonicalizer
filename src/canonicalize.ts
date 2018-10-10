const SLASHES = new RegExp('//+', 'g');

/**
 * Canonicalize the given path. Returns null if the given path is already canonical.
 * @param path
 */
export function canonicalize(path: string): string | null {
    if (path === '/') {
        return null;
    }

    let newPath = path;

    if (newPath.includes('//')) {
        newPath = newPath.replace(SLASHES, '/');
    }

    if (newPath !== '/' && newPath.endsWith('/')) {
        newPath = newPath.slice(0, -1);
    }

    return newPath === path ? null : newPath;
}
