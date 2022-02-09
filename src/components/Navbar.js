import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ history }) => {
    const [word, setWord] = useState("")

    const handleDown = (e) => {
        if (e.key === 'Enter') {
            history.push("/q/" + word)
        }
    }

    return (
        <div className="flex w-screen justify-between items-center pl-20 pr-20 pt-6 pb-6 bg-white">
            <Link className="text-xl font-semibold cursor-pointer" style={{textDecoration: 'none'}} to="/">SkyRobotics</Link>
            {/* <p className="text-xl font-semibold cursor-pointer" onClick={() => { history.push("/") }}>SkyRobotics</p> */}
            <input type="text" className="bg-white rounded w-2/5 h-10 outline-none pl-4 pr-4 text-lg shadow" placeholder="Find items here" onKeyDown={handleDown} onChange={(e) => {setWord(e.target.value)}}/>
            <div className="flex space-x-20 items-center">
                <Link style={{textDecoration: 'none'}} to="aboutus">ABOUT US</Link>
            </div>
        </div>
    )
}

export default Navbar;
