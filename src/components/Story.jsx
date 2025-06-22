import React, { useState, useEffect } from 'react';
import { fetchItemsById } from '../utils/utils';
import { useParams, Link } from 'react-router-dom';

const StoryShimmer = () => (
    <div className="space-y-4 p-4 border rounded-md border-neutral-800">
        <div className="animate-pulse space-y-3">
            <div className="h-6 w-3/4 rounded bg-neutral-700/40" />
            <div className="h-4 w-1/2 rounded bg-neutral-700/40" />
        </div>
    </div>
);

const CommentShimmer = () => (
    <div className="p-4 mt-4 rounded-md border border-neutral-800">
        <div className="animate-pulse space-y-3">
            <div className="flex items-center gap-2">
                <div className="h-4 w-24 rounded bg-neutral-700/40" />
                <div className="h-4 w-32 rounded bg-neutral-700/40" />
            </div>
            <div className="h-3 w-full rounded bg-neutral-700/40" />
            <div className="h-3 w-10/12 rounded bg-neutral-700/40" />
        </div>
    </div>
);

const Comment = ({ childComment }) => {
    if (!childComment || !childComment.by) return null;

    return (
        <div className="space-y-4 pt-4">
            <div className="pl-4 sm:pl-6 border-l-[0.5px] border-l-neutral-800 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                    <Link to={`/users/${childComment.by}`}>
                        <span className="text-[#FA7921] hover:text-[#FE9920] font-semibold hover:underline underline-offset-4 transition-colors text-sm sm:text-base">
                            {childComment.by}
                        </span>
                    </Link>
                    <span className="text-gray-500">|</span>
                    <span className="text-sm sm:text-base dark:text-gray-400 text-black/90">
                        {childComment.time}
                    </span>
                </div>
                <div
                    className="prose prose-sm max-w-none dark:text-gray-400 text-black/90 text-sm sm:text-base prose-p:m-0 break-words whitespace-pre-wrap overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: childComment.text }}
                />
                {childComment.kids?.map((nested, i) => (
                    <Comment childComment={nested} key={i} />
                ))}
            </div>
        </div>
    );
};

export default function Story() {
    const [story, setStory] = useState({});
    const [comments, setComments] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    const fetchAllComments = async (ids) => {
        if (!ids?.length) return [];
        try {
            const commentPromises = ids.map(async (cid) => {
                const comment = await fetchItemsById(cid);
                if (!comment || comment.deleted || comment.dead) return null;
                const nested = await fetchAllComments(comment.kids || []);
                return {
                    by: comment.by,
                    time: new Date(comment.time * 1000).toLocaleDateString(),
                    text: comment.text,
                    kids: nested,
                };
            });
            const resolved = await Promise.all(commentPromises);
            return resolved.filter(Boolean);
        } catch {
            return [];
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const storyData = await fetchItemsById(id);
                if (!storyData) throw new Error();
                setStory(storyData);
                if (storyData.kids) {
                    const commentData = await fetchAllComments(storyData.kids);
                    setComments(commentData);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) {
        return (
            <main className="min-h-screen my-6 px-4 sm:px-6 lg:px-8">
                <StoryShimmer />
                <div className="space-y-2.5 py-4">
                    <div className="animate-pulse h-6 w-32 rounded bg-neutral-700/40 mt-4" />
                    {Array.from({ length: 3 }).map((_, i) => (
                        <CommentShimmer key={i} />
                    ))}
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen my-6 px-4 sm:px-6 lg:px-8">
            <div className="space-y-4 p-4 border rounded-md border-neutral-800 transition-all duration-200 dark:hover:bg-[#171717] hover:shadow-sm">
                <p className="text-lg sm:text-2xl font-semibold leading-tight">{story.title}</p>
                <div className="text-sm sm:text-base flex items-center gap-2 flex-wrap dark:text-gray-400 text-black/80">
                    <span>by</span>
                    <Link to={`/users/${story.by}`}>
                        <span className="text-[#FA7921] hover:text-[#FE9920] hover:underline underline-offset-4 transition-colors">
                            {story.by || "User"}
                        </span>
                    </Link>
                    <span>|</span>
                    <span>{story.score || "0"} Score</span>
                    <span>|</span>
                    <span>{new Date(story.time * 1000).toLocaleDateString()}</span>
                </div>
                {story.url && (
                    <p className="text-[#FA7921] underline underline-offset-4 transition-colors hover:text-[#FE9920] break-words">
                        <a href={story.url} target="_blank" rel="noopener noreferrer">
                            {story.url}
                        </a>
                    </p>
                )}
            </div>

            <div className="space-y-2.5 py-4">
                <p className="text-lg sm:text-xl font-semibold text-[#FA7921]">
                    Comments ({story.descendants || 0})
                </p>
                {comments.map((comment, index) => (
                    <div
                        key={index}
                        className="p-4 sm:p-5 mt-4 rounded-md border border-neutral-800 transition-all duration-200 dark:hover:bg-[#171717] hover:shadow-sm space-y-2"
                    >
                        <div className="flex items-center gap-2 flex-wrap">
                            <Link to={`/users/${comment.by}`}>
                                <span className="text-[#FA7921] font-semibold hover:underline underline-offset-4 transition-colors text-sm sm:text-base">
                                    {comment.by}
                                </span>
                            </Link>
                            <span className="text-gray-500">|</span>
                            <span className="text-sm sm:text-base dark:text-gray-400 text-black/90">
                                {comment.time}
                            </span>
                        </div>
                        <div
                            className="prose prose-sm max-w-none dark:text-gray-400 text-black/90 text-sm sm:text-base prose-p:m-0 break-words whitespace-pre-wrap overflow-x-auto"
                            dangerouslySetInnerHTML={{ __html: comment.text }}
                        />
                        {comment.kids?.map((child, idx) => (
                            <Comment childComment={child} key={idx} />
                        ))}
                    </div>
                ))}
            </div>
        </main>
    );
}
