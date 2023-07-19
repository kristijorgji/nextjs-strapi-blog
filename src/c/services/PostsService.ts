import qs from 'qs';

import { strapiApi } from '@/c/api/strapiApi';
import { PagePaginationMeta, Post, StrapiEntity, StrapiPagePaginatedResponse } from '@/c/api/types';

export type GetPostsSlugsPagePaginatedResponse = {
    slugs: { slug: string }[];
    meta: PagePaginationMeta;
};

export default class PostsService {
    private static _instance: PostsService;

    private constructor() {}

    public static get instance(): PostsService {
        return this._instance || (this._instance = new this());
    }

    async getPosts(page: number): Promise<StrapiPagePaginatedResponse<Post>> {
        const urlParamsObject = {
            populate: ['categories', 'tags', 'seo'],
            sort: ['createdAt:desc'],
            pagination: {
                page: page,
            },
        };
        const queryString = qs.stringify(urlParamsObject, {
            arrayFormat: 'comma',
        });

        return await strapiApi.getJson<StrapiPagePaginatedResponse<Post>>(`/api/posts?${queryString}`);
    }

    async getSlugs(page: number): Promise<GetPostsSlugsPagePaginatedResponse> {
        const urlParamsObject = {
            fields: ['slug'],
            sort: ['createdAt:desc'],
            pagination: {
                page: page,
            },
        };
        const queryString = qs.stringify(urlParamsObject, {
            arrayFormat: 'indices',
        });

        const r = await strapiApi.getJson<StrapiPagePaginatedResponse<Post>>(`/api/posts?${queryString}`);

        return {
            slugs: r.data.map((post) => ({
                slug: post.attributes.slug,
            })),
            meta: r.meta,
        };
    }

    async getPostFromSlug(slug: string): Promise<StrapiEntity<Post>> {
        const urlParamsObject = {
            filters: {
                slug: slug,
            },
            populate: ['categories', 'tags', 'seo'],
        };
        const queryString = qs.stringify(urlParamsObject, {
            arrayFormat: 'comma',
        });

        return (await strapiApi.getJson<StrapiPagePaginatedResponse<Post>>(`/api/posts?${queryString}`)).data[0];
    }
}
