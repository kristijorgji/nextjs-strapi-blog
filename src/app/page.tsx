import Blog from '@/c/components/Blog/Blog';
import PostsService from '@/c/services/PostsService';

import styles from './page.module.scss';

export default async function Page() {
    const r = await PostsService.instance.getPosts(1);

    return (
        <main className={styles.main}>
            <div>Hello to my NextJS + Strapi Blog</div>
            <Blog
                posts={r.data}
                pagination={{
                    currentPage: 1,
                    totalPages: r.meta.pagination.pageCount,
                }}
            />
        </main>
    );
}
