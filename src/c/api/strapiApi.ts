import cheaders from '@/c/http/cheaders';
import { fetchFn } from '@/c/http/http';
import HttpClient from '@/c/http/HttpClient';
import beforeSendContentJson from '@/c/http/middlewares/beforeSendContentJson';

export const strapiApi = new HttpClient(
    fetchFn(fetch, process.env.STRAPI_API_URL as string, {
        before: [beforeSendContentJson, beforeSendApiKeyAndRequestId],
    })
);

function beforeSendApiKeyAndRequestId(ri: RequestInit): RequestInit {
    // TODO get current next/express request here
    const requestId = `non-req-${Date.now()}`;
    return {
        ...ri,
        headers: {
            ...ri.headers,
            ...{
                Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
                [cheaders.X_CLIENT_VERSION]: process.env.APP_VERSION as string,
                [cheaders.X_REQUEST_ID]: requestId,
            },
        },
    } as never;
}
