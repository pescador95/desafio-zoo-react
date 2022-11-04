import React from "react";
import "../../styles/SideBarMenu.css";
import { SideBarMenuData } from "../SideBarMenuComponents";
import zooLogo from "../../assets/ZooLogo.png";
import style from "./SideBarMenu.module.css";
export const SideBarMenu = function SideBarMenu() {
  return (
    <div className={style?.container}>
      <img className="zoo-logo" src={zooLogo} alt="Logo zoológico" />
      <ul className="sidebar-list">
        {SideBarMenuData.map((val, key) => {
          return (
            <li
              key={key}
              onClick={() => {
                window.location.pathname = val.link;
              }}
              className="sidebar-list-row"
            >
              <div id="div-icon-row">{val.icon}</div>
              <div id="div-icon-title">{val.titulo}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
