export type StrapiEntity<T> = {
    id: number;
    attributes: T;
};

export type StrapiCollection<T> = {
    data: StrapiEntity<T>[];
};

export type StrapiPagePaginatedResponse<T> = {
    data: StrapiEntity<T>[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
};

export type Category = {
    title: string;
    slug: string;
};

export type Tag = {
    name: string;
    slug: string;
};

export type Post = {
    title: string;
    content: string;
    categories: StrapiCollection<Category>;
    tags: StrapiCollection<Tag>;
    slug: string;
    seo: StrapiEntity<Tag>;
};

export type Seo = {
    metaTitle: string;
    metaDescription: string;
};
