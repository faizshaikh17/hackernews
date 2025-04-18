import React, { useState, useEffect } from 'react'
import { fetchTopStories, fetchItemsById, fetchUserById } from '../utils/utils'
import { useLocation, useParams } from 'react-router-dom'
import { Triangle } from 'lucide-react';

export default function UserProfile() {
    const [user, setUser] = useState([])
    // const param = useLocation();
    const param = useParams();
    const username = param.name

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true);
        try {
            const fetchUser = async (username) => {

                const User = await fetchUserById(username)
                if (!User) {
                    throw new Error("no user response");
                }

                setUser(User)
            }
            setLoading(false);

            fetchUser(username)

        } catch (error) {
            console.error('Error fetching top stories:', error);
        }

    }, [username])


    if (loading) return <p>Loading...</p>;

    return (
        <>
            {!loading && <main className='min-h-screen p-4 tracking-tight my-4'>
                <div className=''>
                    {
                        <>
                            <div className='space-y-4'>
                                <p className='text-[#FC7D49] font-semibold sm:text-[1.2rem] text-base'>{username}</p>
                                <div>
                                    <p><span className='text-gray-400 text-base'>Joined: </span>{
                                        `${new Date(user.created * 1000).getDate().toString()}/${new Date(user.created * 1000).getMonth().toString()}/${new Date(user.created * 1000).getFullYear().toString()}`
                                    }</p>
                                    <p><span className='text-gray-400 text-base'>Karma: </span>{user.karma}</p>
                                    <p><span className='text-gray-400 text-base'>About: </span>{user.about || 'There should be description here somewhere...'} </p>
                                </div>
                            </div>
                        </>
                    }

                </div>
            </main >
            }
        </>
    )
}

// const fetchStories = async () => {
//     try {
//         const storyIds = await fetchTopStories()
//         if (!storyIds) {
//             throw new Error("no response");
//         }
//         const stories = storyIds.slice(0, 5).map(async (id) => {
//             const story = await fetchItemsById(id);
//             if (!story) {
//                 throw new Error("no response");
//             }

//             return {
//                 'id': story.id,
//                 'title': story.title,
//                 'url': story.url,
//                 'by': story.by,
//                 'comments': story.comments,
//                 'score': story.score,
//                 'time': `${new Date(story.time * 1000).getDate()}/${new Date(story.time * 1000).getMonth()}/${new Date(story.time * 1000).getFullYear()}`,
//                 'joined': story.joined,
//                 'karma': story.karma,
//                 'about': story.about,
//             }
//         })

//         return Promise.all(stories);

//     } catch (error) {
//         console.error('Error fetching top stories:', error);
//         return [];
//     }
// }


// const [topStories, setTopStories] = useState([]);
// useEffect(() => {
//     fetchStories().then(newStories => setTopStories(prev => {
//         const unique = newStories.filter(newStory => !prev.some(prevStory => newStory.id === prevStory.id))
//         return [...prev, ...unique]
//     }
//     ))
// }, [])