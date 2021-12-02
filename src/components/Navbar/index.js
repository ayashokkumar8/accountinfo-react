import React from "react";
import {
    Nav,
    NavLogo,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./elements";

const Navbar = () => {
    return (
        <>
           <Nav>
            <NavLogo to="/">
                <img alt="" style= {{width: '8.5rem'}} src="logo.svg"  />
            </NavLogo>
            <Bars />

            <NavMenu>
                <NavLink to="/accountsandcards" >
                    ACCOUNTS AND CARDS
                </NavLink>
                <NavLink to="/loansandmortgages" >
                    LOANS AND MORTGAGES
                </NavLink>
                <NavLink to="/consulting" >
                    CONSULTING
                </NavLink>
                <NavLink to="/trading" >
                    TRADING
                </NavLink>
                <NavLink to="/accountinfo" >
                    <img alt="" style= {{width: '2rem'}} src="menu_icon.svg"  />
                </NavLink>
                <NavBtn>
                    <NavBtnLink to="/login">Login</NavBtnLink>                
                </NavBtn>
            </NavMenu> 
           </Nav> 
        </>
    );
};
export default Navbar;
