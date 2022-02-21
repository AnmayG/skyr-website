import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Navbar = () => {
    const [word, setWord] = useState("")
    let navigate = useNavigate()


    const handleDown = (e) => {
        if (e.key === 'Enter') {
            navigate("/q/" + word)
        }
    }

    return (
        <div className="flex w-screen justify-between items-center lg:px-14 md:px-8 sm:px-4 pt-3 pb-3 bg-white">
            <div className='flex justify-center items-center whitespace-nowrap'>
                <img src='../../skyr-logo.svg' className='h-10 mr-2' onClick={() => {navigate("/")}} alt=""></img>
                <Link className="text-xl text-center font-bold cursor-pointer shrink-0 mr-8" style={{textDecoration: 'none'}} to="/">SkyRobotics</Link>
                {/* <input type="text" className="bg-white rounded mx-16 w-full h-10 px-4 text-base shadow" placeholder="Search Tutorials" onKeyDown={handleDown} onChange={(e) => {setWord(e.target.value)}}/> */}
                <div className="text-center mr-8">
                    <Link style={{textDecoration: 'none'}} to="/aboutus">About Us</Link>
                </div>
                <div className="text-center mr-8">
                    <Link style={{textDecoration: 'none'}} className="text-base" to="/courses">Courses</Link>
                </div>
                <div className="text-center mr-8">
                    <Link style={{textDecoration: 'none'}} className="text-base" to="/community">Community</Link>
                </div>

            </div>
            <div className='flex justify-evenly items-center whitespace-nowrap'>
                <div className="items-center text-center mr-8">
                    <Link style={{textDecoration: 'none'}} className="border-2 border-black touch-manipulation rounded-3xl p-2 text-base text-center font-semibold" to="/editor">+ NEW PROJECT</Link>
                </div>
                <div className="items-end text-center mr-8">
                    <Link style={{textDecoration: 'none'}} className="text-base font-bold" to="/login">Log In</Link>
                </div>
                <div className="items-end text-center">
                    <Link style={{textDecoration: 'none'}} className="text-base bg-blue-400 font-bold text-white rounded-3xl p-2 px-4" to="/signup">Sign Up</Link>
                </div>
                <div className='hidden ml-8'>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
