import { useParams } from 'react-router-dom'

const CustomerDetails = (props) => {

    const { id } = useParams();

    let customers = JSON.parse(localStorage.getItem('customers'));
    let workOrders = JSON.parse(localStorage.getItem('workOrders'));

    let customerWorkOrders;
    workOrders ? customerWorkOrders = workOrders.filter(item => item.id === id) : customerWorkOrders = false;
    let customer = customers.filter(item => item.id === parseInt(id));

    return (
        <div>
            {customer.map(item =>
                <div className='customerCon' key={item.id}>
                    <p className='customerInfo'>NAME: {item.name}</p>
                    <p className='customerInfo'>SURNAME: {item.surname}</p>
                    <p className='customerInfo'>TELEPHONE: {item.telephone}</p>
                    <p className='customerInfo'>ADDRESS: {item.address}</p>
                    <p className='customerInfo'>SIGN UP DATE: {item.signUpDate}</p>
                    <p className='customerInfo'>CUSTOMER ID: {item.id}</p>
                    <button className='customerInfoEditBtn'>Edit</button>
                </div>)}
            {customerWorkOrders ? customerWorkOrders.map(item =>
                <div>
                    <p className='workOrderInfo'>NAME: {item.name}</p>
                    <p className='workOrderInfo'>SURNAME: {item.surname}</p>
                    <p className='workOrderInfo'>TELEPHONE: {item.telephone}</p>
                    <p className='workOrderInfo'>ADDRESS: {item.address}</p>
                    <p className='workOrderInfo'>SIGN UP DATE: {item.signUpDate}</p>
                    <p className='workOrderInfo'>CUSTOMER ID: {item.id}</p>
                </div>) : <p>No Work Orders for this customer</p>}
        </div>
    )
}

export default CustomerDetails;