import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ history }) => {
    const [word, setWord] = useState("")

    const handleDown = (e) => {
        if (e.key === 'Enter') {
            console.log(history)
            history.push("/q/" + word)
        }
    }

    return (
        <div className="flex w-screen justify-between items-center pl-20 pr-20 pt-4 pb-6 bg-white">
            <Link className="text-xl font-semibold cursor-pointer" style={{textDecoration: 'none'}} to="/">SkyRobotics</Link>
            {/* <p className="text-xl font-semibold cursor-pointer" onClick={() => { history.push("/") }}>SkyRobotics</p> */}
            <input type="text" className="bg-white rounded w-3/5 h-10 pl-4 pr-4 text-base shadow" placeholder="Search Tutorials" onKeyDown={handleDown} onChange={(e) => {setWord(e.target.value)}}/>
            <div className="flex items-end">
                <Link style={{textDecoration: 'none'}} to="/aboutus">ABOUT US</Link>
            </div>
            <div className="flex items-end">
                <Link style={{textDecoration: 'none'}} className="outline outline-offset-8 rounded text-base" to="/editor">+ New Project</Link>
            </div>
        </div>
    )
}

export default Navbar;
