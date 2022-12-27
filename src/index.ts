import { Middleware, Context } from 'koa';

import { canonicalize } from './canonicalize';

type Params = Readonly<{
    basePath?: string | undefined;
}>;

/**
 * A Koa middleware to redirect to canonicalized path
 */
export function pathCanonicalizer(params: Params = {}): Middleware {
    return async function (ctx: Context, next: () => Promise<void>): Promise<void> {
        const newPath = canonicalize(ctx.path);

        if (newPath === null) {
            await next();
        } else {
            if (params.basePath === undefined) {
                ctx.redirect(newPath);
            } else {
                if (newPath === '/') {
                    ctx.redirect(params.basePath);
                    return;
                }

                const basePath = params.basePath.endsWith('/') ? params.basePath.slice(0, -1) : params.basePath;

                ctx.redirect(basePath + newPath);
            }
        }
    };
}
