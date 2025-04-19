import axios from 'axios';

export const fetchTopStories = async () => {
    try {
        const res = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
        return res.data;
    } catch (error) {
        console.error('Error fetching top stories:', error);
        throw error;
    }
};

export const fetchItemsById = async (id) => {
    try {
        const res = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
        return res.data;
    } catch (error) {
        console.error(`Error fetching item ${id}:`, error);
        throw error;
    }
};

export const fetchUserById = async (username) => {
    try {
        const res = await axios.get(`https://hacker-news.firebaseio.com/v0/user/${username}.json?print=pretty`);
        return res.data;
    } catch (error) {
        console.error(`Error fetching user ${username}:`, error);
        throw error;
    }
};