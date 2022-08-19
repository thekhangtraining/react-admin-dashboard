import React from "react";
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";
import { Avatar } from "./";

const Footer = () => {
  return (
    <div className="flex justify-center items-center gap-x-2 text-slate-200 font-bold text-sm">
      <Avatar round />
      <div className="flex-col gap-y-1">
        <div className="text-xs font-[Pacifico] p-0.5">The-Khang Nguyen</div>
        <div className="flex justify-center text-xl gap-x-2">
          <a
            href="https://www.linkedin.com/in/thekhangnguyen/"
            target="_blank"
            rel="noreferrer"
          >
            <BsLinkedin size="15px" />
          </a>
          <a
            href="https://github.com/thekhangcloud/"
            target="_blank"
            rel="noreferrer"
          >
            <BsGithub size="15px" />
          </a>
          <a
            href="https://www.facebook.com/nguyenthekhang94/"
            target="_blank"
            rel="noreferrer"
          >
            <BsFacebook size="15px" />
          </a>
          <a
            href="https://www.instagram.com/thekhangnguyen_/"
            target="_blank"
            rel="noreferrer"
          >
            <BsInstagram size="15px" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
