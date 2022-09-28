import React from "react";
import './styles/MenuLateral.css';
import { MenuLateralDados } from './MenuLateralDados'
import zooLogo from './images/ZooLogo.png'

function MenuLateral() {
    return (
        <div className="sidebar-menu">
            <img className="zoo-logo" src={zooLogo} alt="Logo zoológico"/>
            <ul className="sidebar-list">
            {MenuLateralDados.map((val, key) => {
                return (
                    <li key={key} onClick={() => {window.location.pathname = val.link}} className="sidebar-list-row">
                        <div id="div-icon-row">{val.icon}</div>
                        <div id="div-icon-title">{val.titulo}</div>
                    </li>
                )
            })}
            </ul>
        </div>
    );
}

export default MenuLateral;