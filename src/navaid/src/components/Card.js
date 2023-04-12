import '../index.css'

function Card(props) {
    const classes = 'card ' + props.className
    return <div className="bg-light-secondary p-8 my-8 w-11/12 shadow-lg rounded-lg max-w-3xl mx-auto">{props.children}</div>
}

export default Card