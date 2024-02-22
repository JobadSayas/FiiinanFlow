import axios from 'axios';
import { API_URL } from '../components/Utilities';

export const MultiInsert = () => {

    let userInput = prompt("Insert JSON");
    let curatedObject = userInput.replace(/'/g, '"');
    let records = JSON.parse(curatedObject);

    const handleInsertRecords = () => {
        axios.post(`${API_URL}/NEWmultiInsert.php`, { records })
            .then(response => {
                console.log('API response:', response.data);
                console.log(records); 
            })
            .catch(error => {
                console.error('There was a problem with the request:', error);
            });
    };

    // Call the function to insert the records
    handleInsertRecords();

};