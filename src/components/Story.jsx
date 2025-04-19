import React, { useState, useEffect, useRef } from 'react'
import { fetchItemsById } from '../utils/utils';
import { useParams, Link } from 'react-router-dom';
import { Triangle } from 'lucide-react';

export function Comment({childComment, index}) {

    return (
        <>
            <div key={index} className="space-y-4">
                <div className='p-4 pl-8 mt-4 border-l-[0.01rem] border-l-neutral-300'>
                    <div className="flex items-center gap-2">
                        <Link to={`/users/${childComment.by}`}>
                            <span className="text-[#121212] font-semibold hover:underline underline-offset-4 transition-colors sm:text-base text-sm">{childComment.by} </span>
                        </Link>|
                        <span className='sm:text-base text-sm text-gray-800'> {childComment.time}</span>
                    </div>
                    <div id='lazy' className='comment prose prose-sm max-w-none text-gray-800 font-medium sm:text-base text-sm' dangerouslySetInnerHTML={{ __html: childComment.text }} />
                    {childComment.kids && childComment.kids.map((nestedChildComment, index) => (
                        <>
                            <Comment childComment={nestedChildComment} key={index} />
                        </>
                    ))

                    }
                </div>
            </div>
        </>
    )
}

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
                    time: `${new Date(comments.time * 1000).getDate().toString().padStart(2, '0')}/${new Date(comments.time * 1000).getMonth() + 1}/${new Date(comments.time * 1000).getFullYear()}`,
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

    // useEffect(() => {
    //     const lazyCommentDiv = document.getElementById('lazy')

    //     const observer = new IntersectionObserver((entries, observer) => {
    //         entries.forEach(entry => {
    //             if (entry.isIntersecting) {
    //                 const div = entry.target;
    //                 comments.map(item => (
    //                     div.ATTRIBUTE_NODE.dangerouslySetInnerHTML = {__html: item.text }
    //                 ))
    //                 observer.unobserve(div);
    //             }
    //         })
    //     }, {
    //         root: null,
    //         rootMargin: '100px',
    //         threshold: 0,
    //     })

    //     observer.observe(lazyCommentDiv)

    //     return () => {
    //         if (lazyCommentDiv) observer.unobserve(lazyCommentDiv)
    //     }
    // }, [])




    if (loading) {
        return (
            <p className="min-h-60 flex items-center justify-center font-semibold sm:text-[1.05rem] text-base animate-pulse">
                Loading...
            </p>
        );
    }


    return (
        <>
            {<main className='min-h-screen my-6 px-4 sm:px-6 lg:px-8'>
                <div>
                    <div className="space-y-4 p-4 border-[0.01rem] border-neutral-800 rounded-lg transition-all duration-200 hover:bg-[#FFFFFF] hover:shadow-sm">
                        <p className="sm:text-2xl font-semibold text-lg leading-tight">
                            <a href={user.url} target="_blank" rel="noopener noreferrer" className="text-[#121212] hover:underline focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-opacity-50">
                                {user.title}
                            </a>
                        </p>
                        <span className="text-sm sm:text-base flex items-center gap-2 text-gray-800 flex-wrap">
                            <p className="text-gray-800">
                                by{' '}
                                <Link to={`/users/${user.by}`}>
                                    <span className="text-[#121212] hover:underline underline-offset-4 transition-colors">
                                        {user.by}
                                    </span>
                                </Link>
                            </p>
                            <Link to={`/story/${user.id}`}>
                                <span className="text-[#121212] hover:underline underline-offset-4 transition-colors">
                                </span>
                            </Link>
                            |  {user.score} Score | {`${new Date(user.time * 1000).getDate().toString()}/${new Date(user.time * 1000).getMonth().toString()}/${new Date(user.time * 1000).getFullYear().toString()}`}
                        </span>
                        <p className='text-[#121212] underline underline-offset-4 transition-colors hover:text-gray-600 truncate'><a href={user.url}>{user.url}</a></p>
                    </div>
                </div>
                <div className="space-y-2.5 py-4">
                    <p className='sm:text-xl text-lg font-semibold text-[#121212]'>Comments</p>
                    <div >
                        {comments.map((comment, index) => (
                            <>
                                <div key={index} className="space-y-4">
                                    <div className='p-4 mt-4 rounded-lg border-[0.01rem] border-neutral-800 transition-all duration-200 hover:bg-[#FFFFFF] hover:shadow-sm'>
                                        <div className="flex items-center gap-2">
                                            <Link to={`/users/${comment.by}`}>
                                                <span className="text-[#121212] font-semibold hover:underline underline-offset-4 transition-colors sm:text-base text-sm">{comment.by} </span>
                                            </Link>|
                                            <span className='sm:text-base text-sm text-gray-800'> {comment.time}</span>
                                        </div>
                                        <div id='lazy' className='comment prose prose-sm max-w-none text-gray-800 font-medium sm:text-base text-sm' dangerouslySetInnerHTML={{ __html: comment.text }} />
                                        {comment.kids && comment.kids.length > 0 &&
                                            comment.kids.map((comment, index) => (
                                                <>
                                                    <Comment childComment={comment} key={index} />
                                                </>
                                            ))
                                        }
                                    </div>
                                </div>
                            </>
                        ))}
                    </div >
                </div>

            </main>}
        </>
    )
}












// className='p-4 mt-4 rounded-lg border-[0.01rem] border-neutral-800 transition-all duration-200 hover:bg-[#FFFFFF] hover:shadow-sm'

// <div key={index} className="space-y-4">
//                                     <div className='p-4 mt-4 rounded-lg border-[0.01rem] border-neutral-800 transition-all duration-200 hover:bg-[#FFFFFF] hover:shadow-sm'>
//                                         <div className="flex items-center gap-2">
//                                             <Link to={`/users/${comment.by}`}>
//                                                 <span className="text-[#121212] font-semibold hover:underline underline-offset-4 transition-colors sm:text-base text-sm">{comment.by} </span>
//                                             </Link>|
//                                             <span className='sm:text-base text-sm text-gray-800'> {comment.time}</span>
//                                         </div>
//                                         <div id='lazy' className='comment prose prose-sm max-w-none text-gray-800 font-medium sm:text-base text-sm' dangerouslySetInnerHTML={{ __html: comment.text }} />
//                                         {comment.kids && comment.kids.length > 0 &&
//                                             comment.kids.map((item, index) => (
//                                                 <>
//                                                     <div key={index} className='py-5 comment pl-10 pr-4 border-l-[0.01rem] border-l-neutral-300 transition-all duration-200 hover:bg-[#FFFFFF] hover:shadow-xs'>
//                                                         <div className="flex items-center gap-2">
//                                                             <Link to={`/users/${item.by}`}>
//                                                                 <span className="text-[#121212] font-semibold hover:underline underline-offset-4 transition-colors sm:text-sm text-sm">
//                                                                     {item.by}
//                                                                 </span>
//                                                             </Link>|
//                                                             <span className='sm:text-sm text-sm text-gray-800'> {item.time}</span>
//                                                         </div>
//                                                         <div id='lazy' className='comment prose prose-sm max-w-none text-gray-800 sm:text-base text-sm' dangerouslySetInnerHTML={{ __html: item.text }} />
//                                                         {item.kids && item.kids.length > 0 &&
//                                                             item.kids.map((layer2, index) => (
//                                                                 <>
//                                                                     <div key={index} className='py-5 comment pl-10 pr-4 border-l-[0.01rem] border-l-neutral-300 transition-all duration-200 hover:bg-[#FFFFFF] hover:shadow-xs'>
//                                                                         <div className="flex items-center gap-2">
//                                                                             <Link to={`/users/${layer2.by}`}>
//                                                                                 <span className="text-[#121212] font-semibold hover:underline underline-offset-4 transition-colors sm:text-sm text-sm">
//                                                                                     {layer2.by}
//                                                                                 </span>
//                                                                             </Link>|
//                                                                             <span className='sm:text-sm text-sm text-gray-800'> {layer2.time}</span>
//                                                                         </div>
//                                                                         <div id='lazy' className='comment prose prose-sm max-w-none text-gray-800 sm:text-base text-sm' dangerouslySetInnerHTML={{ __html: layer2.text }} />
//                                                                         {layer2.kids && layer2.kids.length > 0 &&
//                                                                             layer2.kids.map((layer3, index) => (
//                                                                                 <>
//                                                                                     <div key={index} className='py-5 comment pl-10 pr-4 border-l-[0.01rem] border-l-neutral-300 transition-all duration-200 hover:bg-[#FFFFFF] hover:shadow-xs'>
//                                                                                         <div className="flex items-center gap-2">
//                                                                                             <Link to={`/users/${layer3.by}`}>
//                                                                                                 <span className="text-[#121212] font-semibold hover:underline underline-offset-4 transition-colors sm:text-sm text-sm">
//                                                                                                     {layer3.by}
//                                                                                                 </span>
//                                                                                             </Link>|
//                                                                                             <span className='sm:text-sm text-sm text-gray-800'> {layer3.time}</span>
//                                                                                         </div>
//                                                                                         <div id='lazy' className='comment prose prose-sm max-w-none text-gray-800 sm:text-base text-sm' dangerouslySetInnerHTML={{ __html: layer3.text }} />
//                                                                                         {
//                                                                                             layer3.kids && layer3.kids.length > 0 &&
//                                                                                             layer3.kids.map((layer4, index) => (
//                                                                                                 <>
//                                                                                                     <div key={index} className='py-5 comment pl-10 pr-4 border-l-[0.01rem] border-l-neutral-300 transition-all duration-200 hover:bg-[#FFFFFF] hover:shadow-xs'>
//                                                                                                         <div className="flex items-center gap-2">
//                                                                                                             <Link to={`/users/${layer4.by}`}>
//                                                                                                                 <span className="text-[#121212] font-semibold hover:underline underline-offset-4 transition-colors sm:text-sm text-sm">
//                                                                                                                     {layer4.by}
//                                                                                                                 </span>
//                                                                                                             </Link>|
//                                                                                                             <span className='sm:text-sm text-sm text-gray-800'> {layer4.time}</span>
//                                                                                                         </div>
//                                                                                                         <div id='lazy' className='comment prose prose-sm max-w-none text-gray-800 sm:text-base text-sm' dangerouslySetInnerHTML={{ __html: layer4.text }} />
//                                                                                                     </div>
//                                                                                                 </>
//                                                                                             ))
//                                                                                         }
//                                                                                     </div>
//                                                                                 </>
//                                                                             ))
//                                                                         }
//                                                                     </div>
//                                                                 </>
//                                                             ))
//                                                         }
//                                                     </div>
//                                                 </>
//                                             ))
//                                         }
//                                     </div>
//                                     {/* <div className="bg-neutral-800 mt-5 h-[0.01rem]"></div> */}
//                                 </div>