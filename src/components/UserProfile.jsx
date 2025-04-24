import React, { useState, useEffect } from 'react';
import { fetchUserById } from '../utils/utils';
import { useParams } from 'react-router-dom';

export default function UserProfile() {
  const [user, setUser] = useState({});
  const param = useParams();
  const username = param.name;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      const fetchUser = async (username) => {
        const User = await fetchUserById(username);
        if (!User) {
          throw new Error('no user response');
        }
        setUser(User);
        setLoading(false);
      };
      fetchUser(username);
    } catch (error) {
      console.error('Error fetching user:', error);
      setLoading(false);
    }
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-60 flex items-center justify-center">
        <p className="font-semibold sm:text-[1.05rem] text-base animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen tracking-tight dark:bg-[#121212] bg-[#f0f0f0] my-6 px-4 sm:px-6 lg:px-8">
      <section className="max-w-4xl mx-auto">
        <article className="p-4 border-[0.01rem] rounded-md border-neutral-800 transition-all hover:bg-gray-200 dark:hover:bg-[#171717] hover:shadow-sm">
          <div className="space-y-4">
            <h2 className="text-[#FA7921] hover:text-[#FE9920] transition-colors font-semibold sm:text-[1.3rem] text-base leading-tight">
              {username}
            </h2>
            <div className="space-y-2 text-base">
              <p>
                <span className="text-gray-400">Joined: </span>
                {`${new Date(user.created * 1000)
                  .getDate()
                  .toString()
                  .padStart(2, '0')}/${(new Date(user.created * 1000).getMonth() + 1)
                    .toString()
                    .padStart(2, '0')}/${new Date(user.created * 1000).getFullYear()}`}
              </p>
              <p>
                <span className="text-gray-400">Karma: </span>
                {user.karma}
              </p>
              <p className="flex gap-1">
                <span className="text-gray-400">About: </span>
                {user.about ? (
                  <div
                    className="prose comment prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: user.about }}
                  />
                ) : (
                  <span>No description available...</span>
                )}
              </p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}