import { Avatar, Button, Col, Row } from 'antd';
import {
    UserOutlined
  } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';
import { Link, NavLink, Redirect} from 'react-router-dom';
import styles from './Header.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/redux-store';
import { getIsFetching } from '../../redux/users-selectors';
import { logout } from '../../redux/auth-reducer';
import Preloader from '../Preloader/Preloader';




const HeaderApp:React.FC=(props)=>{
    const {Header}=Layout
    const isAuth=useSelector((state:AppState)=>state.authReducer.isAuth)
    const login=useSelector((state:AppState)=>state.authReducer.login)
    let photo=useSelector((state:AppState)=>state.profileReducer.photoURL);
    const dispatch=useDispatch();
    const logOut=()=>{
        <Redirect to='/login'></Redirect>
        dispatch(logout())
    }

    return<>
        <Header className="site-layout-background" style={{ padding: 0 }}>
            <Row justify="end">
                <Col>{isAuth ? 
                    <div ><NavLink className={styles.profile_name} to='/profile'>{login} </NavLink>{photo ? <img className={styles.add_img} src={photo}></img>: <Avatar className={styles.profile_img} icon={<UserOutlined />} /> }<Button className={styles.profile_btn} onClick={logOut}>Log out</Button></div>
                    :<Button className={styles.profile_btn}><Link to={'/login'}>Login</Link></Button>}
                </Col>
            </Row>
            
         </Header>
            
    </>
}

export default HeaderApp;