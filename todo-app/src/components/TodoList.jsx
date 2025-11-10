import { TodoCard } from "./TodoCard"

export function TodoList(props) {
    const { todos,selectedTab, handleCompleteTodo,handleDeleteTodo } = props

    const filterTodoList = selectedTab === 'All' ? todos : selectedTab === 'Open' ? todos.filter(val => !val.complete) : todos.filter(val => val.complete)

    return (
        <>
            {filterTodoList.map((todo, todoIndex) => {
                return (
                    <TodoCard key={todoIndex} todoIndex={todos.findIndex(val => val.input == todo.input)} todo={todo}  {...props}/>
                )
            })}
        </>
    )
}