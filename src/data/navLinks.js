import { AiFillLayout } from "react-icons/ai";
import { BsGraphUp, BsTable } from "react-icons/bs";
import { FaFacebookMessenger, FaImdb } from "react-icons/fa";
import { ImAmazon, ImPieChart, ImSpotify, ImStatsBars } from "react-icons/im";
import { RiDashboardFill, RiLayoutFill } from "react-icons/ri";
import { SiGmail } from "react-icons/si";

export const navLinks = [
  {
    title: "landing-pages",
    baseAddress: "/landing",
    links: [
      {
        name: "demo-1",
        icon: <AiFillLayout />,
        address: "/demo1",
      },
      {
        name: "demo-2",
        icon: <RiLayoutFill />,
        address: "/demo2",
      },
    ],
  },
  {
    title: "dashboards",
    baseAddress: "/dashboards",
    links: [
      {
        name: "default",
        icon: <RiDashboardFill />,
        address: "/default",
      },
      {
        name: "analytics",
        icon: <BsGraphUp />,
        address: "/analytics",
      },
    ],
  },
  {
    title: "data",
    baseAddress: "/data",
    links: [
      {
        name: "tables",
        icon: <BsTable />,
        address: "/tables",
      },

      {
        name: "charts",
        icon: <ImStatsBars />,
        address: "/charts",
      },
      {
        name: "infographics",
        icon: <ImPieChart />,
        address: "/infographics",
      },
    ],
  },
  {
    title: "app-clones",
    baseAddress: "/clones",
    links: [
      {
        name: "imdb",
        icon: <FaImdb />,
        address: "/imdb",
      },
      { name: "amazon", icon: <ImAmazon />, address: "/amazon" },
      { name: "gmail", icon: <SiGmail />, address: "/gmail" },
      {
        name: "messenger",
        icon: <FaFacebookMessenger />,
        address: "/messenger",
      },
      { name: "spotify", icon: <ImSpotify />, address: "/spotify" },
    ],
  },
];
