import {useHistory} from 'react-router-dom'

const Customers = () => {

    const customers = JSON.parse(localStorage.getItem('customers'));
    let history = useHistory();

    const handleClick = (id) => {
        history.push(`/customerDetails/${id}`);
    }

    return (
        <div>
            {customers ? customers.map(item =>
                <div className='customerCon' key={item.id}>
                    <p className='customerInfo'>NAME: {item.name}</p>
                    <p className='customerInfo'>SURNAME: {item.surname}</p>
                    <p className='customerInfo'>TELEPHONE: {item.telephone}</p>
                    <p className='customerInfo'>ADDRESS: {item.address}</p>
                    <p className='customerInfo'>SIGN UP DATE: {item.signUpDate}</p>
                    <p className='customerInfo'>CUSTOMER ID: {item.id}</p>
                    <button 
                    className='customerDetailsBtn'
                    onClick={()=>handleClick(item.id)}>Details</button>
                </div>) : <h1>no customers yet</h1>}
        </div>
    )
}

export default Customers;