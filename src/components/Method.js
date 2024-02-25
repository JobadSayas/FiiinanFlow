export default({ name, amount, icon, color }) => {

    return (
        <li className="regular">
            <i className={icon} style={{ color: color }}></i>
            <div className="name">{name}</div>
            <div className={`amount ${amount < 0 ? "red" : ""}`}>${amount}</div>
        </li>
    );
};