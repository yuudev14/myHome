import React, {createContext, useReducer, useEffect} from 'react';
import { myHomeDataDispatch } from '../dispatch/myHomedataDispatch';
import defaultImage from '../../assets/city.jpg';

export const MYHOME = createContext()

const MyHomeData = (props) => {

    const [myHome, dispatch] = useReducer(myHomeDataDispatch, {}, () => {
        return localStorage.getItem('myHome') ? JSON.parse(localStorage.getItem('myHome')) : {
            user : 'user',
            color : '#FFFFFF',
            background : 'default',
            todos : [],
            shortcut_links : []
          }
    });

    useEffect(() => {
        localStorage.setItem('myHome', JSON.stringify(myHome));
        console.log(myHome);
        document.querySelector('main').style.background = `url(${myHome.background !== 'default' ? myHome.background : defaultImage}) center center no-repeat fixed`;
        document.querySelector('main').style.backgroundSize = 'cover';
        document.querySelector('.main_section').style.color = myHome.color;

    }, [myHome])
    return ( 
        <MYHOME.Provider value={{myHome, dispatch}}>
            {props.children}
        </MYHOME.Provider>
     );
}
 
export default MyHomeData;