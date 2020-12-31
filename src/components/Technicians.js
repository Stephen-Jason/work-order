import { useHistory } from 'react-router-dom'

const Technicians = () => {

    const technicians = JSON.parse(localStorage.getItem('technicians'));

    const history = useHistory();

    return (
        <div>
            {technicians ? technicians.map(item =>
                <div className='techCon' key={item.id}>
                    <p>{item.name}</p>
                    <p>{item.surname}</p>
                    <p>{item.startDate}</p>
                    <button onClick={()=>history.push(`/workOrders/${item.name}`)}>Work Orders</button>
                </div>) : null

            }
        </div>
    )
}

export default Technicians;