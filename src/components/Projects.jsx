import React, { useEffect, useState } from 'react';

const Projects = ({ t }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('/projects.json')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch(() => setProjects([]));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-6">{t('projects.title')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <article key={p.id} className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 bg-white dark:bg-neutral-900">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">{p.title}</h3>
            <p className="mt-2 text-neutral-700 dark:text-neutral-300">{p.description}</p>
            {p.tags?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 text-xs rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
            <div className="mt-4 flex gap-3">
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noreferrer" className="text-sm font-medium text-blue-600 hover:underline">
                  {t('projects.viewDemo')}
                </a>
              )}
              {p.source && (
                <a href={p.source} target="_blank" rel="noreferrer" className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:underline">
                  {t('projects.viewCode')}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
