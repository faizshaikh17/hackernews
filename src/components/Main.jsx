import React, { useEffect, useState } from 'react';
import { fetchTopStories, fetchItemsById } from '../utils/utils';
import { Link } from 'react-router-dom';
import { Triangle, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const fetchStories = async () => {
    try {
        const storyIds = await fetchTopStories();
        if (!storyIds) {
            throw new Error('no response');
        }
        const stories = storyIds.slice(0, 100).map(async (id) => {
            const story = await fetchItemsById(id);
            if (!story) {
                throw new Error('no response');
            }
            return {
                id: story.id,
                title: story.title,
                url: story.url,
                by: story.by,
                kids: story.kids || [],
                score: story.score,
                time: `${new Date(story.time * 1000).getDate()}/${new Date(story.time * 1000).getMonth() + 1
                    }/${new Date(story.time * 1000).getFullYear()}`,
            };
        });

        return Promise.all(stories);
    } catch (error) {
        console.error('Error fetching top stories:', error);
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
            if (!newStories.length) {
                setError('Failed to load stories. Please refresh.');
            }
        });
    }, []);

    const prevPage = () => {
        if (page >= 2) {
            setPage((prev) => prev - 1);
        }
    };

    const prevPointer = () => {
        setPage(1);
    };

    const nextPointer = () => {
        setPage(totalPages);
    };

    const nextPage = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    const pageWiseStories = topStories.slice((page - 1) * limit, page * limit);

    if (loading) {
        return (
            <p className="h-60 font-semibold lg:text-[1.3rem] text-lg flex items-center justify-center">
                Loading...
            </p>
        );
    }

    if (error && !topStories.length) {
        return (
            <p className="h-60 font-semibold lg:text-[1.3rem] text-lg flex items-center justify-center text-red-500">
                {error}
            </p>
        );
    }

    return (
        <main className="min-h-screen space-y-5 tracking-tight my-4">
            <div className="space-y-5">
                {pageWiseStories.map((item) => (
                    <div key={item.id} className="space-y-4">
                        <div className="space-y-2.5 p-3.5 hover:bg-[#171717]">
                            <p className="hover:text-[#FC7D49] font-semibold hover:underline lg:text-[1.25rem] text-lg">
                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                    {item.title}
                                </a>
                            </p>
                            <p className="text-sm lg:text-base text-gray-400">
                                by{' '}
                                <Link to={`/users/${item.by}`}>
                                    <span className="text-[#FC7D49] hover:text-[#FF6600] underline underline-offset-2">
                                        {item.by}
                                    </span>
                                </Link>
                            </p>
                            <span className="text-sm lg:text-base flex items-center gap-1 text-gray-400">
                                <Link to={`/story/${item.id}`}>
                                    <span className="text-[#FC7D49] hover:text-[#FF6600] hover:underline underline-offset-2">
                                        {item.kids.length} comments
                                    </span>
                                </Link>
                                | <Triangle size={12} /> {item.score} Score | {item.time}
                            </span>
                        </div>
                        <div className="bg-[#171717] mt-5 h-0.5"></div>
                    </div>
                ))}
            </div>
            {topStories.length > 0 && (
                <div className="flex justify-center items-center gap-4">
                    <button
                        onClick={prevPointer}
                        disabled={page === 1}
                        className="flex items-center justify-center rounded-lg h-12 w-12 hover:bg-[#171717] disabled:opacity-50"
                        aria-label="Go to first page"
                    >
                        <ChevronsLeft size={20} />
                    </button>
                    <button
                        onClick={prevPage}
                        disabled={page === 1}
                        className="flex items-center justify-center rounded-lg h-12 w-12 hover:bg-[#171717] disabled:opacity-50"
                        aria-label="Previous page"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <span className="text-lg">
                        {page} / {totalPages}
                    </span>
                    <button
                        onClick={nextPage}
                        disabled={page === totalPages}
                        className="flex items-center justify-center rounded-lg h-12 w-12 hover:bg-[#171717] disabled:opacity-50"
                        aria-label="Next page"
                    >
                        <ChevronRight size={20} />
                    </button>
                    <button
                        onClick={nextPointer}
                        disabled={page === totalPages}
                        className="flex items-center justify-center rounded-lg h-12 w-12 hover:bg-[#171717] disabled:opacity-50"
                        aria-label="Go to last page"
                    >
                        <ChevronsRight size={20} />
                    </button>
                </div>
            )}
        </main>
    );
}