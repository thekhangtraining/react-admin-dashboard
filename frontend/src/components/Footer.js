import React from "react";
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";
import { Avatar } from "./";

const Footer = () => {
  return (
    <div className="flex justify-center items-center gap-x-1 bg-gradient-to-r from-[#047857] to-[#7e22ce] p-2 text-slate-200 font-bold text-sm">
      <Avatar isRound />
      <div className="flex flex-col gap-y-1">
        <div className="text-xs">
          The-Khang Nguyen © {new Date().getFullYear()}
        </div>
        <div className="flex justify-center text-xl gap-x-2">
          <a
            href="https://www.linkedin.com/in/thekhangnguyen/"
            target="_blank"
            rel="noreferrer"
          >
            <BsLinkedin />
          </a>
          <a
            href="https://github.com/thekhangcloud/"
            target="_blank"
            rel="noreferrer"
          >
            <BsGithub />
          </a>
          <a
            href="https://www.facebook.com/nguyenthekhang94/"
            target="_blank"
            rel="noreferrer"
          >
            <BsFacebook />
          </a>
          <a
            href="https://www.instagram.com/thekhangnguyen_/"
            target="_blank"
            rel="noreferrer"
          >
            <BsInstagram />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
