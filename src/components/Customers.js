
const Customers = () => {

    const customers = JSON.parse(localStorage.getItem('customers'));

    return (
        <div>
            {customers ? customers.map(item =>
                <div className='customerCon'>
                    <p className='customerInfo'>NAME: {item.name}</p>
                    <p className='customerInfo'>SURNAME: {item.surname}</p>
                    <p className='customerInfo'>TELEPHONE: {item.telephone}</p>
                    <p className='customerInfo'>ADDRESS: {item.address}</p>
                    <p className='customerInfo'>SIGN UP DATE: {item.signUpDate}</p>
                    <p className='customerInfo'>CUSTOMER ID: {item.id}</p>
                </div>) : <h1>no customers yet</h1>}
        </div>
    )
}

export default Customers;