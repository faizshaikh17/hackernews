import axios, { Axios } from "axios"


export const fetchTopStories = async () => {
    const res = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    const data = await res.json()
    return data
}

export const fetchItemsById = async (id) => {
    const res = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
    const data = await res.json()
    return data
}

export const fetchUserById = async (username) => {
    const res = await axios.get(`https://hacker-news.firebaseio.com/v0/user/${username}.json?print=pretty`)
    const data = await res.json()
    return data
}