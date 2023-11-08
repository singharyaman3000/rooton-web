import { TabType } from './TextTabs';

export const BLOG_CATEGORY = { ALL: 'all', NEWS: 'news', BLOGS: 'blogs', CASE_STUDIES: 'case_studies' };

export const tabsData: TabType[] = [
  { key: 1, label: 'All', id: BLOG_CATEGORY.ALL },
  { key: 2, label: 'News', id: BLOG_CATEGORY.NEWS },
  { key: 3, label: 'Blogs', id: BLOG_CATEGORY.BLOGS },
  { key: 4, label: 'Case studies', id: BLOG_CATEGORY.CASE_STUDIES },
];

export const SOURCE_PAGE = {
  HOME: 'home',
  SERVICE: 'service',
  BLOGS: 'blog',
  BLOG_DETAILS: 'blog_details',
};

export const BREAD_CRUMBS_LIST = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Blogs',
    path: '',
  },
];
