import { useNavigate } from 'react-router-dom';

const Method = ({ method }) => {

    //NAVEGACION
    const navigate = useNavigate();

    const handleButtonClick = () => {
        // Navigate with parameters
        const icon = method.icono;
        const methodParam = method.nombre;
        const params = { method: methodParam };
        const queryParams = new URLSearchParams(params).toString();
        navigate(`/records?${queryParams}`, { state: { icon } });
    };


    return (
        <li key={method.id} className="regular" onClick={handleButtonClick}>
            <i className={method.icono} style={{ color: method.color }}></i>
            <div className="name">{method.nombre}</div>
            <div className={`amount ${method.saldo < 0 ? "red" : ""}`}>${method.saldo}</div>
        </li>
    );
};
export default Method;