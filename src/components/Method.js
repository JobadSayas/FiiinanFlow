
export const getIcon = (name) => {
    switch (name) {
        case 'Savings':
            return "fas fa-piggy-bank";
        case 'Account':
            return "fas fa-money-check-alt";
        case 'Online CC':
            return "fas fa-credit-card aqua";
        case 'Jobad CC':
            return "fas fa-credit-card";
        case 'Maddie CC':
            return "fas fa-credit-card pink";
        case 'Respaldo CC':
            return "fas fa-credit-card respaldo";
        case 'Amazon CC':
            return "fab fa-cc-amazon-pay";
        case 'Cash':
            return "fas fa-money-bill";
        case 'Stock':
            return "fas fa-chart-line";
        case 'PayPal CC':
            return "fab fa-paypal";
        default:
            return "";
    }
};

// Method component
const Method = ({ name, amount }) => {
    // Get the icon based on the method name
    const icon = getIcon(name);

    return (
        <li className="regular">
            <i className={icon}></i>
            <div className="name">{name}</div>
            <div className="amount">${amount}</div>
        </li>
    );
};

export default Method;