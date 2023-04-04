import React from 'react';
import post from './Post.module.css'
type IProps={
    message:string
}
const Post:React.FC<IProps>=(props)=>{
    return(
        <div className={post.red}>{props.message}</div>
    )
}

export default Post;