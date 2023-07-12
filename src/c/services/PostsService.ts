import qs from 'qs';

import { strapiApi } from '@/c/api/strapiApi';
import { Post, StrapiEntity, StrapiPagePaginatedResponse } from '@/c/api/types';

export default class PostsService {
    private static _instance: PostsService;

    private constructor() {}

    public static get instance(): PostsService {
        return this._instance || (this._instance = new this());
    }

    async getPosts(): Promise<StrapiEntity<Post>[]> {
        const urlParamsObject = {
            populate: ['categories', 'tags', 'seo'],
        };
        const queryString = qs.stringify(urlParamsObject, {
            arrayFormat: 'comma',
        });

        return (await strapiApi.getJson<StrapiPagePaginatedResponse<Post>>(`/api/posts?${queryString}`)).data;
    }

    async getSlugs(): Promise<{ slug: string }[]> {
        return (await strapiApi.getJson<StrapiPagePaginatedResponse<Post>>(`/api/posts?fields[0]=slug`)).data.map(
            (post) => ({
                slug: post.attributes.slug,
            })
        );
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
