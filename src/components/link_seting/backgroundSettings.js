import React, {useState, useContext} from 'react';
import { MYHOME } from '../context/myHomeData';

const BackgroundSetting = () => {
    const {myHome, dispatch} = useContext(MYHOME);

    const background = (e) => {
        e.preventDefault();
        let file = document.querySelector('.fileInput');
        let reader = new FileReader();
        reader.addEventListener('load', ()=>{
            dispatch({type : 'SET_BACKGROUND', data : reader.result})
        })
        reader.readAsDataURL(file.files[0]);
    }
    const color = (e) => {
        dispatch({type : 'SET_COLOR', data : e.target.value})
    }

    const changeUsername = (e) => {
        e.preventDefault();
        let newUser = document.querySelector('#userField');
        if(newUser.value){
            dispatch({type: 'SET_USER', data : newUser.value})
            newUser.value = '';
        }
    }
    return ( 
        <div className='options'>
            <div className='background_options'>
                <p>Background:</p>
                <form onSubmit={background} className='customForm'>
                    <input className='fileInput' required={true} type='file' multiple={false} accept="image/x-png,image/gif,image/jpeg" />
                    <input type='submit' value='Save' />
                    <button onClick={() => dispatch({type : 'SET_BACKGROUND', data : 'default'})} type='button'>default</button>
                </form>
            </div>
            <div>
                <label htmlFor='userField'>
                    <form onSubmit={changeUsername}>
                        User
                        <input id='userField' type='text' placeholder={myHome.user}/>
                    </form>
                </label>
            </div>
            <div >
                <label className='color' htmlFor='colorField'>
                    Font Color
                    <input onChange={color} id='colorField' type="color" value={myHome.color}></input>
                </label>
            </div>
        </div>
     );
}
 
export default BackgroundSetting;