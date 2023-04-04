import React from 'react';
import { NavLink } from 'react-router-dom';
import nav from './Nav.module.css'
const Nav=(props)=>{
    return(
      <nav className={nav.nav}>
          <div className={`${nav.item}`}>
            <NavLink to='/profile' activeClassName={nav.active}>Profile</NavLink>
          </div>
          <div className={nav.item}>
            <NavLink to='/dialogs' activeClassName={nav.active}>Messages</NavLink>
          </div>
      </nav>
    )
}

export default Nav;