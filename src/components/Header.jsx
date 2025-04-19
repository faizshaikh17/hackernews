import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <>
            <header className='p-4 tracking-tight text-[#FC7D49]'>
                <div className='flex justify-between items-end'>
                    <Link to={'/'}>
                        <span className='text-[1.2rem]  text-white sm:text-[1.4rem]'>TheDaily<span className='text-[#FC7D49] hover:text-[#FF6600]'>Hacker</span></span>
                    </Link>
                    <span className='hover:text-[#FF6600] text-lg'><a href="https://github.com/faizshaikh17/newhackertimes" target="_blank" rel="noopener noreferrer">github</a></span>
                </div>
            </header>
        </>
    )
}
