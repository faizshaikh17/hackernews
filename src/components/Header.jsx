import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <>
            <header className='p-5 tracking-tight text-[#121212]'>
                <div className='flex justify-between items-center'>
                    <Link to={'/'}>
                        <span className='text-[1.2rem] text-white font-semibold sm:text-[1.4rem]'>TheDaily<span className=' text-white '>Hacker</span></span>
                    </Link>
                    <span className='text-[#FA7921] hover:text-[#FE9920] underline  font-light text-lg'><a href="https://github.com/faizshaikh17/newhackertimes" target="_blank" rel="noopener noreferrer">github</a></span>
                </div>
            </header>
        </>
    )
}
