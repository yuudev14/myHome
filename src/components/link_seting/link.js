import React, {useState, useContext} from 'react';
import { MYHOME } from '../context/myHomeData';

const Links = () => {

    const {myHome, dispatch} = useContext(MYHOME);

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
        e.target.nextSibling.classList.toggle('shortcutOptionsActive');
    }
    return ( 
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
                
                    <div className='shortcuts' key={i}>
                        
                        <a href={shortcut.url} target='_blank'>
                            <img src={'https://www.google.com/s2/favicons?domain=' + shortcut.url}/>
                            <p>{shortcut.name}</p>
                            
                        </a>
                        <i onClick={showShortcutOptions} className='fa fa-ellipsis-h'></i>
                        <div className='shortcutOptions'>
                            <ul>
                                <li onClick={(e) => {
                                    e.target.parentElement.parentElement.classList.toggle('shortcutOptionsActive');
                                    dispatch({type:'DELETE_SHORTCUT_LINK', data : i})}
                                    }>Delete</li>
                            </ul>
                        </div>
                    </div>
                

            ))}

        </div>
     );
}
 
export default Links;