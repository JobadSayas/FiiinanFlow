import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../components/Utilities';

const SearchPopupBody = ({passMainAction}) =>  {
    

    //Use state for tabs
    const [searchType, setSearchType] = useState('simple');

    // Estado temporal para los valores del formulario
    const [formValues, setFormValues] = useState({
        keyword: '',
        start_date: '',
        end_date: '',
        budget: '',
        method: '',
    });

    //Navigation has to be declare in order to work
    const navigate = useNavigate();


    //TAKE VALUES FROM FORM
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
        ...formValues, // Mantenemos los valores actuales
        [name]: value, // Actualizamos el campo específico
        });
    };


    //MAIN ACTION
    const handleSearch = () => {
        const queryParams = new URLSearchParams(formValues).toString();
        navigate(`/records?${queryParams}`);
    }


    // PASSING MAIN ACTION TO GENERIC POP UP
    useEffect(() => {
        passMainAction(() => handleSearch); // Pasa la función de esta forma para no ejecutarla directamente
    }, [formValues]); // Se ejecutará cada vez que cambia keyword


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


    //BUDGETS

    const [budgets, setBudgets] = useState([]);

    useEffect(() => {
        const fetchMethods = async () => {
        try {
            const response = await axios.get(`${API_URL}/apartados-consultar.php`);
            setBudgets(response.data);
        } catch (error) {
            console.error('Error fetching methods:', error);
        }
        };

        fetchMethods();
    }, []);


    return (<>
        <ul className="tabs">
            <li className={searchType === 'simple' ? 'active':''} onClick={() => setSearchType('simple')}>Search</li>
            <li className={searchType === 'advanced' ? 'active':''} onClick={() => setSearchType('advanced')}>Adcanced</li>
        </ul>

        <div className='grid-holder'>

            <div className="form-group grid-double">
                <label>Keyword or amount</label>
                <input name="keyword" className="input-lg form-control" type="text" value={formValues.keyword} onChange={handleInputChange} />
            </div>

            {searchType === 'advanced' && (<>
                    <div className="form-group">
                        <label>Date from</label>
                        <input name="start_date" className="input-lg form-control" type="date" value={formValues.start_date} onChange={handleInputChange}/>
                    </div>

                    <div className="form-group">
                        <label>Date to</label>
                        <input name="end_date" className="input-lg form-control" type="date" value={formValues.end_date} onChange={handleInputChange}/>
                    </div>

                    <div className="form-group">
                        <label>Budget</label>
                        <select name="budget" className="input-lg form-control" value={formValues.budget} onChange={handleInputChange}> 
                            <option key="0"></option>
                            {budgets.map((budget) => (
                            <option key={budget.id} value={budget.nombre}>
                                {budget.nombre}
                            </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Method</label>
                        <select name="method" className="input-lg form-control" value={formValues.method} onChange={handleInputChange}>
                            <option key="0"></option>
                            {methods.map((method) => (
                            <option key={method.id} value={method.nombre}>
                                {method.nombre}
                            </option>
                            ))}
                        </select>
                    </div>
            </>)}

        </div>

    </>);
  
};

export default SearchPopupBody;