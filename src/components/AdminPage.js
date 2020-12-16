import { useState, useEffect } from 'react'
import logout from '../logout.png'
import NewCustomer from './NewCustomer'
import Customers from './Customers'

const AdminPage = (props) => {

    const [tab, setTab] = useState('Work Orders');

    useEffect(() => {
        const tabs = document.querySelectorAll('.navTab');
        const tabArrows = document.querySelectorAll('.navTabArrow');
        tabs.forEach(item => item.addEventListener('click', (e) => { tabEvents(e, tabs, tabArrows, item) }));
        
    });

    const tabEvents = (e, tabs, tabArrows, item) => {
        setTab(e.target.innerText);
        let tabArrow = item.children;
        tabs.forEach(item => item.classList.remove('tabClicked'));
        tabArrows.forEach(item => item.classList.remove('tabClicked'));
        e.target.classList.add('tabClicked');
        tabArrow[0].classList.add('tabClicked');
    }



return (
    <div>
        <header className='pageHeader'>
            <p className='pageHeaderText'>{props.name}</p>
            <div className='logoutCon'>
                <img className='logoutPic' src={logout} alt='logout' />
                <button>Logout</button>
            </div>
        </header>
        <nav className='navTabsCon'>
            <p className='navTab' name='tab'>Work Orders<span className='navTabArrow'></span></p>
            <p className='navTab' name='tab'>Technicians<span className='navTabArrow'></span></p>
            <p className='navTab' name='tab'>Customers<span className='navTabArrow'></span></p>
            <p className='navTab' name='tab'>New Work Order<span className='navTabArrow'></span></p>
            <p className='navTab' name='tab'>New Customer<span className='navTabArrow'></span></p>
            <p className='navTab' name='tab'>New Technician<span className='navTabArrow'></span></p>
        </nav>
        {tab === 'Work Orders' ? <p>work orders page</p> : tab === 'Technicians' ? <p>technicians page</p> : tab === 'Customers' ? <Customers/> : tab === 'New Work Order' ? <p>new work orders page</p> : tab === 'New Customer' ? <NewCustomer/> : tab === 'New Technician' ? <p>new technician page</p> : null}
    </div>
)
}

export default AdminPage;