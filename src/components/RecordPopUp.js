import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default ({record, onClose}) => {

    //FORMAT DATE
    // Convert the date string to a Date object
    const date = new Date(record.fecha_mov);
    //This because the time was coming in UTD, to transform to CST
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    // Transforms the date in the right format YYYY-MM-DDTHH:MM
    const formatedDate = localDate.toISOString().slice(0, 16); 


    //UPDATE RECORD IN PARENT COMPONENT
    const [updatedRecord, setUpdatedRecord] = useState({ ...record });

    // Function to handle input change
    const handleInputChange = (e) => {
        setUpdatedRecord({
            ...updatedRecord,
            [e.target.name]: e.target.value
        });
    };

    // Function to handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        onClose(updatedRecord); // Pass updated record to parent component
    };


    //METHODS

    const [methods, setMethods] = useState([]);

    useEffect(() => {
        const fetchMethods = async () => {
        try {
            const response = await axios.get('https://finanzas.visssible.com/backend/methods-consult.php');
            setMethods(response.data);
        } catch (error) {
            console.error('Error fetching methods:', error);
        }
        };

        fetchMethods();
    }, []);


    return (

        <div id="transaction" className="pantalla modal newModify"> 
            <div className="centrar">
                <form className="modal-holder" onSubmit={handleSubmit}>

                    <ul className="tabs">
                        <li className="expense left">Expense</li>
                        <li className="income right">Income</li>
                        <li className="modify full">Modify</li>
                    </ul>

                    <div className="body">

                        <div className="form-group col-2 col-first">
                            <label>Amount 1</label>
                            <div className="input-group">
                            <span className="input-group-addon">$</span>
                            <input type="number" name="cantidad" className="cantidad form-control input-lg" value={updatedRecord.cantidad} onChange={handleInputChange} />
                            </div>
                            <div id="remaining">Remaining: <span className="budget">$0.00</span> </div>
                        </div>

                        <div id="apartado-holder" className="form-group col-2">
                            <label>Budget</label>
                            <select className="apartados input-lg form-control" name="apartado" value={updatedRecord.apartado} onChange={handleInputChange} >
                                <option>Unplanned</option><option>Groceries</option>
                                <option>Jobad</option>
                                <option>Maddie</option>
                                <option>Leon</option>
                                <option>Levi</option>
                                <option>Transport</option>
                                <option>Services</option>
                                <option>Tithe</option>
                                <option>Floating Week</option>
                                <option>Health</option>
                                <option>Travel</option>
                                <option>Credits</option>
                                <option>Temporal</option>
                                <option>Seguros GNP</option>
                                <option>Ventas online</option>
                                <option>Toyota SUB</option>
                                <option>Judith</option>
                                <option>AdMob (MXP)</option>
                                <option>Bancomer (MXP)</option>
                                <option>Banorte (MXP)</option>
                                <option>Vida Jobad (MXP)</option>
                                <option>Vida Maddie (MXP)</option>
                                <option>Savings (MXP)</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <input className="descripcion input-lg form-control" name="descripcion" type="text" value={updatedRecord.descripcion} onChange={handleInputChange} />
                        </div>

                        <div id="method-holder" className="form-group col-2 col-first">
                            <label>Method</label>
        

                            <select className="method input-lg form-control" name="method" value={updatedRecord.method} onChange={handleInputChange}>
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
                            <input className="fecha input-lg form-control" name="fecha" type="datetime-local" fecha={formatedDate} value={formatedDate} onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="footer">
                        <div className="cancel btn btn-lg btn-default" onClick={onClose}>Cancel</div>
                        <div id="newExpense" className="confirmar btn btn-lg btn-danger">Save</div>
                        <div id="newIncome" className="confirmar btn btn-lg btn-success">Save</div>
                        <button id="modifyRecord" className="confirmar btn btn-lg btn-primary" type="submit">Modify</button>
                    </div>

                </form>
            </div>
        </div>
    );
};