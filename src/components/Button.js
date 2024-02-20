export default ({ children, type, onClick }) =>  {

    return (
        <div className={`${type} btn btn-lg`} onClick={onClick}>{children}</div>
    );
};