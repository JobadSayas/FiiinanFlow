import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {API_URL} from '../components/Utilities';

export default ({record, onClose, mode}) => {

    //FORMAT DATE
    // Convert the date string to a Date object
    const date = new Date(record.fecha_mov);
    //This because the time was coming in UTD, to transform to CST
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    // Transforms the date in the right format YYYY-MM-DDTHH:MM
    const formatedDate = localDate.toISOString().slice(0, 16); 


    //METHODS

    const [methods, setMethods] = useState([]);

    useEffect(() => {
        const fetchMethods = async () => {
        try {
            const response = await axios.get(`${API_URL}/methods-consult.php`);
            setMethods(response.data);
        } catch (error) {
            console.error('Error fetching methods:', error);
        }
        };

        fetchMethods();
    }, []);


    //APARTADOS

    const [apartados, setApartados] = useState([]);

    useEffect(() => {
        const fetchMethods = async () => {
        try {
            const response = await axios.get('https://finanzas.visssible.com/backend/apartados-consultar.php');
            setApartados(response.data);
        } catch (error) {
            console.error('Error fetching methods:', error);
        }
        };

        fetchMethods();
    }, []);


    //TRANSACTION TYPE
    // Function to handle button click and update theRecord.type
    const handleTypeButtonClick = (type) => {
        setUpdatedRecord({
        ...updatedRecord,
        tipo: type
        });
    };


    //SUBMIT CHANGES NEW AND EXISTING RECORDS

    // Function to handle form submit
    const handleSubmit = (e) => {
        //Prevent default so that I can put my own functionallity
        e.preventDefault();

        //NEW EXPENSE
        console.log('New expense sent');


        //NEW INCOME
        console.log('New income sent');


        //EDIT EXPENSE
        console.log('Edited expense sent');


        //EDIT INCOME
        console.log('Edited income sent');


        // Pass updated record to parent component
        onClose(updatedRecord);
    };


    //UPDATE RECORD IN PARENT COMPONENT
    const [updatedRecord, setUpdatedRecord] = useState({ ...record });

    // Function to handle input change
    const handleInputChange = (e) => {
        setUpdatedRecord({
            ...updatedRecord,
            [e.target.name]: e.target.value
        });
    };
        

    return (

        <div id="transaction" className={`pantalla modal ${updatedRecord.tipo} ${mode}`}> 
            <div className="centrar">
                <form className="modal-holder" onSubmit={handleSubmit}>

                    <ul className="tabs">
                        <li className="expense left" onClick={() => handleTypeButtonClick('gasto')}>Expense</li>
                        <li className="income right" onClick={() => handleTypeButtonClick('ingreso')}>Income</li>
                        <li className="modify full">Modify</li>
                    </ul>

                    <div className="body">

                        <div className="form-group col-2 col-first">
                            <label>Amount 1</label>
                            <div className="input-group">
                            <span className="input-group-addon">$</span>
                            <input type="number" name="cantidad" className="cantidad form-control input-lg" value={updatedRecord.cantidad || ''} onChange={handleInputChange} />
                            </div>
                            <div id="remaining">Remaining: <span className="budget">$0.00</span> </div>
                        </div>

                        <div id="apartado-holder" className="form-group col-2">
                            <label>Budget</label>
                            <select className="apartados input-lg form-control" name="apartado" value={updatedRecord.apartado || ''} onChange={handleInputChange} >
                                <option></option>
                                {apartados.map((apartado) => (
                                <option key={apartado.id} value={apartado.nombre}>
                                    {apartado.nombre}
                                </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <input className="descripcion input-lg form-control" name="descripcion" type="text" value={updatedRecord.descripcion || ''} onChange={handleInputChange} />
                        </div>

                        <div id="method-holder" className="form-group col-2 col-first">
                            <label>Method</label>
        

                            <select className="method input-lg form-control" name="method" value={updatedRecord.method || ''} onChange={handleInputChange}>
                                <option></option>
                                {methods.map((method) => (
                                <option key={method.id} value={method.nombre}>
                                    {method.nombre}
                                </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group col-2">
                            <label>Date</label>
                            <input className="fecha input-lg form-control" name="fecha" type="datetime-local" fecha={formatedDate} value={formatedDate || ''} onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="footer">
                        <div className="cancel btn btn-lg btn-default" onClick={onClose}>Cancel</div>
                        <button className={`btn btn-lg ${updatedRecord.tipo === 'gasto' ? 'btn btn-danger' : 'btn-success'}`} type="submit">Save</button>
                    </div>

                </form>
            </div>
        </div>
    );
};