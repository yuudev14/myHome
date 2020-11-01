import React, {useState, useEffect, useContext} from 'react';
import LinkSetting from './components/link_seting/link_setting';
import Main from './components/main/main';
import ToDos from './components/todos/todos';
import './styles/main.scss';

const App = () => {
  
  return (
    <div className="App">
        <main>
          <LinkSetting />
          <Main/>
          <ToDos />
        </main>
      
    </div>
  );
}

export default App;
