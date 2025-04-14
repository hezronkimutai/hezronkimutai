import React from 'react';

export const MockLoadingSpinner = ({ text }: { text: string }) => (
  <div data-testid="loading-spinner">{text}</div>
);

export const MockBlogList = ({ data, className }: { data: any; className?: string }) => (
  <div data-testid="blog-list" className={className}>
    Posts: {data.posts.length}
    Page: {data.page}
  </div>
);

export const MockBlogPost = ({ title, className }: { title: string; className?: string }) => (
  <article data-testid="blog-post" className={className}>
    {title}
  </article>
);