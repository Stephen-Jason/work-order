import { useParams, useHistory } from 'react-router-dom'

const SuperAdminWorkOrders = () => {

    const technicians = JSON.parse(localStorage.getItem('technicians'));
    const workOrders = JSON.parse(localStorage.getItem('workOrders'));

    const name = useParams();
    const history = useHistory();

    let customers = JSON.parse(localStorage.getItem('customers'));

    const getCustomerInfo = (id) => {
        let customer = customers.filter(item => item.id === id);
        return customer[0];
    }

    let curWorkOrders;
    if (technicians && workOrders) {
        curWorkOrders = workOrders.filter(item => item.assignedTechnician === name.name);
    }

    return (
        <div>
            <button onClick={()=>history.goBack()}>Go Back</button>
            {curWorkOrders ? curWorkOrders.map(item =>
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
            </div>)
                : <p>no work orders yet</p>}
        </div>
    )
}

export default SuperAdminWorkOrders;