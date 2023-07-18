import React from 'react';

import Link from 'next/link';

import styles from '@/app/page.module.scss';
import { Post, StrapiEntity } from '@/c/api/types';
import Pagination from '@/c/components/Common/Pagination';
import { trimEllip } from '@/c/utils/text';

interface Props {
    posts: StrapiEntity<Post>[];
    pagination: null | {
        currentPage: number;
        totalPages: number;
    };
}

const Blog: React.FC<Props> = (p) => {
    return (
        <>
            <div className={styles.grid}>
                {p.posts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.attributes.slug}`}>
                        <div className={styles.card}>
                            <h1>Post {post.id}</h1>
                            <p>{post.attributes.title}</p>
                            <p>{trimEllip(post.attributes.content, 200)}</p>
                        </div>
                    </Link>
                ))}
            </div>
            {p.pagination && (
                <Pagination
                    currentPage={p.pagination.currentPage}
                    totalPages={p.pagination.totalPages}
                    paginationLink={(pp) => (
                        <Link href={`/page/${pp.page}`} rel={pp.rel}>
                            {pp.children}
                        </Link>
                    )}
                />
            )}
        </>
    );
};
export default Blog;
