import React, { useEffect, useState } from 'react';
import { fetchTopStories, fetchItemsById } from '../utils/utils';
import { Link } from 'react-router-dom';
import { Triangle, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import pLimit from 'p-limit';

const fetchStories = async (concurrency = 50) => {
  const limit = pLimit(concurrency);
  try {
    const storyIds = await fetchTopStories();
    if (!storyIds) throw new Error('no response');
    const storyPromise = storyIds.slice(0, 50).map((id) =>
      limit(async () => {
        const story = await fetchItemsById(id);
        if (!story) throw new Error('no response');
        return {
          id: story.id,
          title: story.title,
          url: story.url,
          by: story.by,
          kids: story.kids || [],
          score: story.score,
          time: `${new Date(story.time * 1000).getDate().toString().padStart(2, '0')}/${new Date(story.time * 1000).getMonth() + 1}/${new Date(story.time * 1000).getFullYear()}`
        };
      })
    );
    const stories = await Promise.all(storyPromise);
    return stories;
  } catch {
    return [];
  }
};

export default function Main() {
  const [topStories, setTopStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;
  const totalPages = topStories.length ? Math.ceil(topStories.length / limit) : 1;

  useEffect(() => {
    setLoading(true);
    fetchStories().then((newStories) => {
      setTopStories(newStories);
      setLoading(false);
      if (!newStories.length) setError('Failed to load stories. Please refresh.');
    });
  }, []);

  const prevPage = () => page >= 2 && setPage((prev) => prev - 1);
  const nextPage = () => page < totalPages && setPage((prev) => prev + 1);
  const prevPointer = () => setPage(1);
  const nextPointer = () => setPage(totalPages);

  const pageWiseStories = topStories.slice((page - 1) * limit, page * limit);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f0f0f0] dark:bg-[#121212] px-2">
        <div className="max-w-4xl mx-auto space-y-4 py-8">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="animate-pulse mx-2 rounded-md p-4 space-y-3 bg-gray-950/40 dark:bg-white/10">
              <div className="h-4 w-1/2 bg-neutral-700/40 rounded" />
              <div className="h-3 w-1/3 bg-neutral-700/40 rounded" />
              <div className="h-3 w-3/4 bg-neutral-700/40 rounded" />
            </div>
          ))}
        </div>
      </main>
    );
  }

  if (error && !topStories.length) {
    return (
      <div className="min-h-60 flex items-center justify-center px-2">
        <p className="font-semibold lg:text-[1.3rem] text-lg text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen dark:bg-[#121212] bg-[#f0f0f0] space-y-6 tracking-tight px-2">
      <div className="space-y-4 mx-auto max-w-4xl">
        {pageWiseStories.map((item) => (
          <div key={item.id}>
            <article className="p-4 transition-all duration-200 rounded-md dark:hover:bg-[#171717] hover:bg-gray-200 hover:shadow-sm">
              <div className="space-y-2">
                <h2 className="lg:text-[1.15rem] text-base leading-tight">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-[#FA7921] focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-opacity-50"
                  >
                    {item.title}
                  </a>
                </h2>
                <p className="text-sm dark:text-gray-400 text-black/80">
                  by{' '}
                  <Link
                    to={`/users/${item.by}`}
                    className="text-[#FA7921] underline underline-offset-4 hover:text-[#FE9920] transition-colors"
                  >
                    {item.by}
                  </Link>
                </p>
                <div className="text-sm flex items-center gap-2 flex-wrap">
                  <Link
                    to={`/story/${item.id}`}
                    className="text-[#FA7921] hover:underline underline-offset-4 hover:text-[#FE9920] transition-colors"
                  >
                    {item.kids.length} comments
                  </Link>
                  <span className="text-gray-400">|</span>
                  <span className="flex items-center gap-1">
                    <Triangle size={12} className="fill-current" /> {item.score} Score
                  </span>
                  <span className="text-gray-400">|</span>
                  <span>{item.time}</span>
                </div>
              </div>
            </article>
            <div className="bg-[#121212]/10 dark:bg-[#f0f0f0]/5 h-[1px] mt-4" />
          </div>
        ))}
      </div>
      {topStories.length > 0 && (
        <nav className="flex justify-center items-center gap-3 py-4 max-w-4xl mx-auto flex-wrap">
          <button
            onClick={prevPointer}
            disabled={page === 1}
            className="flex items-center justify-center rounded-lg h-10 w-10 dark:hover:bg-[#171717] hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronsLeft size={18} />
          </button>
          <button
            onClick={prevPage}
            disabled={page === 1}
            className="flex items-center justify-center rounded-lg h-10 w-10 dark:hover:bg-[#171717] hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-base font-medium">
            {page} / {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={page === totalPages}
            className="flex items-center justify-center rounded-lg h-10 w-10 dark:hover:bg-[#171717] hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={18} />
          </button>
          <button
            onClick={nextPointer}
            disabled={page === totalPages}
            className="flex items-center justify-center rounded-lg h-10 w-10 dark:hover:bg-[#171717] hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronsRight size={18} />
          </button>
        </nav>
      )}
    </main>
  );
}
