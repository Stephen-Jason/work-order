import { useState, useEffect } from 'react'
import Users from './Users'

const SuperAdminPage = (props) => {

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

    return(
        <div>
            <header className='pageHeader'>
                <p className='pageHeaderText'>{props.name}</p>
                <div className='logoutCon'>
                    <img className='logoutPic'  alt='logout' />
                    <button>Logout</button>
                </div>
            </header>
            <nav className='navTabsCon'>
                <p className='navTab tabClicked' name='tab'>Work Orders<span className='navTabArrow tabClicked'></span></p>
                <p className='navTab' name='tab'>Users<span className='navTabArrow'></span></p>
                <p className='navTab' name='tab'>Customers<span className='navTabArrow'></span></p>
            </nav>      
            {tab === 'Users' ? <Users/> : null}     
        </div>
    )
}

export default SuperAdminPage;