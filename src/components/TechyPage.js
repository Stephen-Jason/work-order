import { useHistory } from 'react-router-dom'
import logout from '../logout.png'
import TechWorkOrders from './TechWorkOrders'

const TechyPage = (props) => {

    let history = useHistory();

    return (
        <div>
            <header className='pageHeader'>
                <p className='pageHeaderText'>{props.name}</p>
                <div className='logoutCon'>
                    <img className='logoutPic' src={logout} alt='logout' />
                    <button
                    onClick={()=>history.push('/')}>Logout</button>
                </div>
            </header>
            <nav className='navTabsCon'>
                <p className='navTab tabClicked' name='tab'>Work Orders<span className='navTabArrow tabClicked'></span></p>
            </nav>
            <TechWorkOrders name={props.name} />
        </div>
    )
}

export default TechyPage;