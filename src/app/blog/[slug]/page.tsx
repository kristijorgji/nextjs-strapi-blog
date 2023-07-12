import { Metadata } from 'next';

import PostsService from '@/c/services/PostsService';

type RouteParams = { slug: string };

export default async function Page({ params }: { params: RouteParams }) {
    const post = await PostsService.instance.getPostFromSlug(params.slug);

    return (
        <main>
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
    return await PostsService.instance.getSlugs();
}

export async function generateMetadata({ params }: { params: RouteParams }): Promise<Metadata> {
    const post = await PostsService.instance.getPostFromSlug(params.slug);

    return {
        title: post.attributes.title,
    };
}
