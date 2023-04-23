
import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import  { FilterStateType, followThunkCreator, getUserThunkCreator,  unfollowThunkCreator }  from '../../redux/users-reducer';
import { getCurrentPage, getDisabledBtn, getFilter, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from '../../redux/users-selectors';
import Paginator from './Paginator';
import styles from './Users.module.css'
import * as queryString from 'querystring'
import Preloader from '../Preloader/Preloader';
type Props={
    portionSize?:number 
}
let Users:React.FC<Props>=React.memo((props)=>{

    const isFetching=useSelector(getIsFetching)
    const disable=useSelector(getDisabledBtn)
    const users=useSelector(getUsers)
    const filter=useSelector(getFilter)
    const totalUsersCount=useSelector(getTotalUsersCount)
    const pageSize=useSelector(getPageSize)
    const currentPage=useSelector(getCurrentPage)
    const dispatch=useDispatch()
    const unfollowThunk=(id:number)=>{dispatch(unfollowThunkCreator(id))}
    const followThunk=(id:number)=>{dispatch(followThunkCreator(id))}
    const history=useHistory()
   
    useEffect(()=>{
        const parsed=queryString.parse(history.location.search.substr(1))
        let actualPage=currentPage;
        let actualFilter=filter;
        if(parsed.page) actualPage=Number(parsed.page)
        if(parsed.term) actualFilter={...actualFilter,term:parsed.term as string}
        if(parsed.friend) actualFilter={...actualFilter,friend:parsed.friend==="null" ? null : parsed.friend==="true" ? true : false }


        dispatch(getUserThunkCreator(actualPage,pageSize,actualFilter))
    },[])
    useEffect(()=>{
        const query:any={}
        if(currentPage!==1) query.page=currentPage
        if(filter.term) query.term=filter.term
        if(filter.friend!==null) query.friend=String(filter.friend)
        history.push({
            pathname:'/users',
            search:queryString.stringify(query)
        })
    },[currentPage,filter])

        
    const  onPageChanged=(pageNumber:number,filter:FilterStateType)=>{
        dispatch(getUserThunkCreator(pageNumber,pageSize,filter))
    }


    const onFilterChanged=(filter:FilterStateType)=>{
        dispatch(getUserThunkCreator(currentPage,pageSize,filter))
    }

    return (
      <>
      {isFetching ? <Preloader></Preloader> : 
      <div>
        <UsersSearchForm onFilterChanged={onFilterChanged}></UsersSearchForm>
       
        <div className={styles.users_container}>
            {users.map(user=><div className={styles.user} key={user.id}>
                <span >
                    <div>
                        <NavLink to={'/profile/'+ user.id}>
                            <img className={styles.user_img} src={user.photoUrl!=null ? user.photoUrl : "https://w7.pngwing.com/pngs/364/361/png-transparent-account-avatar-profile-user-avatars-icon.png" } alt="" />
                        </NavLink>
                        
                    </div>
                    <span>

                    <span>
                        <div className={styles.users_name}>{user.name}</div>
                        <div className={styles.users_status}><i> {user.status?user.status:"No status yet"}</i></div>
                    </span>

                </span>
                    <div>
                        {user.followed 
                        ? <button className={styles.users_btn_active} disabled={disable.some(id=>id===user.id)} onClick={
                            ()=>{
                                unfollowThunk(user.id);
                            }
                        }>Unfollow</button> 
                        : <button className={styles.users_btn} disabled={disable.some(id=>id===user.id)} onClick={
                            ()=>{
                                followThunk(user.id);
                            }
                        }>Follow</button>}
                        
                    </div>
                </span>
                
            </div>)}
            
        </div>
        {users.length>0 && <div className={styles.paginator_container}> 
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalUsersCount={totalUsersCount} pageSize={pageSize} filter={filter}></Paginator>   
        </div>}
        
       
        </div>}
      </>
        
       
)})






export default Users


type UsersSearchFormType={
    onFilterChanged:(filter:FilterStateType)=>void
}
export const UsersSearchForm:React.FC<UsersSearchFormType>=React.memo((props)=>{
    const filter=useSelector(getFilter)
    return <div>
        <Formik
            enableReinitialize={true}
            initialValues={{term:filter.term,friend:filter.friend}}
            validate={values => {
                const errors = {};
                return errors;
            }}
            onSubmit={(values:FilterStateType, { setSubmitting }) => {
                props.onFilterChanged(values)
                setSubmitting(false)
            }}
            >
            {({ isSubmitting }) => (
                <Form className={styles.filter_container}>
                    <Field type="text" name="term" className={styles.users_nameFilter}/>
                    <Field name="friend" as="select" className={styles.users_subscribeFilter}>
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting} className={styles.users_filterBtn}>
                        Submit
                    </button>
                </Form>
            )}
     </Formik>
    </div>
})
