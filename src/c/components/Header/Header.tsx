'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import ThemeToggle from '@/c/components/Header/ThemeToggle';

import styles from './header.module.scss';

interface Props {}

type MenuItem = NamedLinkMenuItem;

type NamedLinkMenuItem = {
    url: string;
    text: string;
};

const menuItems: NamedLinkMenuItem[] = [
    {
        url: '/',
        text: 'Home',
    },
    {
        url: '/about',
        text: 'About',
    },
];

const Header: React.FC<Props> = () => {
    const pathname = usePathname();

    return (
        <ul className={styles.navbar}>
            {menuItems.map((mi, i) => (
                <li key={i} className={menuItemActiveClassname(mi, pathname)}>
                    <a href={mi.url as string}>{mi.text}</a>
                </li>
            ))}
            <li>
                <ThemeToggle />
            </li>
        </ul>
    );
};
export default Header;

function isCurrentPage(current: string, pathname: string): boolean {
    return current === pathname;
}

function menuItemActiveClassname(mi: MenuItem, pathname: string): string | undefined {
    return isCurrentPage((mi as NamedLinkMenuItem).url, pathname) ? styles['active'] : undefined;
}
