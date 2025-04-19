import React, { useState, useEffect } from 'react';
import { fetchUserById } from '../utils/utils';
import { useParams } from 'react-router-dom';

export default function UserProfile() {
  const [user, setUser] = useState([]);
  const param = useParams();
  const username = param.name;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      const fetchUser = async (username) => {
        const User = await fetchUserById(username);
        if (!User) {
          throw new Error("no user response");
        }
        setUser(User);
      };
      setLoading(false);
      fetchUser(username);
    } catch (error) {
      console.error('Error fetching top stories:', error);
    }
  }, [username]);

  if (loading) {
    return (
      <p className="h-60 font-semibold sm:text-[1.05rem] text-base flex items-center justify-center">
        Loading...
      </p>
    );
  }
  console.log(user.created);

  return (
    <>
      {!loading && (
        <main className='min-h-screen p-4 tracking-tight my-4'>
          <div className=''>
            <>
              <div className='space-y-4'>
                <p className='text-[#FC7D49] font-semibold sm:text-[1.3rem] text-base'>
                  {username}
                </p>
                <div>
                  <p>
                    <span className='text-gray-400 text-base'>Joined: </span>
                    {`${new Date(user.created * 1000).getDate().toString().padStart(2, '0')}/${(new Date(user.created * 1000).getMonth() + 1).toString().padStart(2, '0')
                      }/${new Date(user.created * 1000).getFullYear()}`}
                  </p>
                  <p>
                    <span className='text-gray-400 text-base'>Karma: </span>
                    {user.karma}
                  </p>
                  <p className='flex gap-1'>
                    <span className='text-gray-400 text-base'>About: </span>
                    {<div dangerouslySetInnerHTML={{ __html: user.about }}></div> || 'There should be description here somewhere...'}
                  </p>
                </div>
              </div>
            </>
          </div>
        </main>
      )}
    </>
  );
}