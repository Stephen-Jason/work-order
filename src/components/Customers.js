import { useHistory } from 'react-router-dom'

const Customers = () => {

    const customers = JSON.parse(localStorage.getItem('customers'));
    let history = useHistory();

    const handleClick = (id, e) => {
        const { name } = e.target;
        if (name === 'customerDetailsBtn') {
            history.push(`/customerDetails/${id}`);
        }
        else if (name === 'customerEditBtn') {
            history.push(`/customerEdit/${id}`);
        }
    }

    return (
        <div>
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
                            name='customerDetailsBtn'
                            onClick={(e) => handleClick(item.id, e)}>View Work Orders</button>
                        <button
                            className='customerDetailsBtn'
                            name='customerEditBtn'
                            onClick={(e) => handleClick(item.id, e)}>Edit Customer Info</button>
                    </div>) : <h1>no customers yet</h1>}
            </div>
        </div>
    )
}

export default Customers;