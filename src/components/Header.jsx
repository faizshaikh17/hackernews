import React from 'react'
import { Link } from 'react-router-dom'


export default function Header() {
    return (
        <>
            <header className='p-4 tracking-tight text-[#FC7D49]'>
                <div className='flex items-center justify-between'>
                    <Link to={'/'}>
                    <span className='font-semibold text-xl text-white'>hacker<span className='text-[#FC7D49]'>news</span></span> 
                    </Link>
                    <span className=' text-base'>github</span>
                </div>
            </header>
        </>
    )
}
