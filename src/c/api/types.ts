type DateIso8601 = string;

export type StrapiEntity<T> = {
    id: number;
    attributes: T;
};

export type StrapiCollection<T> = {
    data: StrapiEntity<T>[];
};

export type PagePaginationMeta = {
    pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
};

export type StrapiPagePaginatedResponse<T> = {
    data: StrapiEntity<T>[];
    meta: PagePaginationMeta;
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
    seo?: StrapiEntity<Seo>;
    createdAt: DateIso8601;
};

export type Seo = {
    metaTitle: string;
    metaDescription: string;
};
