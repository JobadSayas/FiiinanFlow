import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainMenu = ({onSelect}) =>  {
    
    //TOGGLE MENU
    const [popOverVisible, setpopOverVisible] = useState(false);
    
    const handleMenuButtonClick = () =>{
        setpopOverVisible(!popOverVisible);
    };
    
    const closeMenu = () =>{
        setpopOverVisible(false);
    }


    //NAVEGACION
    const navigate = useNavigate();


    //LAST 100 RECORDS
    const handleLastRecords = () => {
        // Navigate with parameters
        const params = { limit: 100 };
        const queryParams = new URLSearchParams(params).toString();
        navigate(`/records?${queryParams}`);
    };

    //LAST MONTH
    const handleLastMonth = () => {
        const currentDate = new Date();
        const currentMonth = (currentDate.getMonth() + 0).toString().padStart(2, '0');
        const queryParams = `/records?start_date=${currentDate.getFullYear()}-${currentMonth}-01&end_date=${currentDate.getFullYear()}-${currentMonth}-31&budget=groceries&type=gasto&sort=cantidad`;
        navigate(queryParams);
    };

    //THIS WEEK GROCERIES
    const handleThisWeekGroceries = () => {
        const today = new Date();
        const day = today.getDay(); // 0 is Sunday, 6 is Saturday
      
        // Calculate the start (Sunday) of the current week
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - day);
        
        // Calculate the end (Saturday) of the current week
        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() + (6 - day + 1));
      
        const formatDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        };
      
        const startDate = formatDate(startOfWeek);
        const endDate = formatDate(endOfWeek);
      
        const url = `${API_URL}/custom-search.php?b=groceries&fi=${startDate}&ff=${endDate}`;
        window.open(url, '_blank');
    };


    //THIS MONTH
    const handleThisMonth = () => {
        const today = new Date();
      
        // Calculate the start (first day) of the current month
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      
        const formatDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        };
      
        const startDate = formatDate(startOfMonth);
        const endDate = `${startOfMonth.getFullYear()}-${String(startOfMonth.getMonth() + 1).padStart(2, '0')}-32`;
      
        const url = `${API_URL}/custom-search.php?b=all&fi=${startDate}&ff=${endDate}`;
        window.open(url, '_blank');
    };


    //THIS MONTH UNPLANNED
    const handleThisWeekUnplanned = () => {
        const today = new Date();
      
        // Calculate the start (first day) of the current month
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      
        const formatDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        };
      
        const startDate = formatDate(startOfMonth);
        const endDate = `${startOfMonth.getFullYear()}-${String(startOfMonth.getMonth() + 1).padStart(2, '0')}-32`;
      
        const url = `${API_URL}/custom-search.php?b=none&s=Cantidad&fi=${startDate}&ff=${endDate}`;
        window.open(url, '_blank');
    };
   

    return (<>

        <div id="menu-btn" onClick={handleMenuButtonClick}><i className="fas fa-bars"></i></div>

        {popOverVisible &&(
            <div id="menu" className="desplegado">
                <ul>
                    <li onClick={() => {onSelect('Search'); closeMenu();}}><i className="fas fa-search"></i> Search</li>
                    <li onClick={() => {handleLastRecords(); closeMenu();}}><i className="fas fa-list"></i> Last records</li>
                    <li onClick={() => {onSelect('Distribute all'); closeMenu();}}><i className="fas fa-calendar-day"></i> Distribute All</li>
                    <li onClick={() => {onSelect('Transfer'); closeMenu();}}><i className="fas fa-share"></i> Transfer</li>
                    <li onClick={() => {onSelect('Multi insert'); closeMenu();}}><i className="fas fa-clone"></i> Multi Insert</li>
                    <li onClick={() => {closeMenu();}}><a href="https://docs.google.com/spreadsheets/d/1KYrZ5UuTdmgxbyKIdNya4WZmfAopNfF9SB-tZ7Fpzjw/edit?pli=1#gid=0" target="_blank" rel="noreferrer" onClick={closeMenu}><i className="fas fa-external-link-alt"></i> JSON Converter</a></li>
                    <li><i class="fas fa-file"></i> Reports:</li>
                    <li onClick={() => {handleLastMonth(); closeMenu();}}>- Last month</li>
                    <li onClick={() => {handleThisMonth(); closeMenu();}}>- This month</li>
                    <li onClick={() => {handleThisWeekGroceries(); closeMenu();}}>- Groceries this week</li>
                    <li onClick={() => {handleThisWeekUnplanned(); closeMenu();}}>- Unplanned this month</li>
                </ul>
            </div>
        )}

    </>);

};

export default MainMenu;

