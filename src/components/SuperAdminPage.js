import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import NewTechnician from './NewTechnician'
import WorkOrders from './WorkOrders';
import Technicians from './Technicians'
import logout from '../logout.png'

const SuperAdminPage = (props) => {

    const [tab, setTab] = useState('Home');
    let history = useHistory();

    useEffect(() => {
        document.querySelectorAll('.option').forEach(item => item.addEventListener('click', () => {
            setTab(item.childNodes[0].innerHTML);
        }))
    });

    return (
        <div>
            <header className='pageHeader'>
                <p className='pageHeaderText'>{props.name}</p>
                <div className='logoutCon'>
                    <img className='logoutPic' src={logout} alt='logout' />
                    <button
                        onClick={() => history.push('/')}>Logout</button>
                </div>
            </header>
            {tab === 'Home' ?
                <div className='optionsCon'>
                    <div className='option'>
                        <p>New Technician</p>
                    </div>
                    <div className='option'>
                        <p>Technicians</p>
                    </div>
                    <div className='option'>
                        <p>View Job Orders</p>
                    </div>
                </div>
                : tab === 'New Technician' ?
                    <div>
                        <button onClick={() => setTab('Home')}>Go Back</button>
                        <NewTechnician />
                    </div>
                    : tab === 'Technicians' ?
                        <div>
                            <button onClick={() => setTab('Home')}>Go Back</button>
                            <Technicians />
                        </div>
                        : tab === 'View Job Orders' ?
                            <div>
                                <button onClick={() => setTab('Home')}>Go Back</button>
                                <WorkOrders />
                            </div>
                            : null}
        </div>
    )
}

export default SuperAdminPage;