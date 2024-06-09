export interface IBlog {
    sys: Welcome5Sys;
    total: number;
    skip: number;
    limit: number;
    items: Item[];
    includes: Includes;
}

export interface Includes {
    Asset: Asset[];
}

export interface Asset {
    metadata: Metadata;
    sys: AssetSys;
    fields: AssetFields;
}

export interface AssetFields {
    title: string;
    description: string;
    file: File;
}

export interface File {
    url: string;
    details: Details;
    fileName: string;
    contentType: string;
}

export interface Details {
    size: number;
    image: Image;
}

export interface Image {
    width: number;
    height: number;
}

export interface Metadata {
    tags: any[];
}

export interface AssetSys {
    space: BlogImage;
    id: string;
    type: FluffyType;
    createdAt: Date;
    updatedAt: Date;
    environment: BlogImage;
    revision: number;
    locale: Locale;
    contentType?: BlogImage;
}

export interface BlogImage {
    sys: BlogImageSys;
}

export interface BlogImageSys {
    id: string;
    type: PurpleType;
    linkType: LinkType;
}

export enum LinkType {
    Asset = "Asset",
    ContentType = "ContentType",
    Environment = "Environment",
    Space = "Space",
}

export enum PurpleType {
    Link = "Link",
}

export enum Locale {
    EnUS = "en-US",
}

export enum FluffyType {
    Asset = "Asset",
    Entry = "Entry",
}

export interface Item {
    metadata: Metadata;
    sys: AssetSys;
    fields: ItemFields;
}

export interface ItemFields {
    blogTitle: string;
    blogImage: BlogImage;
    blogSummary: string;
    createdDate: string;
    blogAuthor: string;
    blogContent: string;
    publish: boolean;
}

export interface Welcome5Sys {
    type: string;
}
