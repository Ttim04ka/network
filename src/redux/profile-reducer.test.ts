import profileReducer, { actions, ProfileType }  from "./profile-reducer";


test('new post should be added', () => {
    let state={
        postMessage:[{id:0,message:"Hi"}]as Array<ProfileType>,
        newPostText:'it-kamasutra',
        profile:null as any,
        status:"" as string,
        photoURL:'' as string
    };
    let action=actions.addPostActionCreator("Tima");
    let newState=profileReducer(state,action)
    expect(newState.postMessage.length).toBe(2)
    expect(newState.postMessage[1].message).toBe("Tima")
  });
test('new post should be deleted', () => {
let state={
    postMessage:[{id:0,message:"Hi"}],
    newPostText:'it-kamasutra',
    profile:null,
    status:"",
    photoURL:'' as string
};
let action=actions.deletePost(0);
let newState=profileReducer(state,action)
expect(newState.postMessage.length).toBe(0)
});