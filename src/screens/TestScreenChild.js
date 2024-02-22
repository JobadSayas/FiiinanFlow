import React, { useState } from 'react';

const RecordForm = ({ record, onSubmit }) => {
  // State to manage form data
  const [formData, setFormData] = useState(record);

  // Event handler to update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Description:</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} />
      </div>
      <div>
        <label>Amount:</label>
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} />
      </div>
      <div>
        <label>Budget:</label>
        <input type="text" name="budget" value={formData.budget} onChange={handleChange} />
      </div>
      <div>
        <label>Date:</label>
        <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RecordForm;