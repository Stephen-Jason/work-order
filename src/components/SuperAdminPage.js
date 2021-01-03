import { useState, useEffect } from 'react'
import NewTechnician from './NewTechnician'
import WorkOrders from './WorkOrders';
import Technicians from './Technicians'

const SuperAdminPage = (props) => {

    const [tab, setTab] = useState('Home');

    useEffect(()=>{
        document.querySelectorAll('.option').forEach(item=> item.addEventListener('click', ()=>{
            setTab(item.childNodes[0].innerHTML);
        }))
    });

    return (
        <div>
            <header className='pageHeader'>
                <p className='pageHeaderText'>{props.name}</p>
                <div className='logoutCon'>
                    <img className='logoutPic' alt='logout' />
                    <button>Logout</button>
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
                    <div className='option'>
                        <p>Edit Job Orders</p>
                    </div>
                    <div className='option'>
                        <p>New Users</p>
                    </div>
                    <div className='option'>
                        <p>View Users History</p>
                    </div>
                </div>
                : tab === 'New Technician' ?
                    <div>
                        <button onClick={()=>setTab('Home')}>Go Back</button>
                        <NewTechnician/>
                    </div> 
                    : tab === 'Technicians' ?
                    <div>
                        <button onClick={()=>setTab('Home')}>Go Back</button>
                        <Technicians/>
                    </div> 
                    : tab === 'View Job Orders' ?
                    <div>
                        <button onClick={()=>setTab('Home')}>Go Back</button>
                        <WorkOrders/>
                    </div> 
                    : tab === 'Edit Job Orders' ?
                    <div>
                        <button onClick={()=>setTab('Home')}>Go Back</button>
                        <p>Edit Job Orders</p>
                    </div> 
                    : tab === 'New Users' ?
                    <div>
                        <button onClick={()=>setTab('Home')}>Go Back</button>
                        <p>New Users</p>
                    </div> 
                    : tab === 'View Users History' ?
                    <div>
                        <button onClick={()=>setTab('Home')}>Go Back</button>
                        <p>View Users History</p>
                    </div> 
                    : null}
        </div>
    )
}

export default SuperAdminPage;