import React from 'react';
import Post from './Post/Post';
import mypost from './MyPost.module.css'
const MyPost=(props)=>{
    let newPostElem=React.createRef()
    let addPost=()=>{
        debugger;
        let text=newPostElem.current.value;
        props.newMessage(text);
        newPostElem.current.value='';
    }
    let post=props.addPosts.map(item=>{
        debugger;
       return <Post message={item.message}/>
    })
    return(
      
        <div>
            <div  className={mypost.item}>My post</div>
            <textarea ref={newPostElem} cols="9" rows="1" className={mypost.block}></textarea>
            <button onClick={addPost}>Create post</button>
            <div>New Post</div>
            <div>{post}</div>
        </div>
    )
}

export default MyPost;