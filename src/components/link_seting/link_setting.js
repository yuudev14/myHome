import React from 'react';
import BackgroundSetting from './backgroundSettings';
import Links from './link';

const LinkSetting = () => {
    const active = () => {
        document.querySelector('.links-option_container').classList.toggle('links-option_active')
    }
    return ( 
        <section className='links-option_section'>
            <div className='links-option_container'>
                <i onClick={active} className='fa fa-bars'></i>
                <div className='links-option_content'>
                    <Links />
                    <BackgroundSetting />
                </div>
            </div>
        </section>
     );
}
 
export default LinkSetting;