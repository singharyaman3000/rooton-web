export interface IImageAttributes {
  name: string | null;
  alternativeText: string | null;
  caption: string | null;
  url: string;
}

export interface Thumbnail {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string;
  size: number;
  width: number;
  height: number;
}

export interface Formats {
  thumbnail: Thumbnail;
}

export interface IMediaAttributes {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string;
  provider: string;
  provider_metadata: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMediaUrlData {
  id: number;
  attributes: IMediaAttributes;
}

export interface MediaUrl {
  data: IMediaUrlData[];
}

export interface IAttributes {
  title: string;
  counter: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description?: string;
  media_url: MediaUrl;
}

export interface IPageMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}