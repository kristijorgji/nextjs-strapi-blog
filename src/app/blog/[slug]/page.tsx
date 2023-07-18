import { Metadata } from 'next';

import Post from '@/c/components/Blog/Post/Post';
import PostsService, { GetPostsSlugsPagePaginatedResponse } from '@/c/services/PostsService';

import styles from './blog-post.module.scss';

type RouteParams = { slug: string };

export default async function Page({ params }: { params: RouteParams }) {
    const post = await PostsService.instance.getPostFromSlug(params.slug);

    return (
        <main className={styles.post}>
            <Post post={post} />
        </main>
    );
}

export async function generateStaticParams() {
    let currentPage = 1;
    let r: GetPostsSlugsPagePaginatedResponse | undefined;

    const pageParams: { slug: string }[] = [];

    do {
        r = await PostsService.instance.getSlugs(currentPage);
        pageParams.push(...r.slugs);
    } while (currentPage++ <= r!.meta.pagination.pageCount);

    return pageParams;
}

export async function generateMetadata({ params }: { params: RouteParams }): Promise<Metadata> {
    const post = await PostsService.instance.getPostFromSlug(params.slug);

    return {
        title: post.attributes.seo?.attributes.metaTitle ?? post.attributes.title,
        description: post.attributes.seo?.attributes.metaDescription,
    };
}
