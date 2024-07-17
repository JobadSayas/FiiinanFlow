import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Function to fetch records from API
const fetchRecords = async () => {
    try {
        const response = await axios.get('API_URL/movimientos-consultar.php?apartado=Leon');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

const App = () => {
    const [records, setRecords] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [popupVisible, setPopupVisible] = useState(false);

    useEffect(() => {
        // Fetch records when component mounts
        fetchRecords().then(data => setRecords(data));
    }, []);

    // Function to handle record click and open popup
    const handleRecordClick = (record) => {
        setSelectedRecord(record);
        setPopupVisible(true);
    };

    // Function to handle record update from popup
    const handlePopupClose = (updatedRecord) => {
        setRecords(records.map(record =>
            record.id === updatedRecord.id ? updatedRecord : record
        ));
        setSelectedRecord(null); // Close the popup
        setPopupVisible(false);
    };

    return (
        <div>
            <h1>Records</h1>
            <ul>
                {records.map(record => (
                    <li key={record.id} onClick={() => handleRecordClick(record)}>
                        {record.descripcion} - {record.cantidad} - {record.apartado}
                    </li>
                ))}
            </ul>

            {popupVisible && selectedRecord && (
                <RecordPopup
                    record={selectedRecord}
                    onClose={handlePopupClose}
                />
            )}
        </div>
    );
};

// Popup component to edit record
const RecordPopup = ({ record, onClose }) => {
    const [updatedRecord, setUpdatedRecord] = useState({ ...record });

    // Function to handle input change
    const handleInputChange = (e) => {
        setUpdatedRecord({
            ...updatedRecord,
            [e.target.name]: e.target.value
        });
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onClose(updatedRecord);
    };

    return (
        <div className="popup">
            <h2>Edit Record</h2>
            <form onSubmit={handleSubmit}>
                <label>Descripcion:</label>
                <input
                    type="text"
                    name="descripcion"
                    value={updatedRecord.descripcion}
                    onChange={handleInputChange}
                />
                <label>cantidad:</label>
                <input
                    type="text"
                    name="cantidad"
                    value={updatedRecord.cantidad}
                    onChange={handleInputChange}
                />
                <label>apartado:</label>
                <input
                    type="text"
                    name="apartado"
                    value={updatedRecord.apartado}
                    onChange={handleInputChange}
                />
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default App;