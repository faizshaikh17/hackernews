import React from 'react'
import { Link } from 'react-router-dom'


export default function Header() {
    return (
        <>
            <header className='p-4 tracking-tight text-[#FC7D49]'>
                <div className='flex items-center justify-between'>
                    <Link to={'/'}>
                        <span className='font-semibold tracking-wide text-lg text-white sm:text-[1.4rem]'>newhacker<span className='text-[#FC7D49]'>times</span></span>
                    </Link>
                    <span className=' text-base'>github</span>
                </div>
            </header>
        </>
    )
}
