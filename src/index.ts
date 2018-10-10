import { Middleware, Context } from 'koa';

import { canonicalize } from './canonicalize';

/**
 * A Koa middleware to redirect to canonicalized path
 */
export function pathCanonicalizer(): Middleware {
    return async function(ctx: Context, next: () => Promise<void>): Promise<void> {
        const newPath = canonicalize(ctx.path);

        if (newPath === null) {
            await next();
        } else {
            ctx.redirect(newPath);
        }
    };
}
