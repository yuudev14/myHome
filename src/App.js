import React, {useState, useEffect} from 'react';
import LinkSetting from './components/link_seting/link_setting';
import Main from './components/main/main';
import ToDos from './components/todos/todos';
import './styles/main.scss';
import defaultImage from './assets/city.jpg';

const App = () => {

  const [settings, setSettings] = useState(()=>{
    return localStorage.getItem('myHomeSettings') ? JSON.parse(localStorage.getItem('myHomeSettings')) : {
      user : 'user',
      color : '#FFFFFF',
      background : 'default'
    }
  });
  

  useEffect(()=>{
    localStorage.setItem('myHomeSettings', JSON.stringify(settings));
    document.querySelector('main').style.background = `url(${settings.background !== 'default' ? settings.background : defaultImage}) center center no-repeat fixed`;
    document.querySelector('main').style.backgroundSize = 'cover';
    document.querySelector('.main_section').style.color = settings.color;

  },[settings]);

  const setUser = (value) => {
    setSettings({
      ...settings,
      user : value
    })
  }
  const setColor = (value) => {
    setSettings({
      ...settings,
      color : value
    })

  }

  const setBackground = (value) => {
    setSettings({
      ...settings,
      background : value
    });


  }
  return (
    <div className="App">
      <main>
        <LinkSetting setBackground={setBackground} settings={settings} setColor={setColor} setUser={setUser}/>
        <Main user={settings.user}/>
        <ToDos />
      </main>
    </div>
  );
}

export default App;
