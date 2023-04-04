import React, { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, useLocation } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
import { connect, Provider } from 'react-redux';
import { compose } from 'redux';
import Preloader from './components/Preloader/Preloader'
import { setInitializedApp } from './redux/app-reducer';
import {LoginContainer} from './components/Login/LoginContainer';
import { HelmetProvider } from 'react-helmet-async';
import { ThunkAction } from 'redux-thunk';
import store, { AppState } from './redux/redux-store';
import { ActionTypes } from './redux/users-reducer';
import { UsersPage } from './components/Users/UsersContainer';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import HeaderApp from './components/Header/Header';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label:any,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}


const items: MenuItem[] = [
  getItem("Profile",'/profile',<NavLink to='/profile'><TeamOutlined></TeamOutlined></NavLink>),
  getItem("Messages",'/chat',<NavLink to='/chat'><DesktopOutlined></DesktopOutlined></NavLink>),
  getItem("Users","/users",<NavLink to='/users'><UserOutlined></UserOutlined></NavLink>)
  
];








const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const SuspensedChatPage=React.lazy(() => import('./pages/chat/chatPage'));


type MapStateToProps=ReturnType<typeof mapStateToProps>
type MapDispatchToProps={
  setInitializedApp:()=>(dispatch:any)=>ThunkAction<void,AppState,unknown,ActionTypes>,
  
  
}
type IProps={
  store:any
}

const App:React.FC< MapStateToProps & MapDispatchToProps & IProps >=(props)=>{
      useEffect(()=>{
        props.setInitializedApp();
      })
      let location=useLocation();
      
      const [collapsed, setCollapsed] = useState(false);
      if(!props.initialized){ return <Preloader></Preloader> } 
      return (
      
            <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value:any) => setCollapsed(value)}>
              <div className="logo" />
              <Menu theme="dark" selectedKeys={[location.pathname]} mode="inline" style={{fontSize:"22px",marginTop:"15px"}}  items={items} />
            </Sider>
            <Layout className="site-layout">
              <HeaderApp></HeaderApp>
              <Content style={{ margin: '16px' }}>

                  <Route exact path='/chat' 
                    render={()=>{ return <React.Suspense fallback={<div>Loading...</div>}> 
                      <SuspensedChatPage/> 
                  </React.Suspense> } }/> 

                  <Route exact path='/dialogs' 
                    render={()=>{ return <React.Suspense fallback={<div>Loading...</div>}> 
                      <DialogsContainer store={props.store}/> 
                  </React.Suspense> } }/> 

                  <Route exact path='/profile/:userId?' 
                    render={()=>{ return <React.Suspense fallback={<div>Loading...</div>}> <ProfileContainer store={props.store}/> 
                  </React.Suspense> } }/> 

                  <Route exact path='/users' render={()=> <UsersPage/> }/> 

                  <Route exact path='/login' render={()=> <LoginContainer/> }/>

              </Content>
              <Footer style={{ textAlign: 'center'}}>Social Network created by <a href='https://vk.com/vegetableeeeeeee'>Timur Tilyaev</a></Footer>
            </Layout>
          </Layout>
            
      )
}
  
    

const mapStateToProps=(state:AppState)=>({
  initialized:state.appReducer.initialized
})
let AppContainer=compose<React.ComponentType>(
  connect(mapStateToProps,{setInitializedApp}))(App);

const Network: React.FC =(props:any)=>{
  return(
    <BrowserRouter>
      <HelmetProvider>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
      </HelmetProvider>
    </BrowserRouter>
    
  )
}
export default Network

