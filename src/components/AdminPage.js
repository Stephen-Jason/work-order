import {useState} from 'react'
import logout from '../logout.png'

const AdminPage = (props) => {

    const [tab, setTab] = useState('Work Orders');

    const handleClick = (e) => {
        const {name, value, innerHTML} = e.target;
        if(name === 'tab'){
            setTab(innerHTML);
            console.log(innerHTML);
        }
    }

    return (
        <div>
            <header className='pageHeader'>
                <p className='pageHeaderText'>{props.name}</p>
                <div className='logoutCon'>
                    <img className='logoutPic' src={logout} alt='logout'/>
                    <button>Logout</button>
                </div>
            </header>
            <nav className='navTabsCon'>
                <div className='navTab' name='tab' onClick={(e)=>handleClick(e)}>Work Orders</div>
                <div className='navTab' name='tab' onClick={(e)=>handleClick(e)}>Technicians</div>
                <div className='navTab' name='tab' onClick={(e)=>handleClick(e)}>Customers</div>
                <div className='navTab' name='tab' onClick={(e)=>handleClick(e)}>New Work Order</div>
                <div className='navTab' name='tab' onClick={(e)=>handleClick(e)}>New Customer</div>
                <div className='navTab' name='tab' onClick={(e)=>handleClick(e)}>New Technician</div>
            </nav>
        </div>
    )
}

export default AdminPage;