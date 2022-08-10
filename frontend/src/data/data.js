import { BsPeople } from "react-icons/bs";
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
        name: "financial-statistics",
        icon: <ImStatsBars />,
        address: "/financial-statistics",
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
      { name: "facebook", icon: <FaFacebookSquare />, address: "/facebook" },
      { name: "spotify", icon: <ImSpotify />, address: "/spotify" },
    ],
  },
];

export const moviesGenres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 10759,
    name: "Action & Adventure",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 10762,
    name: "Kids",
  },
  {
    id: 10763,
    name: "News",
  },
  {
    id: 10764,
    name: "Reality",
  },
  {
    id: 10765,
    name: "Sci-Fi & Fantasy",
  },
  {
    id: 10766,
    name: "Soap",
  },
  {
    id: 10767,
    name: "Talk",
  },
  {
    id: 10768,
    name: "War & Politics",
  },
  {
    id: 37,
    name: "Western",
  },
];
