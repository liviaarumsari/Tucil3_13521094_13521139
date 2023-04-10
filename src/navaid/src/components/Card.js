import '../index.css'

function Card(props) {
    const classes = 'card ' + props.className
    return <div className="rounded-lg bg-gray-100 shadow-md p-4 mx-auto my-8 w-11/12 max-w-screen-lg">{props.children}</div>
}

export default Card