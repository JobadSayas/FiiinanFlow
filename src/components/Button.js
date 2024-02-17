export default ({ children, type }) =>  {

    return (
        <div className={`${type} btn btn-lg`}>{children}</div>
    );
};