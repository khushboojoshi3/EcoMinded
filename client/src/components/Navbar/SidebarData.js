import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav_text",
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <AiIcons.AiOutlineUser />,
    cName: "nav_text",
  },
  {
    title: "Electricity",
    path: "/electricity",
    icon: <FaIcons.FaMedapps />,
    cName: "nav_text",
  },
  {
    title: "Donate",
    path: "/donate",
    icon: <FaIcons.FaHandHoldingUsd />,
    cName: "nav_text",
  },
  {
    title: "Dispose",
    path: "/dispose",
    icon: <FaIcons.FaTrashAlt />,
    cName: "nav_text",
  },
  {
    title: "Innovate",
    path: "/innovate",
    icon: <FaIcons.FaHeadSideVirus />,
    cName: "nav_text",
  },
  {
    title: "Shop",
    path: "/shop",
    icon: <FaIcons.FaShoppingCart />,
    cName: "nav_text",
  },
  {
    title: "Quiz",
    path: "/quiz",
    icon: <FaIcons.FaQuestion />,
    cName: "nav_text",
  },
  {
    title: "Store",
    path: "/store",
    icon: <FaIcons.FaStore />,
    cName: "nav_text",
  },
];
