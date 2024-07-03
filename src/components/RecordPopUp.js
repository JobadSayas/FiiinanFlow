import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {API_URL} from '../components/Utilities';

const RecordPopUp = ({record, onClose, mode}) => {

    //UPDATE RECORD IN PARENT COMPONENT
    const [updatedRecord, setUpdatedRecord] = useState({ ...record });

    // Function to handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedRecord({
            ...updatedRecord,
            [name]: value
        });
    };
           
   
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
            const response = await axios.get(`${API_URL}/apartados-consultar.php`);
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
    const handleSubmit = async (e) => {
        //Prevent default so that I can put my own functionallity
        e.preventDefault();

        //NEW RECORD

        if(mode==="new"){
            try {
                const response = await axios.post(`${API_URL}/NEWtransaction.php`, updatedRecord);
                console.log('Record created successfully:', response.data);
                onClose(updatedRecord);
            } catch (error) {
                console.error('Error creating record:', error);
            }
        }


        //UPDATE RECORD

        if(mode==="update"){
            axios.put(`${API_URL}/NEWtransaction.php`, updatedRecord)
            .then(response => {
                console.log('Record updated successfully:', response.data);
                onClose(updatedRecord);
            })
            .catch(error => {
                console.error('Error updating record:', error);
                // Handle error if needed
            });
        }

    };


    return (

        <div id="transaction" className={`pantalla modal ${updatedRecord.tipo} ${mode}`}> 
            <div className="centrar">
                <form className="modal-holder" onSubmit={handleSubmit}>

                    <ul className="tabs">
                        <li className="expense left" onClick={() => handleTypeButtonClick('gasto')}>Expense</li>
                        <li className="income right" onClick={() => handleTypeButtonClick('ingreso')}>Income</li>
                    </ul>

                    <div className="body grid-holder">

                        <div className="form-group">
                            <label>Amount</label>
                            <div className="input-group">
                            <span className="input-group-addon">$</span>
                            <input type="number" name="cantidad" className="form-control input-lg" value={updatedRecord.cantidad || ''} onChange={handleInputChange} />
                            </div>
                            {/* <div id="remaining">Remaining: <span className="budget">$0.00</span> </div> */}
                        </div>

                        <div id="apartado-holder" className="form-group">
                            <label>Budget</label>
                            <select className="input-lg form-control" name="apartado" value={updatedRecord.apartado || ''} onChange={handleInputChange} >
                                <option key="0"></option>
                                {apartados.map((apartado) => (
                                <option key={apartado.id} value={apartado.nombre}>
                                    {apartado.nombre}
                                </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group grid-double">
                            <label>Description</label>
                            <input className="input-lg form-control" name="descripcion" type="text" value={updatedRecord.descripcion || ''} onChange={handleInputChange} />
                        </div>

                        <div id="method-holder" className="form-group">
                            <label>Method</label>
        

                            <select className="input-lg form-control" name="method" value={updatedRecord.method || ''} onChange={handleInputChange}>
                                <option key="0"></option>
                                {methods.map((method) => (
                                <option key={method.id} value={method.nombre}>
                                    {method.nombre}
                                </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Date</label>
                            <input className="input-lg form-control" name="fecha_mov" type="datetime-local" value={updatedRecord.fecha_mov || ''} onChange={handleInputChange} style={{fontSize:'14px'}} />
                        </div>
                    </div>

                    <div className="footer grid-holder">
                        <div className="btn btn-lg btn-default" onClick={onClose}>Cancel</div>
                        <button className={`btn btn-lg ${updatedRecord.tipo === 'gasto' ? 'btn btn-danger' : 'btn-success'}`} type="submit">Save</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default RecordPopUp;