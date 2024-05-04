import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../components/Utilities';

const TransferPopupBody = ({passMainAction}) =>  {

    //Use states
    const [origin, setOrigin] = useState('');
    const [destiny, setDestiny] = useState('');
    const [amount, setAmount] = useState('');
   

    //Take values from dropdowns and input
    const handleoriginChange = (e) => {
        setOrigin(e.target.value); 
    };

    const handledestinyChange = (e) => {
        setDestiny(e.target.value); 
    };

    const handleamountChange = (e) => {
        setAmount(e.target.value); 
    };


    //Main function passed to the generic pop up button
    const handleTransfer = () => {

        axios.post(`${API_URL}/NEWtransfer.php`, `origin=${origin}&destiny=${destiny}&amount=${amount}`)
        .then(response => {
            console.log('API response:', response.data);
            handleReload();
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
        });

    }


    // Pasar la función al pop up generico
    useEffect(() => {
        if (passMainAction) {
            passMainAction(() => handleTransfer); // Pasa la función de esta forma para no ejecutarla directamente
        }
    }, [origin, destiny, amount]); // Se ejecutará cada vez que cambia code


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


    //RELOAD PAGE
    const handleReload = () => {
        window.location.reload();
    };


    return (
        <div className='row'>

            <div className="form-group col-md-6">
                <label>From</label>
                <select className="input-lg form-control" value={origin} onChange={handleoriginChange}>
                    <option key="0"></option>
                    {methods.map((method) => (
                    <option key={method.id} value={method.nombre}>
                        {method.nombre}
                    </option>
                    ))}
                </select>
            </div>

            <div className="form-group col-md-6">
                <label>To</label>
                <select className="input-lg form-control" value={destiny} onChange={handledestinyChange}>
                    <option key="0"></option>
                    {methods.map((method) => (
                    <option key={method.id} value={method.nombre}>
                        {method.nombre}
                    </option>
                    ))}
                </select>
            </div>

            <div className="form-group col-md-12">
                <label>Amount</label>
                <div class="input-group">
                    <span class="input-group-addon">$</span>
                    <input className="input-lg form-control" type="number" value={amount} onChange={handleamountChange} />
                </div>
            </div>

        </div>
    );
  
};

export default TransferPopupBody;