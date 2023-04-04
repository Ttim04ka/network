import { Avatar, Button, Col, Row } from 'antd';
import {
    UserOutlined
  } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';
import { Link, NavLink} from 'react-router-dom';
import styles from './Header.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/redux-store';
import { getIsFetching } from '../../redux/users-selectors';
import { logout } from '../../redux/auth-reducer';
import Preloader from '../Preloader/Preloader';




const HeaderApp:React.FC=(props)=>{
    const {Header}=Layout
    const isAuth=useSelector((state:AppState)=>state.authReducer.isAuth)
    const isFetching=useSelector(getIsFetching)
    const login=useSelector((state:AppState)=>state.authReducer.login)
    const dispatch=useDispatch()
    const logOut=()=>{
        dispatch(logout())
    }

    return<>
        {isFetching ? <Preloader></Preloader> : null}
        
        <Header className="site-layout-background" style={{ padding: 0 }}>
            <Row justify="end">
                <Col>{isAuth ? 
                    <div ><NavLink className={styles.profile_name} to='/profile'>{login} </NavLink> <Avatar className={styles.profile_img} icon={<UserOutlined />} /><Button className={styles.profile_btn} onClick={logOut}>Log out</Button></div>
                    :<Button><Link to={'/login'}>Login</Link></Button>}
                </Col>
            </Row>
            
         </Header>
            
    </>
}

export default HeaderApp;