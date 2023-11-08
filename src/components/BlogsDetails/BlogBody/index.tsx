import { IBlogContentData } from '@/app/services/apiService/blogDetailAPI';
import HtmlParser from 'react-html-parser';
import { contentParser } from './helpers';

const BlogBody = ({ blogContent }: { blogContent: IBlogContentData }) => {

  return <div id='blog-details-body'>{HtmlParser(contentParser(blogContent?.attributes?.body_content ?? ''))}</div>;
};

export default BlogBody;
