import React, { useEffect, useState } from 'react'
import { fetchTopStories, fetchItemsById } from '../utils/utils'

export default function Main() {

    const [topStoriesIds, setTopStoriesIds] = useState([])
    const [top50Stories, setTop50Stories] = useState([])

    useEffect(() => {
        const loadStories = async () => {
            const res = await fetchTopStories();
            setTopStoriesIds(res)
        }
        loadStories()

        const top50 = topStoriesIds.slice(0, 10);

        top50.forEach(async (id) => {
            const res = await fetchItemsById(id);
            setTop50Stories(res);
        })

        console.log(top50);

    }, [])



    return (
        <main className='min-h-screen'>
        </main>
    )
}
