import React, {useState, useContext} from 'react';
import url from '../../assets/url.png'
import { MYHOME } from '../context/myHomeData';

const LinkSetting = ({setColor}) => {
    const {myHome, dispatch} = useContext(MYHOME);
    const changeUsername = (e) => {
        e.preventDefault();
        let newUser = document.querySelector('#userField');
        // setUser(newUser.value);
        dispatch({type: 'SET_USER', data : newUser.value})
        newUser.value = ''

    }
    const active = () => {
        document.querySelector('.links-option_container').classList.toggle('links-option_active')
    }
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

    const addLinkExpand = (e) => {
        e.target.parentElement.classList.toggle('add_link_expand');
        e.target.classList.toggle('addLinkActive');
        e.target.parentElement.lastChild.classList.toggle('activeForm');
    }

    const addLink = (e) => {
        e.preventDefault();
        const name = document.querySelector('.linkName');
        const url = document.querySelector('.linkURL');
        dispatch({type: 'ADD_SHORTCUT_LINK', data : {name : name.value, url : url.value, icon : ''}});
        name.value = '';
        url.value = ''
        document.querySelector('.add_link').classList.remove('add_link_expand');
        document.querySelector('.add_link form').classList.remove('activeForm');
        document.querySelector('.add_link h3').classList.remove('addLinkActive')
    }

    const showShortcutOptions = (e) => {
        // console.log(e.nextSibling)
        e.target.nextSibling.classList.toggle('shortcutOptionsActive');
    }
    return ( 
        <section className='links-option_section'>
            <div className='links-option_container'>
                <i onClick={active} className='fa fa-bars'></i>
                <div className='links-option_content'>
                    <div className='links'>
                        <div className='add_link'>
                            <h3 onClick={addLinkExpand}>Add Shortcut</h3>
                            <form onSubmit={addLink}>
                                <label>
                                    Name
                                    <input className='linkName' type='text' required={true}/>
                                </label>

                                <label>
                                    URL
                                    <input className='linkURL' type='url' required={true} />
                                </label>

                                <input type='submit' />
                            </form>
                            
                        </div>
                        {myHome !== undefined && myHome.shortcut_links.map((shortcut, i) => (
                            
                                <div className='shortcuts'>
                                    
                                    <a href={shortcut.url} target='_blank'>
                                        <img src={'https://www.google.com/s2/favicons?domain=' + shortcut.url}/>
                                        {/* <i rel="icon" href={shortcut.url} /> */}
                                        <p>{shortcut.name}</p>
                                        
                                    </a>
                                    <i onClick={showShortcutOptions} className='fa fa-ellipsis-h'></i>
                                    <div className='shortcutOptions'>
                                        <ul>
                                            <li onClick={() => dispatch({type:'DELETE_SHORTCUT_LINK', data : i})}>Delete</li>
                                        </ul>
                                    </div>
                                </div>
                            

                        ))}

                    </div>
                    <div className='options'>
                        <div className='background_options'>
                            <p>Background:</p>
                            <form onSubmit={background} className='customForm'>
                                <input className='fileInput' required={true} type='file' multiple={false} accept="image/x-png,image/gif,image/jpeg" />
                                <input type='submit' />
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
                        <div>
                            <label htmlFor='colorField'>
                                Font Color
                                <input onChange={color} id='colorField' type="color" value={myHome.color}></input>
                            </label>
                        </div>
                    </div>

                </div>
            </div>


        </section>
     );
}
 
export default LinkSetting;