import React from 'react'
import { Link } from 'react-router-dom'
// import { StarsIcon } from 'lucide-react'


export default function Header() {
    return (
        <>
            <header className='p-4 tracking-tight text-[#FC7D49]'>
                <div className='flex items-center justify-between'>
                    <Link to={'/'}>
                        <span className=' tracking-wide text-lg text-white sm:text-[1.4rem]'>newhacker<span className='text-[#FC7D49] hover:text-[#FF6600]'>times</span></span>
                    </Link>
                    <span className='hover:text-[#FF6600] text-base'><a href="https://github.com/faizshaikh17/newhackertimes" target="_blank" rel="noopener noreferrer"> github</a></span>
                </div>
            </header>
        </>
    )
}
