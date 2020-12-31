import { useState } from 'react'

const NewTechnician = () => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [startDate, setStartDate] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    let technicians = JSON.parse(localStorage.getItem('technicians'));

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'technicianInputName') {
            setName(value);
        }
        else if (name === 'technicianInputSurname') {
            setSurname(value);
        }
        else if (name === 'techncicianStartDate') {
            setStartDate(value);
        }
    }

    const handleClick = () => {
        if (name && surname && startDate) {
            setErrorMessage(false);
            if (technicians) {
                let techniciansList = [...technicians];
                let length = techniciansList.length;
                techniciansList.push({
                    name: name,
                    surname: surname,
                    startDate: startDate,
                    id: length + 1
                });
                localStorage.setItem('technicians', JSON.stringify(techniciansList));
                setSuccessMessage(`${name} was added to the system`);
                setName('');
                setSurname('');
                setStartDate('');
            }
            else {
                let techniciansList = [];
                techniciansList.push({
                    name: name,
                    surname: surname,
                    startDate: startDate,
                    id: 1
                });
                localStorage.setItem('technicians', JSON.stringify(techniciansList));
                setSuccessMessage(`${name} was added to the system`);
                setName('');
                setSurname('');
                setStartDate('');
            }
        }
        else {
            setErrorMessage('Please fill out all fields and select a date');
        }
    }

    return (
        <div>
            {errorMessage ? <div className='error'>{errorMessage}</div> : null}
            {successMessage ? <div className='addedTechnicianMessage'>{successMessage}</div> : null}
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
                        name='technicianInputSurname'
                        className='technicianInputSurname'
                        value={surname}
                        onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>START DATE :</label>
                    <input
                        type='DATE'
                        name='techncicianStartDate'
                        className='techncicianStartDate'
                        value={startDate}
                        onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <button
                        className='addTechnicianBtn'
                        name='addTechnician'
                        onClick={(e) => handleClick(e)}>Add Technician</button>
                </div>
            </div>
        </div>
    )
}

export default NewTechnician;