import React from 'react';

import classNames from 'classnames';

import styles from './pagination.module.scss';

interface Props {
    currentPage: number;
    totalPages: number;
    paginationLink: (p: { page: number; rel?: 'prev' | 'next'; children: React.ReactNode }) => React.ReactElement;
}

const Pagination: React.FC<Props> = (p) => {
    return (
        <div className={styles.pagination}>
            <ul>
                <li
                    className={classNames({
                        [styles['disabled']]: p.currentPage === 1,
                    })}
                >
                    {p.currentPage === 1 && <span>&laquo;</span>}
                    {p.currentPage > 1 && (
                        <p.paginationLink page={p.currentPage - 1} rel={'prev'}>
                            &laquo;
                        </p.paginationLink>
                    )}
                </li>
                {(() => {
                    let slotsForNr = 6;
                    const start = p.currentPage === 1 ? 1 : p.currentPage - 1;
                    const end = Math.min(p.totalPages, p.currentPage + 2);
                    const willShowGoToStart = p.currentPage - 3 > 1;
                    const willShowGoToEnd = p.totalPages - end > 1;
                    const items = [];

                    items.push(pagePaginationTab(1));

                    if (willShowGoToStart) {
                        items.push(
                            <li key={'p...'} className={classNames({ [styles['disabled']]: true })}>
                                <span>{'...'}</span>
                            </li>
                        );
                        slotsForNr--;
                    }

                    if (willShowGoToEnd) {
                        slotsForNr -= 2;
                    }

                    const rend = Math.min(p.totalPages, start + slotsForNr);
                    const rstart = rend - start < slotsForNr ? Math.max(rend - slotsForNr, 2) : start === 1 ? 2 : start;

                    for (let i = rstart; i <= rend; i++) {
                        items.push(pagePaginationTab(i));
                    }

                    if (willShowGoToEnd) {
                        items.push(
                            <li key={'n...'} className={classNames({ [styles['disabled']]: true })}>
                                <span>{'...'}</span>
                            </li>
                        );
                    }
                    if (rend !== p.totalPages) {
                        items.push(pagePaginationTab(p.totalPages));
                    }

                    return items;
                })()}

                <li className={classNames({ [styles['disabled']]: p.currentPage === p.totalPages })}>
                    {p.currentPage === p.totalPages && <span>&raquo;</span>}
                    {p.currentPage < p.totalPages && (
                        <p.paginationLink page={p.currentPage + 1} rel={'next'}>
                            &raquo;
                        </p.paginationLink>
                    )}
                </li>
            </ul>
        </div>
    );

    function pagePaginationTab(page: number): React.ReactElement {
        return (
            <li key={page} className={classNames({ [styles['active']]: page === p.currentPage })}>
                {page === p.currentPage && <span>{page}</span>}
                {page !== p.currentPage && <p.paginationLink page={page}>{page}</p.paginationLink>}
            </li>
        );
    }
};
export default Pagination;
