import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux'
import bars from '../../Assets/bars-solid.svg'
import logo from '../../Assets/logo.png'
import search from '../../Assets/search-solid.svg'

function navbar() {
    var User = null;
  return (
    <nav className="main-nav">
        <div className="navbar">
            <button className="slide-in-icon">
                <img src={bars} alt="bars" width='15' />
            </button>
            <div className="navbar-1">
                <Link to='/' className='nav-item nav-logo'>
                    <img src={logo} alt="logo" />
                </Link>
                <Link to='/' className='nav-item nav-btn res-nav'>About</Link>
                <Link to='/' className='nav-item nav-btn res-nav'>Products</Link>
                <Link to='/' className='nav-item nav-btn res-nav'>For Teams</Link>
                <form action="">
                    <input type="text" placeholder="Search..." />
                    <img src={search} alt="search" width='18' className='search-icon' />
                </form>
            </div>
        </div>
    </nav>
  )
}

export default navbar