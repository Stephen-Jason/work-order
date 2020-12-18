import { useState } from 'react'

const NewTechnician = () => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    let technicians = JSON.parse(localStorage.getItem('technicians'));

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'technicianInputName') {
            setName(value);
        }
        else if (name === 'technicianInputSurname') {
            setSurname(value);
        }
    }

    const handleClick = () => {
        if(name && surname)
    }

    return (
        <div>
            <div className='newTechnicianCon'>
                <div>
                    <label>NAME :</label>
                    <input
                        type='text'
                        name='technicianInputName'
                        className='technicianInput'
                        value={name}
                        onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>SURNAME :</label>
                    <input
                        type='text'
                        name='technicianInput'
                        className='technicianInputSurname'
                        value={surname}
                        onChange={(e) => handleChange(e)} />
                </div>
            </div>
        </div>
    )
}

export default NewTechnician;