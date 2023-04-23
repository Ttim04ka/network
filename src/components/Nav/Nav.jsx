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
          <div className={nav.item}>
            <NavLink to='/users' activeClassName={nav.active}>Users</NavLink>
          </div>
          <div className={nav.item}>
            <NavLink to='/news' activeClassName={nav.active}>News</NavLink>
          </div>
          <div className={nav.item}>
            <NavLink to='/music' activeClassName={nav.active}>Music</NavLink>
          </div>
          <div className={nav.item}>
            <NavLink to='/settings' activeClassName={nav.active}>Settings</NavLink>
          </div>
      </nav>
    )
}

export default Nav;