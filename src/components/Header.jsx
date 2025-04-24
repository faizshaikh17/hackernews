import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/context'
import { Sun, MoonIcon } from 'lucide-react'


export default function Header() {

    const { themeMode, lightTheme, darkTheme } = useTheme();

    const handleMode = (e) => {
        const status = e.currentTarget.checked
        status ? lightTheme() : darkTheme()
    };

    return (
        <>
            <header className='p-5 tracking-tight bg-[#f0f0f0] dark:bg-[#121212] transition-colors duration-300'>
                <div className='flex justify-between items-center'>
                    <Link to={'/'}>
                        <span className='text-[1.2rem] text-[#FA7921] dark:text-[#f0f0f0] font-semibold sm:text-[1.4rem]'>TheDailyHacker</span>
                    </Link>
                    <span className='flex justify-between items-center gap-2'>
                        <span className='dark:text-[#FA7921] text-[#121212] dark:hover:text-[#FE9920] underline underline-offset-8 font-light text-lg'><a href="https://github.com/faizshaikh17/newhackertimes" target="_blank" rel="noopener noreferrer">github</a>

                        </span>
                        <label className="relative inline-flex items-center cursor-pointer" aria-label="Toggle dark mode">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                onChange={handleMode}
                                checked={themeMode === 'light'}
                            />
                            <div className="h-8 w-8 flex justify-center items-center">
                                {themeMode === 'dark' ? <Sun className='text-[#f0f0f0]' size={18} /> : <MoonIcon className='text-[#121212]' size={18} />}
                            </div>
                        </label>
                    </span>
                </div>
            </header>
        </>
    )
}
