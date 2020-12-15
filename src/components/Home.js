import { useParams } from 'react-router-dom'

const Home = (props) => {

    const {name} = useParams();

    return (
        <div>
            <h1>home page</h1>
            <h1>{name}</h1>
        </div>
    )
}

export default Home;