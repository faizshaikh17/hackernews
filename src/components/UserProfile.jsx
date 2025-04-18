import React, { useState, useEffect } from 'react'
import { fetchTopStories, fetchItemsById, fetchUserById } from '../utils/utils'
import { useParams } from 'react-router-dom'


export default function UserProfile() {
    const [user, setUser] = useState([])
    const { username } = useParams();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true);
        const fetchUser = async (username) => {
            const user = await fetchUserById(username)
            setUser(user)
        }
        setLoading(false);


        fetchUser(username)
    }, [username])

    console.log(user);

    // console.log(userArray);
    if (loading) return <p>Loading...</p>;

    return (
        <>
            <main className='min-h-screen tracking-tight my-4'>
                <div className=''>
                    {/* {
                        UserArray.map((item, index) => (
                            <>
                                <div key={index}>
                                    <p className=' hover:text-[#FC7D49] font-semibold hover:underline sm:text-[1rem] text-base'>{username}</p>
                                    <br />
                                    <p>{item.joined}</p>
                                    <p>{item.karma}</p>
                                    <p>{item.about}</p>
                                </div>
                            </>
                        ))
                    } */}

                    {

                        <>
                            <div>
                                <p className=' hover:text-[#FC7D49] font-semibold hover:underline sm:text-[1rem] text-base'>{username}</p>
                                <br />
                                <p>Joined:{user.joined}</p>
                                <p>Karma:{user.karma}</p>
                                <p>About:{user.about}</p>
                            </div>
                        </>

                    }

                </div>
            </main>
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