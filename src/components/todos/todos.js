import React, {useState, useEffect, useContext} from 'react';
import { MYHOME } from '../context/myHomeData';

const ToDos = () => {
    const {myHome, dispatch} = useContext(MYHOME);

    const active = () => {
        document.querySelector('.todos_content').classList.toggle('todos_content_active');
        
    }
    const addTodo = (e) => {
        e.preventDefault();
        let todo = document.querySelector('.toDoInput');
        if(todo.value !== ''){
            dispatch({type: 'ADD_TODOS', data : {todo : todo.value, finished : false}})
            todo.value = '';
        }
    }
    const deleteTodo = (i) => {
        dispatch({type: 'DELETE_TODOS', data : i});
    }

    const setFinish = (i) => {
        dispatch({type: 'IS_TODO_FINISH', data : i});
    }
    return ( 
        <section className='todos_section'>
           
            <div className='todos_content'>
                <i onClick={active} className ='fa fa-pencil-square-o'></i>
                <div className='todo_form'>
                    <form onSubmit={addTodo}>
                        <button>+</button>
                        <input className='toDoInput' type='text' placeholder='  Add Todos' />
                    </form>
                    <ul>
                        {myHome.todos !== undefined && myHome.todos.map((todo, i) => (
                            <li key={i}>
                                <label>
                                    <span className={`checkbox ${todo.finished === false ? '' : 'finish_span'}`} ></span>
                                    <p className={`${todo.finished === false ? '' : 'finish_p'}`} onClick={() => setFinish(i)}>{todo.todo}</p>
                                </label>
                                <button onClick={() => deleteTodo(i)} className='fa fa-trash'></button>                        
                            </li>

                        ))}
                        
                    </ul>
                    
                </div>

            </div>

        

        </section>
     );
}
 
export default ToDos;