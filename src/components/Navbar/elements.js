import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
    color: black;
    font-size: 15px;
    font-weight: bold;
    height: 85px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem calc((100vw - 1150px) / 2);
    z-index: 12;
    box-shadow: 0 0px 10px 0px rgb(64 60 67 / 25%);
`;
export const NavLogo = styled(Link)`
  cursor: pointer;
  font-size: 1.5rem;
  text-decoration: none;
`;
export const NavLink = styled(Link)`
color: black;
display: flex;
opacity: 0.5;
align-items: center;
text-decoration: none;
padding: 0 1.5rem;
height: 100%;
cursor: pointer;
&.active {
    background:  #e6e6ff;
}
&:hover {
    background:  #e6e6ff;
}
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  
`;

export const NavBtnLink = styled(Link)`
  width: 100px;
  border-radius: 25px;
  background:  #ff9933;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: 1px solid #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    border: 1px solid  #ff9933;
    background: #fff;
    color: #808080;
  }
`;