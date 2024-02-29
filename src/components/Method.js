const Method = ({ method }) => {

    return (
        <li className="regular">
            <i className={method.icono} style={{ color: method.color }}></i>
            <div className="name">{method.nombre}</div>
            <div className={`amount ${method.saldo < 0 ? "red" : ""}`}>${method.saldo}</div>
        </li>
    );
};
export default Method;