import React from 'react';
import post from './Post.module.css'
const Post=(props)=>{
    return(
        <div className={post.red}>{props.message}</div>
    )
}

export default Post;