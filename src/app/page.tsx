import Link from 'next/link';

import PostsService from '@/c/services/PostsService';

import styles from './page.module.css';

export default async function Page() {
    const posts = await PostsService.instance.getPosts();

    return (
        <main className={styles.main}>
            <div>Hello to my NextJS + Strapi Blog</div>
            <div className={styles.grid}>
                {posts.map((post) => (
                    <Link key={post.id} href={`blog/${post.attributes.slug}`}>
                        <div className={styles.card}>
                            <h1>Post {post.id}</h1>
                            <p>{post.attributes.title}</p>
                            <p>{post.attributes.content}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
