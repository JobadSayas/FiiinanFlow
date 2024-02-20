export default ({record, onClose}) => {

    //FORMAT DATE
    // Convert the date string to a Date object
    const date = new Date(record.fecha_mov);

    //FORMAT DATE
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    const formatedDate = localDate.toISOString().slice(0, 16); // Extract YYYY-MM-DDTHH:MM


    return (

        <div id="transaction" className="pantalla modal newModify"> 
            <div className="centrar">
                <div className="modal-holder">

                    <ul className="tabs">
                        <li className="expense left">Expense</li>
                        <li className="income right">Income</li>
                        <li className="modify full">Modify</li>
                    </ul>

                    <div className="body">
                        <div className="form-group col-2 col-first">
                            <label>Amount 1</label>
                            <div className="input-group">
                            <span className="input-group-addon">$</span>
                            <input type="number" className="cantidad form-control input-lg" value={record.cantidad} />
                            </div>
                            <div id="remaining">Remaining: <span className="budget">$0.00</span> </div>
                        </div>

                        <div id="apartado-holder" className="form-group col-2">
                            <label>Budget</label>
                            <select className="apartados input-lg form-control" value={record.apartado}>
                                <option>Unplanned</option><option>Groceries</option>
                                <option>Jobad</option>
                                <option>Maddie</option>
                                <option>Leon</option>
                                <option>Levi</option>
                                <option>Transport</option>
                                <option>Services</option>
                                <option>Tithe</option>
                                <option>Floating Week</option>
                                <option>Health</option>
                                <option>Travel</option><option>Credits</option><option>Temporal</option><option>Seguros GNP</option><option>Ventas online</option><option>Toyota SUB</option><option>Judith</option><option>AdMob (MXP)</option><option>Bancomer (MXP)</option><option>Banorte (MXP)</option><option>Vida Jobad (MXP)</option><option>Vida Maddie (MXP)</option><option>Savings (MXP)</option></select>
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <input className="descripcion input-lg form-control" type="text" value={record.descripcion} />
                        </div>

                        <div id="method-holder" className="form-group col-2 col-first">
                            <label>Method</label>
                            <select className="method input-lg form-control" value={record.method}>
                            <option></option>
                            <option>Online CC</option>
                            <option>Jobad Credit Card</option>
                            <option>Maddie Credit Card</option>
                            <option>Respaldo CC</option>
                            <option>Amazon CC</option>
                            <option>Paypal CC</option>
                            <option>Debit Card</option>
                            <option>Cash</option>
                            <option>Savings</option>
                            <option>Stock</option>
                            </select>
                        </div>

                        <div className="form-group col-2">
                            <label>Date</label>
                            <input className="fecha input-lg form-control" type="datetime-local" fecha={formatedDate} value={formatedDate} />

                        </div>
                    </div>

                    <div className="footer">
                        <div className="cancel btn btn-lg btn-default" onClick={onClose}>Cancel</div>
                        <div id="newExpense" className="confirmar btn btn-lg btn-danger">Save</div>
                        <div id="newIncome" className="confirmar btn btn-lg btn-success">Save</div>
                        <div id="modifyRecord" className="confirmar btn btn-lg btn-primary">Modify</div>
                    </div>

                </div>
            </div>
        </div>
    );
};