import React, {useState, useEffect} from 'react';

const ToDos = () => {
    const [todos, setTodos] = useState(()=>{
        return localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []
    });

    useEffect(() => {
        console.log(todos);
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])


    const active = () => {
        document.querySelector('.todos_content').classList.toggle('todos_content_active');
        
    }
    const addTodo = (e) => {
        e.preventDefault();
        let todo = document.querySelector('.toDoInput');

        setTodos([{
            todo : todo.value,
            finished : false
        }, ...todos]);
        todo.value = '';
    }
    const deleteTodo = (i) => {
        setTodos(todos.filter((todo, index) => index !== i));
    }

    const setFinish = (i) => {

        setTodos(todos.map((todo, index) =>{
            if(index === i){
                todo.finished = !todo.finished
            }
            return todo
        }));

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
                        {todos.length > 0 && todos.map((todo, i) => (
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