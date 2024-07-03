
const GenericPopUp = ({children, onClose, title, tabs, onMainAction}) =>  {

    const handleMainAction = () => {
        if (onMainAction) {
            onMainAction(); // Ejecutar la función pasada
        }
    };

    return (

        <div className="pantalla modal">
            <div className="centrar">
                <div className="modal-holder">
                    {!tabs && (
                        <div className="header">{title}</div>
                    )}

                    <div className="body">
                    {tabs}
                        {children} 
                    </div>
                    <div className="footer grid-holder">
                        <div onClick={onClose} className="btn btn-lg btn-default" >Cancel</div>
                        <button className="btn btn-lg btn-primary" onClick={handleMainAction}>Confirm</button>
                    </div>
                </div>
            </div>
        </div>

    );
  
};

export default GenericPopUp;