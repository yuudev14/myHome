import React, {useState} from 'react';
import url from '../../assets/url.png'

const LinkSetting = ({setBackground, setUser, settings, setColor}) => {
    const changeUsername = (e) => {
        e.preventDefault();
        let newUser = document.querySelector('#userField');
        setUser(newUser.value);
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
            setBackground(reader.result);

        })
        
        reader.readAsDataURL(file.files[0]);
        
    }

    const color = (e) => {
        setColor(e.target.value)
    }

    const addLinkExpand = (e) => {
        e.target.parentElement.classList.toggle('add_link_expand');
        e.target.classList.toggle('addLinkActive');
        e.target.parentElement.lastChild.classList.toggle('activeForm');

    }


    return ( 
        <section className='links-option_section'>
            <div className='links-option_container'>
                <i onClick={active} className='fa fa-bars'></i>
                <div className='links-option_content'>
                    <div className='links'>
                        <div className='add_link'>
                            <h3 onClick={addLinkExpand}>Add Shortcut</h3>
                            <form>
                                <label>
                                    Name
                                    <input type='text' />
                                </label>

                                <label>
                                    URL
                                    <input type='text' />
                                </label>

                                <label>
                                    icon
                                    <input type='file' />
                                </label>

                                <input type='submit' />
                            </form>
                            
                        </div>
                        <div className='shortcuts'>
                            <i className='fa fa-ellipsis-h'></i>
                            <img src={url}/>
                            <p>Name</p>
                            <div></div>
                        </div>
                        <div className='shortcuts'>
                            <i className='fa fa-ellipsis-h'></i>
                            <img src={url}/>
                            <p>Name</p>
                            <div></div>
                        </div>
                        <div className='shortcuts'>
                            <i className='fa fa-ellipsis-h'></i>
                            <img src={url}/>
                            <p>Name</p>
                            <div></div>
                        </div>

                    </div>
                    <div className='options'>
                        <div className='background_options'>
                            <p>Background:</p>
                            <form onSubmit={background} className='customForm'>
                                <input className='fileInput' required={true} type='file' multiple={false} accept="image/x-png,image/gif,image/jpeg" />
                                <input type='submit' />
                                <button onClick={() => setBackground('default')} type='button'>default</button>
                            </form>
                        </div>
                        <div>
                            <label htmlFor='userField'>
                                <form onSubmit={changeUsername}>
                                    User
                                    <input id='userField' type='text' placeholder={settings.user}/>
                                </form>
                            </label>
                        </div>
                        <div>
                            <label htmlFor='colorField'>
                                Font Color
                                <input onChange={color} id='colorField' type="color" value={settings.color}></input>
                            </label>
                        </div>
                    </div>

                </div>
            </div>


        </section>
     );
}
 
export default LinkSetting;