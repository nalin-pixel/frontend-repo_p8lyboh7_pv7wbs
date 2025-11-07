import React, { useEffect, useState } from 'react';

// Simple markdown parser for headers/paragraphs/links/code only
function renderMarkdown(md) {
  // escape HTML
  const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  let html = esc(md);
  html = html.replace(/^###\s(.+)$/gm, '<h3 class="text-lg font-semibold mt-6">$1<\/h3>');
  html = html.replace(/^##\s(.+)$/gm, '<h2 class="text-xl font-bold mt-8">$1<\/h2>');
  html = html.replace(/^#\s(.+)$/gm, '<h1 class="text-2xl font-extrabold mt-10">$1<\/h1>');
  html = html.replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800">$1<\/code>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1<\/strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1<\/em>');
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a class="text-blue-600 hover:underline" href="$2" target="_blank" rel="noreferrer">$1<\/a>');
  html = html.replace(/^(?!<h\d|<ul|<ol|<pre|<p|\s*<).+$/gm, '<p class="mt-3 text-neutral-700 dark:text-neutral-300">$&<\/p>');
  return html;
}

const Blog = ({ t }) => {
  const [posts, setPosts] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    fetch('/posts/index.json')
      .then((res) => res.json())
      .then(async (list) => {
        const loaded = await Promise.all(
          list.map(async (item) => {
            const res = await fetch(`/posts/${item.slug}.md`);
            const content = await res.text();
            return { ...item, content };
          })
        );
        setPosts(loaded);
        setActive(loaded[0]?.slug || null);
      })
      .catch(() => setPosts([]));
  }, []);

  const activePost = posts.find((p) => p.slug === active);

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-6">{t('blog.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <aside className="md:col-span-1 space-y-2">
          {posts.map((p) => (
            <button
              key={p.slug}
              onClick={() => setActive(p.slug)}
              className={`w-full text-left px-3 py-2 rounded-md border ${active === p.slug ? 'bg-neutral-900 text-white border-neutral-900' : 'border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
            >
              {p.title}
            </button>
          ))}
        </aside>
        <article className="md:col-span-2 prose prose-neutral dark:prose-invert max-w-none">
          {activePost ? (
            <div dangerouslySetInnerHTML={{ __html: renderMarkdown(activePost.content) }} />
          ) : (
            <p className="text-neutral-600 dark:text-neutral-300">{t('blog.empty')}</p>
          )}
        </article>
      </div>
    </section>
  );
};

export default Blog;
