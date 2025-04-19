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
        const fetchUser = async (id) => {
            try {
                setLoading(true);
                const userData = await fetchItemsById(id);
                if (!userData) {
                    throw new Error('No user response');
                }
                setUser(userData);
            } catch (error) {
                console.error('Error fetching story:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser(id);
    }, [id]);

    console.log(user.kids);

    const fetchComments = async (ids) => {
        if (!ids || ids.length === 0) return null
        try {
            const userDetails = ids.map(async (id) => {
                const comments = await fetchItemsById(id);
                if (!comments) {
                    throw new Error('no user found');
                }
                const nestedComments = await fetchComments(comments.kids || [])
                return {
                    by: comments.by,
                    time: `${new Date(comments.time * 1000).getDate()}/${new Date(comments.time * 1000).getMonth() + 1}/${new Date(comments.time * 1000).getFullYear()}`,
                    text: comments.text,
                    kids: nestedComments,
                }
            })
            return Promise.all(userDetails)
        } catch (error) {
            console.log(error)
            return []
        }
    }

    useEffect(() => {
        setLoading(true)
        if (user && user.kids) {
            fetchComments(user.kids).then((comment) => {
                if (comment) setComments(comment)
                else return null
            })
        }
        setLoading(false)
    }, [user])

    console.log(comments);

    if (loading) {
        return (
            <p className="h-60 font-semibold sm:text-[1.05rem] text-base flex items-center justify-center">
                Loading...
            </p>
        );
    }

    return (
        <>
            {<main className='min-h-screen my-2'>
                <div>
                    <div className="space-y-4 p-4">
                        <p className="sm:text-4xl font-medium text-lg">
                            <a href={user.url} target="_blank" rel="noopener noreferrer">
                                {user.title}
                            </a>
                        </p>
                        <span className="text-sm sm:text-base flex items-center gap-1 text-gray-400">
                            <p className=" text-gray-400">
                                by{' '}
                                <Link to={`/users/${user.by}`}>
                                    <span className="text-[#FC7D49] hover:text-[#FF6600] underline underline-offset-2">
                                        {user.by}
                                    </span>
                                </Link>
                            </p>
                            <Link to={`/story/${user.id}`}>
                                <span className="text-[#FC7D49] hover:text-[#FF6600] hover:underline underline-offset-2">
                                </span>
                            </Link>
                            |  {user.score} Score | {`${new Date(user.time * 1000).getDate().toString()}/${new Date(user.time * 1000).getMonth().toString()}/${new Date(user.time * 1000).getFullYear().toString()}`}
                        </span>
                        <p className='text-[#FC7D49] underline'><a href={user.url}>{user.url}</a></p>
                    </div>
                </div>
                <div className="space-y-2.5 p-4">
                    <p className='sm:text-2xl text-lg'>Comments</p>
                    <div>
                        {comments.map((comment, index) => (
                            <>
                                <div key={index} className="space-y-4">
                                    <div className='p-4 mt-4 rounded-lg hover:bg-[#171717]'>
                                        <div>
                                            <Link to={`/users/${comment.by}`}>
                                                <span className="text-[#FC7D49] font-semibold hover:underline decoration-1 underline-offset-2 sm:text-base text-sm hover:text-[#FF6600]">{comment.by} </span>
                                            </Link>|
                                            <span className='sm:text-base text-sm'> {comment.time}</span>
                                        </div>
                                        <div className='comment text-gray-200 font-medium sm:text-base text-sm' dangerouslySetInnerHTML={{ __html: comment.text }} />
                                        {comment.kids && comment.kids.length > 0 &&
                                            comment.kids.map((item, index) => (
                                                <>
                                                    <div key={index} className='py-5 pl-10 overflow-hidden shadow-sm border-l-[0.01rem] border-l-neutral-800 transition-colors  hover:bg-[#171717]'>
                                                        <div>
                                                            <Link to={`/users/${item.by}`}>
                                                                <span className="text-[#FC7D49] font-semibold hover:underline decoration-1 underline-offset-2 sm:text-sm text-sm hover:text-[#FF6600]">
                                                                    {item.by}
                                                                </span>
                                                            </Link>|
                                                            <span className='sm:text-sm text-sm'> {item.time}</span>
                                                        </div>
                                                        <div className='comment text-gray-200 sm:text-base text-sm' dangerouslySetInnerHTML={{ __html: item.text }} />
                                                        {item.kids && item.kids.length > 0 &&
                                                            item.kids.map((layer2, index) => (
                                                                <>
                                                                    <div key={index} className='py-5 pl-10 overflow-hidden shadow-sm border-l-[0.01rem] border-l-neutral-800 transition-colors  hover:bg-[#171717]'>
                                                                        <div>
                                                                            <Link to={`/users/${layer2.by}`}>
                                                                                <span className="text-[#FC7D49] font-semibold hover:underline decoration-1 underline-offset-2 sm:text-sm text-sm hover:text-[#FF6600]">
                                                                                    {layer2.by}
                                                                                </span>
                                                                            </Link>|
                                                                            <span className='sm:text-sm text-sm'> {layer2.time}</span>
                                                                        </div>
                                                                        <div className='comment text-gray-200 sm:text-base text-sm' dangerouslySetInnerHTML={{ __html: layer2.text }} />
                                                                        {layer2.kids && layer2.kids.length > 0 &&
                                                                            layer2.kids.map((layer3, index) => (
                                                                                <>
                                                                                    <div key={index} className='py-5 pl-10 overflow-hidden shadow-sm border-l-[0.01rem] border-l-neutral-800 transition-colors  hover:bg-[#171717]'>
                                                                                        <div>
                                                                                            <Link to={`/users/${layer3.by}`}>
                                                                                                <span className="text-[#FC7D49] font-semibold hover:underline decoration-1 underline-offset-2 sm:text-sm text-sm hover:text-[#FF6600]">
                                                                                                    {layer3.by}
                                                                                                </span>
                                                                                            </Link>|
                                                                                            <span className='sm:text-sm text-sm'> {layer3.time}</span>
                                                                                        </div>
                                                                                        <div className='comment text-gray-200 sm:text-base text-sm' dangerouslySetInnerHTML={{ __html: layer3.text }} />
                                                                                        {
                                                                                            layer3.kids && layer3.kids.length > 0 &&
                                                                                            layer3.kids.map((layer4, index) => (
                                                                                                <>
                                                                                                    <div key={index} className='py-5 pl-10 overflow-hidden shadow-sm border-l-[0.01rem] border-l-neutral-800 transition-colors  hover:bg-[#171717]'>
                                                                                                        <div>
                                                                                                            <Link to={`/users/${layer4.by}`}>
                                                                                                                <span className="text-[#FC7D49] font-semibold hover:underline decoration-1 underline-offset-2 sm:text-sm text-sm hover:text-[#FF6600]">
                                                                                                                    {layer4.by}
                                                                                                                </span>
                                                                                                            </Link>|
                                                                                                            <span className='sm:text-sm text-sm'> {layer4.time}</span>
                                                                                                        </div>
                                                                                                        <div className='comment text-gray-200 sm:text-base text-sm' dangerouslySetInnerHTML={{ __html: layer4.text }} />
                                                                                                    </div>
                                                                                                </>
                                                                                            ))
                                                                                        }
                                                                                    </div>
                                                                                </>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                </>
                                                            ))
                                                        }
                                                    </div>
                                                </>
                                            ))
                                        }
                                    </div>
                                    <div className="bg-[#171717] mt-5 h-0.5"></div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </main>}
        </>
    )
}













