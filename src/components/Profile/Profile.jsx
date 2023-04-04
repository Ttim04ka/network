import React from 'react';
import MyPost from './MyPosts/MyPost';
import profile from './Profile.module.css'
const Profile=(props)=>{
    return(
      <div className={profile.main}>
          <div>
            <img className={profile.main_img} src="https://wallpapersprinted.com/download/2/mountain_road_scenery-wallpaper-3840x2400.jpg"></img>
          </div>
          <div>ava</div>
          <MyPost addPosts={props.posts} newMessage={props.new}/>
      </div>
    )
}

export default Profile;