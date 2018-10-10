import { canonicalize } from './canonicalize';

describe(canonicalize, () => {
    it('returns null when the given path is /', () => {
        expect(canonicalize('/')).toBeNull();
    });

    it('returns / when the given path is //', () => {
        expect(canonicalize('//')).toBe('/');
    });

    it('returns null when the given path is already canonical', () => {
        expect(canonicalize('/api/v1/users/42')).toBeNull();
    });

    it('eliminates trailing slashes', () => {
        expect(canonicalize('/api/v1/users/42/')).toBe('/api/v1/users/42');
        expect(canonicalize('/api/v1/users/42//')).toBe('/api/v1/users/42');
        expect(canonicalize('/api/v1/users/42///')).toBe('/api/v1/users/42');
    });

    it('folds multiple slashes into one', () => {
        expect(canonicalize('//api/v1/users/42')).toBe('/api/v1/users/42');
        expect(canonicalize('/api/v1//users//42')).toBe('/api/v1/users/42');
        expect(canonicalize('/api/v1///users///42')).toBe('/api/v1/users/42');
    });
});
