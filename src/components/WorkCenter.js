import { useParams } from 'react-router-dom'
import AdminPage from './AdminPage';
import TechyPage from './TechyPage'

const WorkCenter = (props) => {

    const {name} = useParams();

    return (
        <div>
            {name === 'Admin' ? <AdminPage name={name}/> : <TechyPage name={name} />}
        </div>
    )
}

export default WorkCenter;