import { useParams,useHistory } from 'react-router-dom'

const CustomerDetails = (props) => {

    const { id } = useParams();
    let history = useHistory();

    let customers = JSON.parse(localStorage.getItem('customers'));
    let workOrders = JSON.parse(localStorage.getItem('workOrders'));

    let customerWorkOrders;
    workOrders ? customerWorkOrders = workOrders.filter(item => item.customerId === parseInt(id)) : customerWorkOrders = false;
    let customer = customers.filter(item => item.id === parseInt(id));

    const getCustomerInfo = (id) => {
        let customer = customers.filter(item => item.id === id);
        return customer[0];
    }

    return (
        <div>
            <button
            onClick={()=>history.goBack()}>Go Back</button>
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
                <div className='workOrderCon' key={item.workOrderId}>
                <div>
                    <label>CUSTOMER</label>
                    <p className='workOrderInfo'>{getCustomerInfo(item.customerId).name} {getCustomerInfo(item.customerId).surname}</p>
                </div>
                <div>
                    <label>CUSTOMER ID</label>
                    <p className='workOrderInfo'>{item.customerId}</p>
                </div>
                <div>
                    <label>DATE RECEIVED</label>
                    <p className='workOrderInfo'>{item.dateContacted}</p>
                </div>
                <div>
                    <label>DATE CREATED</label>
                    <p className='workOrderInfo'>{item.dateCreated}</p>
                </div>
                <div>
                    <label>TECHNICIAN</label>
                    <p className='workOrderInfo'>{item.assignedTechnician}</p>
                </div>
                <div>
                    <label>DESCRIPTION</label>
                    <p className='workOrderInfo'>{item.workOrderDescription}</p>
                </div>
                <div>
                    <label>WORK ORDER ID</label>
                    <p className='workOrderInfo'>{item.workOrderId}</p>
                </div>
                <div>
                    <label>STATUS</label>
                    <p className='workOrderInfo'>{item.status}</p>
                </div>
                <div>
                    <label>TECHNICIAN CLAIMED</label>
                    <p className='workOrderInfo'>{item.techClaimed === 'Claimed' ? 'YES' : 'NO'}</p>
                </div>
            </div>) : <p>No Work Orders for this customer</p>}
        </div>
    )
}

export default CustomerDetails;