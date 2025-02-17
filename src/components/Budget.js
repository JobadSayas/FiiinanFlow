import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../components/Utilities';


const Budget = ({ budget }) =>  {

    //Abrir menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    //Cambiar nombre
    const [budgetName, setbudgetName] = useState(budget.nombre);
    

    //CHANGE NAME
    const handleChangeName = () => {
        const newName = prompt("New budget name");
        setbudgetName(newName);
    };


    //NAVEGACION
    const navigate = useNavigate();

    const handleButtonClick = () => {
        // Navigate with parameters
        const icon = budget.icono;
        const budgetParam = budgetName;
        const params = { budget: budgetParam };
        const queryParams = new URLSearchParams(params).toString();
        navigate(`/records?${queryParams}`, { state: { icon } });
    };


    //DISTRIBUITE
    const handleDistribuite = () =>{

        let answer = prompt("Enter 1 to use current date or enter specific date\nYYYY-MM-DD");
        let selectedDate = "";
        
        if(answer!==null){
            if(answer==="1"){
                const date = new Date();
                //This because the time was coming in UTD, to transform to CST
                const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
                // Transforms the date in the right format YYYY-MM-DDTHH:MM
                selectedDate = localDate.toISOString().slice(0, 16);
            }
            else{
                selectedDate = `${answer}T12:00`;
            }
            
            axios.get(`${API_URL}/NEWdistribuite.php?budget=${budgetName}&amount=${budget.reparticion}&date=${selectedDate}`)
            .then(response => {
                console.log('API response:', response.data);
                window.location.reload();
            })
            .catch(error => {
                console.error('There was a problem with the request:', error);
            });
        }
    };


    return (

        <li key={budget.id} apartado={budgetName} tipo="semanal" reparticion="0">

            <div className="info" onClick={handleButtonClick}>
                <div className="nombre">
                    <i className={budget.icono}></i> {budgetName}
                </div>
                <div className={`saldo ${budget.saldo < 0 ? "red" : ""}`}>${ budget.saldo }</div>
            </div>

            {/* <i className="transaction fas fa-plus-circle disabled"></i> */}

            <div className="opciones" onClick={() => setIsMenuOpen(!isMenuOpen) }>
                <i className="fas fa-ellipsis-v" ></i>
                {isMenuOpen && (
                    <ul className='border border-gray-700'>
                        <li className="disabled">Transfer</li>
                        {budget.reparticion !== "0" && 
                        <li onClick={handleDistribuite}>Distribute ${budget.reparticion}</li>
                        }
                        <li className="disabled" onClick={handleChangeName}>Change Name</li>
                        <li className="disabled">Change Repartition</li>
                        <li className="disabled">Hide</li>
                    </ul>
                )}
            </div>
        </li>

    );
  
}

export default Budget;