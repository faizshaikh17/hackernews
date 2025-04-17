import React, { useEffect, useState } from 'react'
import { fetchTopStories, fetchItemsById } from '../utils/utils'


const fetchStories = async () => {
    try {
        const storyIds = await fetchTopStories()
        if (!storyIds) {
            throw new Error("no response");
        }
        const stories = storyIds.slice(0, 5).map(async (id) => {
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
                'time': story.time,
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
    useEffect(() => {
        fetchStories().then(newStories => setTopStories(prev => {
            const unique = newStories.filter(newStory => !prev.some(prevStory => newStory.id === prevStory.id))
            return [...prev, ...unique]
        }
        ))
    }, [])
    console.log(topStories)
    return (
        <main className='min-h-screen my-4'>
            <div className='space-y-5 '>
                {
                    topStories.map(item => (
                        <>
                            <div className='spacye-y-4'>
                                <div className='space-y-3 p-4 hover:bg-[#171717]'>
                                    <a href={item.url} className=' hover:text-[#FC7D49] font-semibold hover:underline sm:text-lg text-base'>{item.title}</a>
                                    <p className='text-xs sm:text-sm'>by <span className='text-[#FC7D49] underline'>{item.by}</span></p>
                                    <span>{item.score}|{item.time}</span>
                                    <br />
                                </div>
                                <div className='bg-[#171717] mt-5 h-0.5'></div>
                            </div>

                        </>
                    ))
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