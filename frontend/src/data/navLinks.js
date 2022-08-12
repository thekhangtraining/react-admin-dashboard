import { BsPeople, BsYoutube } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { ImAmazon, ImSpotify, ImStatsBars } from "react-icons/im";
import { MdOutlineLocalMovies } from "react-icons/md";
import { RiCalendarTodoFill } from "react-icons/ri";

export const navLinks = [
  {
    title: "ecommerce",
    baseAddress: "/ecommerce",
    links: [
      {
        name: "financial-stats",
        icon: <ImStatsBars />,
        address: "/financial-stats",
      },
      { name: "amazon", icon: <ImAmazon />, address: "/amazon" },
    ],
  },
  {
    title: "company",
    baseAddress: "/company",
    links: [
      { name: "employees", icon: <BsPeople />, address: "/employees" },
      { name: "projects", icon: <RiCalendarTodoFill />, address: "/projects" },
    ],
  },
  {
    title: "media",
    baseAddress: "/media",
    links: [
      { name: "movies", icon: <MdOutlineLocalMovies />, address: "/movies" },
      { name: "youtube", icon: <BsYoutube />, address: "/youtube" },
      { name: "facebook", icon: <FaFacebookSquare />, address: "/facebook" },
      { name: "spotify", icon: <ImSpotify />, address: "/spotify" },
    ],
  },
];
