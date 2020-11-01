export const myHomeDataDispatch = (state, action) =>{
    switch(action.type){
        case 'ADD_SHORTCUT_LINK':
            return {
                ...state,
                shortcut_links: [action.data, ...state.shortcut_links]
            }
        case 'DELETE_SHORTCUT_LINK':
            return{
                ...state,
                shortcut_links : state.shortcut_links.filter((shortcut, i) => i !== action.data)
            }
        case 'ADD_TODOS':
            return {
                ...state,
                todos : [action.data, ...state.todos]
            }
        case 'DELETE_TODOS':
            return{
                ...state,
                todos : state.todos.filter((todo, i) => i !== action.data)
            }
        case 'IS_TODO_FINISH':
            return{
                ...state,
                todos : state.todos.map((todo, i) => {
                    if(i === action.data){
                        todo.finished = !todo.finished

                    }
                    return todo
                })
            }
        case 'SET_BACKGROUND':
            return{
                ...state,
                background : action.data
            }
        case 'SET_USER':
            return{
                ...state,
                user : action.data
            }
        case 'SET_COLOR':
            return{
                ...state,
                color : action.data
            }
        
        
        default:
            return state
    }
}