import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <>
            <header className='p-5 tracking-tight text-[#121212]'>
                <div className='flex justify-between items-center'>
                    <Link to={'/'}>
                        <span className='text-[1.2rem] font-semibold  text-[#121212] sm:text-[1.4rem]'>TheDaily<span className='text-[#121212] hover:text-[#121212]'>Hacker</span></span>
                    </Link>
                    <span className='hover:text-[#121212] font-medium text-lg'><a href="https://github.com/faizshaikh17/newhackertimes" target="_blank" rel="noopener noreferrer">github</a></span>
                </div>
            </header>
        </>
    )
}
