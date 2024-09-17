import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <div className='flex items-center justify-between p-4 bg-slate-200'>
        <h1> <Link to='/'>Home</Link> </h1>
        <ul className='flex items-start justify-center'>
            <li><Link to='/add'>AddTask</Link> </li>
            <li className='ml-2'><Link to='edit'>Edit/Delete</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
