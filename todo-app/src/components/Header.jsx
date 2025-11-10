export function Header(props){
    const {todos} = props
    const len = todos.length
    const isTaskPlural = len>1
    return(
        <header>
            <h1 className="text-gradient">You have {len} open {isTaskPlural ? 'tasks' : 'task'}.</h1>
        </header>
    )
}