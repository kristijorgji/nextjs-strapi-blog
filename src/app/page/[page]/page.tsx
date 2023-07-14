import { Metadata, ResolvingMetadata } from 'next';

import styles from '@/app/page.module.scss';
import Blog from '@/c/components/Blog/Blog';
import PostsService from '@/c/services/PostsService';

type RouteParams = { page: string };

export default async function Page({ params }: { params: RouteParams }) {
    const r = await PostsService.instance.getPosts(parseInt(params.page));

    return (
        <main className={styles.main}>
            <Blog
                posts={r.data}
                pagination={{
                    currentPage: r.meta.pagination.page,
                    totalPages: r.meta.pagination.pageCount,
                }}
            />
        </main>
    );
}

export async function generateStaticParams() {
    const r = await PostsService.instance.getPosts(1);

    return Array(r.meta.pagination.pageCount)
        .fill(0)
        .map((_, i) => ({ page: (i + 1).toString() }));
}

export async function generateMetadata(
    { params }: { params: RouteParams },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const parentMetaData = await parent;

    return {
        title: `${parentMetaData.title?.absolute} Page ${params.page}`,
    };
}
