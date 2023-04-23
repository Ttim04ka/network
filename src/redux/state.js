import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";

let navItems={
    _state:{
        dialogsPage:{
            dialogs:[{name:"Timur",id:1},{name:"Nikita",id:1},{name:"Lexa",id:1},{name:"Kirill",id:1},{name:"Matwey",id:1}],
            messages:[{name:"Hi",id:1},{name:"Hello",id:1},{name:"Privet",id:1},{name:"Arigato",id:1}],
            newMessageBody:"wadawd"
        },
        navPage:{
            items:['Profile','Messages','News','Music','Settings']
        },
        profilePage:{
            postMessage:[{id:0,message:"Hi"}],
            newPostText:'it-kamasutra'
        }
        
    },
    getState(){
        return this._state;
    },
    subscribe(observer){
        this.renderEntireThree=observer;
    },
    renderEntireThree(){},
    dispatch(action){
        this._state.profilePage=profileReducer(this._state.profilePage,action);
        this._state.dialogsPage=dialogsReducer(this._state.dialogsPage,action);
        this.renderEntireThree();
    }

    
}




export default navItems;





 

