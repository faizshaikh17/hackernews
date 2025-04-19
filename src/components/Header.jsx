import React from 'react'
import { Link } from 'react-router-dom'
// import { StarsIcon } from 'lucide-react'


export default function Header() {
    return (
        <>
            <header className='p-4 tracking-tight text-[#FC7D49]'>
                <div className='flex items-center justify-between'>
                    <Link to={'/'}>
                        <span className='text-lg text-white sm:text-[1.4rem]'>TheDaily<span className='text-[#FC7D49] hover:text-[#FF6600]'>Hacker</span></span>
                    </Link>
                    <span className='hover:text-[#FF6600] text-lg'><a href="https://github.com/faizshaikh17/newhackertimes" target="_blank" rel="noopener noreferrer"> github</a></span>
                </div>
            </header>
        </>
    )
}
