import React, { useEffect, useState } from 'react'
import { fetchTopStories, fetchItemsById } from '../utils/utils'


const fetchStories = async () => {
    try {
        const storyIds = await fetchTopStories()
        if (!storyIds) {
            throw new Error("no response");
        }
        const stories = storyIds.slice(0, 10).map(async (id) => {
            const story = await fetchItemsById(id);
            if (!story) {
                throw new Error("no response");
            }
            return {
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
        fetchStories().then(newStories => setTopStories(prev => [...prev, ...newStories]))
    }, [])

    return (
        <main className='min-h-screen'>
            <div>
                {
                    topStories.map(item => (
                        <>
                            <p></p>
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