import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState({
    cantidad: '',
    apartado: '',
    descripcion: '',
    method: '',
    fecha_mov: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/movimientos', formData);
      alert('Movimiento created successfully');
      // Reset form fields after successful submission
      setFormData({
        cantidad: '',
        apartado: '',
        descripcion: '',
        method: '',
        fecha_mov: ''
      });
    } catch (error) {
      console.error('Error creating movimiento:', error);
      alert('Failed to create movimiento. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="cantidad" value={formData.cantidad} onChange={handleChange} placeholder="Cantidad" />
      <input type="text" name="apartado" value={formData.apartado} onChange={handleChange} placeholder="Apartado" />
      <input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción" />
      <input type="text" name="method" value={formData.method} onChange={handleChange} placeholder="Método" />
      <input type="date" name="fecha_mov" value={formData.fecha_mov} onChange={handleChange} />
      <button type="submit">Add Movimiento</button>
    </form>
  );
};

export default Form;