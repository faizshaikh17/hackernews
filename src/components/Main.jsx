import React, { useEffect, useState } from 'react'
import { fetchTopStories, fetchItemsById } from '../utils/utils'
import { Link } from 'react-router-dom'
import { Triangle, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const fetchStories = async () => {
    try {
        const storyIds = await fetchTopStories()
        if (!storyIds) {
            throw new Error("no response");
        }
        const stories = storyIds.slice(0, 20).map(async (id) => {
            const story = await fetchItemsById(id);
            if (!story) {
                throw new Error("no response");
            }

            return {
                'id': story.id,
                'title': story.title,
                'url': story.url,
                'by': story.by,
                'comments': story.comments,
                'score': story.score,
                'time': `${new Date(story.time * 1000).getDate()}/${new Date(story.time * 1000).getMonth()}/${new Date(story.time * 1000).getFullYear()}`,
                'joined': story.joined,
                'karma': story.karma,
                'about': story.about,
            }
        })

        return Promise.all(stories);

    } catch (error) {
        console.error('Error fetching top stories:', error);
        return [];
    }
}



export default function Main() {
    const [topStories, setTopStories] = useState([]);
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [totalPages, setTotalPages] = useState(10)
    useEffect(() => {
        setLoading(true)

        fetchStories().then(newStories => setTopStories(prev => {
            const unique = newStories.filter(newStory => !prev.some(prevStory => newStory.id === prevStory.id))
            setLoading(false)
            setTotalPages(topStories.length / limit)

            return [...prev, ...unique]
        }

        ))
    }, [])


    if (loading) return <p className='h-60 font-semibold sm:text-[1.05rem] text-base  flex items-center justify-center'>Loading...</p>
    return (
        <main className='min-h-screen tracking-tight my-4'>
            <div className='space-y-5 '>
                {
                    topStories.map(item => (
                        <>
                            <div className='spacye-y-4'>
                                <div className=' space-y-1.5 p-3.5 hover:bg-[#171717]'>
                                    <p className=' hover:text-[#FC7D49] font-semibold hover:underline sm:text-[1.05rem] text-base'><a href={item.url}>{item.title}</a></p>
                                    <p className='text-xs sm:text-sm text-gray-400'>by{' '}
                                        <Link to={`/users/${item.by}`}>
                                            <span className='text-[#FC7D49] underline'>{item.by}</span>
                                        </Link>
                                    </p>
                                    <span className='text-xs sm:text-sm flex items-center gap-1 text-gray-400'><Triangle size={12} /> {item.score} Score  | {item.time} </span>
                                </div>
                                <div className='bg-[#171717] mt-5 h-0.5'></div>
                            </div>

                        </>
                    ))
                }
            </div>
            <div>
                {
                    <>
                        <div className='flex justify-center items-center gap-8'>
                            <ChevronsLeft size={20} />
                            <ChevronLeft size={20} />
                            {page}|{totalPages}
                            <ChevronRight size={20} />
                            <ChevronsRight size={20} />
                        </div>
                    </>
                }
            </div>
        </main>
    )
}




// {
//     by: "mfiguiere",
//     descendants: 17,
//     id: 43716856,
//     kids: (9)[…],
//     score: 32,
//     time: 1744897909,
//     title: "OpenAI looked at buying Cursor creator before turning to Windsurf",
//     type: "story",
//     url: "https://www.cnbc.com/2025/04/17/openai-looked-at-cursor-before-considering-deal-with-rival-windsurf.html"
// }