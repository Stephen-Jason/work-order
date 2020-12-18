import { useParams } from 'react-router-dom'

const CustomerDetails = (props) => {

    const { id } = useParams();

    let customers = JSON.parse(localStorage.getItem('customers'));
    let workOrders = JSON.parse(localStorage.getItem('workOrders'));

    let customerWorkOrders;
    workOrders ? customerWorkOrders = workOrders.filter(item => item.customerId === parseInt(id)) : customerWorkOrders = false;
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
                <div className='workOrderCon'>
                    <p className='workOrderInfo'>DATE RECEIVED: {item.dateContacted}</p>
                    <p className='workOrderInfo'>DATE CREATED: {item.dateCreated}</p>
                    <p className='workOrderInfo'>TECHNICIAN: {item.assignedTechnician}</p>
                    <p className='workOrderInfo'>DESCRIPTION: {item.workOrderDescription}</p>
                    <p className='workOrderInfo'>WORK ORDER ID: {item.workOrderId}</p>
                </div>) : <p>No Work Orders for this customer</p>}
        </div>
    )
}

export default CustomerDetails;