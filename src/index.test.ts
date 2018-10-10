import * as Koa from 'koa';
import { Server } from 'http';
import * as request from 'supertest';

import { pathCanonicalizer } from './';

describe(pathCanonicalizer, () => {
    let app: Koa;
    let server: Server;

    beforeAll(() => {
        app = new Koa();
        app.use(pathCanonicalizer());
        app.use(async (ctx, next) => {
            if (ctx.path === '/' || ctx.path === '/api/v1/users/42') {
                ctx.status = 200;
                ctx.body = 'Hello, world!';
                await next();
            }
        });

        server = app.listen();
    });

    afterAll(() => server.close());

    const get = (path: string) => request(server).get(path);

    describe('when the path is canonical', () => {
        describe('/', () => {
            it('returns 200', async () => {
                const res = await get('/');
                expect(res.status).toBe(200);
            });
        });

        describe('/api/v1/users/42', () => {
            it('returns 200', async () => {
                const res = await get('/api/v1/users/42');
                expect(res.status).toBe(200);
            });
        });
    });

    describe('when the path is non-canonical', () => {
        describe('//', () => {
            it('redirects to /', async () => {
                const res = await get('//');
                expect(res.status).toBe(302);
                expect(res.header['location']).toBe('/');
            });
        });

        describe('//api////v1/users////42', () => {
            it('redirects to /api/v1/users/42', async () => {
                const res = await get('//api////v1/users////42');
                expect(res.status).toBe(302);
                expect(res.header['location']).toBe('/api/v1/users/42');
            });
        });
    });
});
