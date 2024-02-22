import React, { useState } from 'react';

const RecordForm = ({ TheRecord, onSave }) => {
    // State to manage the form data
    const [formData, setFormData] = useState(TheRecord);

    // Function to handle form field changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Call onSave with the updated form data
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Amount</label>
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Budget</label>
                <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Date</label>
                <input
                    type="datetime-local"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default RecordForm;