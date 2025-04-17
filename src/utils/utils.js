export const fetchTopStories = async () => {
    const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    const data = await res.json()
    return data
}

export const fetchItemsById = async (id) => {
    const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
    const data = await res.json()
    return data
}

export const fetchUserById = async (username) => {
    const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${username}.json?print=pretty`)
    const data = await res.json()
    return data
}