'use client';

import React from 'react';

import classNames from 'classnames';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism';
import { coldarkCold, dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';

import { Category, Post, StrapiEntity, Tag } from '@/c/api/types';
import useThemeName from '@/c/styles/useThemeName';

import styles from './post.module.scss';

interface Props {
    post: StrapiEntity<Post>;
}

const Post: React.FC<Props> = ({ post }) => {
    const theme = useThemeName();

    return (
        <div className={styles.post}>
            {renderBreadcrumb()}
            <h1 className={styles['post-title']}>{post.attributes.title}</h1>
            <div className={styles['content']}>
                <div className={styles['content-inner']}>
                    <div className={styles['content-inside']}>
                        <footer className={classNames(styles['post-meta'], styles['content-box'])}>
                            <p className="post-date-wrapper">
                                {/*<span className="far fa-clock" aria-hidden="true"></span>*/}
                                <span className="screen-reader-text">Published date</span>
                                <time className="post-date">{new Date(post.attributes.createdAt).toDateString()}</time>
                            </p>
                        </footer>
                        <div className={classNames(styles['entry'], styles['content-box'])}>
                            <div>
                                <ReactMarkdown
                                    rehypePlugins={[rehypeRaw]}
                                    components={{
                                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                        code({ node, inline, className, children, ...props }) {
                                            const match = /language-(\w+)/.exec(className || '');
                                            return !inline && match ? (
                                                <SyntaxHighlighter
                                                    /* ts-ignore */
                                                    {...props}
                                                    /* eslint-disable-next-line react/no-children-prop */
                                                    children={String(children).replace(/\n$/, '')}
                                                    language={match[1]}
                                                    showLineNumbers={true}
                                                    customStyle={{
                                                        paddingLeft: '0',
                                                    }}
                                                    style={theme === 'light' ? coldarkCold : dracula}
                                                    PreTag="div"
                                                />
                                            ) : (
                                                <code {...props} className={className}>
                                                    {children}
                                                </code>
                                            );
                                        },
                                    }}
                                >
                                    {post.attributes.content}
                                </ReactMarkdown>
                                <div className={styles['btm-post-meta']}>
                                    {post.attributes.categories.data.length > 0 && (
                                        <p className={styles['post-btm-cats']}>
                                            <span className={styles['meta-label']}>Categories: </span>
                                            {post.attributes.categories.data.map((el) => (
                                                <a key={el.id} href={categoryUrl(el)} rel="category tag">
                                                    {el.attributes.title}
                                                </a>
                                            ))}
                                        </p>
                                    )}
                                    {post.attributes.tags.data.length > 0 && (
                                        <p className={styles['post-btm-tags']}>
                                            <span className={styles['meta-label']}>Tags: </span>
                                            {post.attributes.tags.data.map((el) => (
                                                <a key={el.id} href={tagUrl(el)} rel="tag">
                                                    {el.attributes.name}
                                                </a>
                                            ))}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    function renderBreadcrumb(): React.ReactNode {
        const els = [];

        for (let i = 0; i < post.attributes.categories.data.length; i++) {
            const category = post.attributes.categories.data[i];

            els.push(
                <span key={category.id}>
                    <Link href={categoryUrl(category)} rel={'category tag'}>
                        {category.attributes.title}
                    </Link>
                    {i < post.attributes.categories.data.length - 1 && ' / '}
                </span>
            );
        }

        return (
            <div className={styles['breadcrumb']}>
                <a href="/">Home</a>&nbsp;&nbsp;&gt;&nbsp;&nbsp;
                {els}
            </div>
        );
    }
};
export default Post;

function categoryUrl(category: StrapiEntity<Category>): string {
    return `/blog/category/${category.attributes.slug}`;
}

function tagUrl(tag: StrapiEntity<Tag>): string {
    return `/blog/tag/${tag.attributes.slug}`;
}
