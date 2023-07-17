import { Metadata } from 'next';

import PostsService, { GetPostsSlugsPagePaginatedResponse } from '@/c/services/PostsService';

import styles from './blog-post.module.scss';

type RouteParams = { slug: string };

export default async function Page({ params }: { params: RouteParams }) {
    const post = await PostsService.instance.getPostFromSlug(params.slug);

    return (
        <main className={styles.post}>
            <h1>{post.attributes.title}</h1>
            <p>
                Categories:{' '}
                {post.attributes.categories.data.map((el) => (
                    <span key={el.id}>{el.attributes.title}</span>
                ))}
            </p>
            <p>
                Tags:{' '}
                {post.attributes.tags.data.map((el) => (
                    <span key={el.id}>{el.attributes.name}</span>
                ))}
            </p>
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
        title: post.attributes.title,
    };
}
