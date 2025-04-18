import React, { useState, useEffect, useRef } from 'react'
import { fetchItemsById } from '../utils/utils';
import { useParams, Link } from 'react-router-dom';
import { Triangle } from 'lucide-react';


export default function story() {
    const [user, setUser] = useState([]);
    const [comments, setComments] = useState([]);
    const { id } = useParams();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        try {
            const fetchUser = async (id) => {
                const User = await fetchItemsById(id);
                if (!User) {
                    throw new Error("no user response");
                }
                setUser(User);
            };
            setLoading(false);
            fetchUser(id);

        } catch (error) {
            console.error('Error fetching top stories:', error);
        }
    }, [id]);

    const fetchComments = async () => {
        try {
            const userDetails = user.kids.map(async (id) => {
                const comments = await fetchItemsById(id);
                if (!comments) {
                    throw new Error('no user found');
                }
                return {
                    by: comments.by,
                    time: `${new Date(comments.time * 1000).getDate()}/${new Date(comments.time * 1000).getMonth() + 1
                        }/${new Date(comments.time * 1000).getFullYear()}`,
                    text: comments.text,
                }
            })
            return Promise.all(userDetails)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setLoading(true)
        fetchComments().then((comment) => {
            if (comment) setComments(comment)
            else return null
        })
        setLoading(false)
    }, [user])


    if (loading) return <p>Loading...</p>;

    return (
        <>
            <main className='min-h-screen p-4.5 my-2'>
                <div>
                    <div className="space-y-4 p-3.5">
                        <p className="sm:text-3xl text-lg">
                            <a href={user.url} target="_blank" rel="noopener noreferrer">
                                {user.title}
                            </a>
                        </p>

                        <span className="text-xs sm:text-sm flex items-center gap-1 text-gray-400">
                            <p className="text-xs sm:text-sm text-gray-400">
                                by{' '}
                                <Link to={`/users/${user.by}`}>
                                    <span className="text-[#FC7D49] hover:text-[#FF6600] underline underline-offset-2">
                                        {user.by}
                                    </span>
                                </Link>
                            </p>
                            <Link to={`/story/${user.id}`}>
                                <span className="text-[#FC7D49] hover:text-[#FF6600] hover:underline underline-offset-2">
                                    {/* {user.kids.length} comments */}
                                </span>
                            </Link>
                            | <Triangle size={12} /> {user.score} Score | {`${new Date(user.time * 1000).getDate().toString()}/${new Date(user.time * 1000).getMonth().toString()}/${new Date(user.time * 1000).getFullYear().toString()}`}
                        </span>

                        <p className='text-[#FC7D49] sm:text-sm text-sm  underline'><a href={user.url}>{user.url}</a></p>
                    </div>
                </div>
                <div className="space-y-2.5 p-4">
                    <p className='sm:text-lg text-lg'>Comments</p>
                    <div>
                        {comments.map((comment) => (
                            <>
                                <div className="space-y-4">
                                    <div className='p-4 mt-4 space-y-3 rounded-lg hover:bg-[#171717]'>
                                        <div>
                                            <Link to={`/user/${comment.by}`}> <span className="text-[#FC7D49] font-medium hover:underline decoration-1 underline-offset-2 sm:text-sm text-sm hover:text-[#FF6600]">{comment.by} </span></Link>|<span className='sm:text-sm text-sm'> {comment.time}</span>
                                        </div>
                                        <div className='comment text-gray-200 sm:text-base text-sm' dangerouslySetInnerHTML={{ __html: comment.text }} />
                                        {console.log(comment.text)}
                                    </div>
                                    <div className="bg-[#171717] mt-5 h-0.5"></div>
                                </div>
                            </>
                        ))
                        }
                    </div>
                </div>
            </main>
        </>
    )
}
