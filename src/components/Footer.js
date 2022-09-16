import React from "react";
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";
import { Avatar } from "./";

const iconClassname = "h-4.5 w-4.5";

const Footer = () => {
  return (
    <div className="flex justify-center items-center gap-1 font-bold text-sm">
      <Avatar round />
      <div className="flex flex-col gap-0.5">
        <div className="text-sm font-[Pacifico] p-0.5">The-Khang Nguyen</div>
        <div className="flex justify-center text-xl gap-x-2">
          <a
            href="https://www.linkedin.com/in/thekhangnguyen/"
            target="_blank"
            rel="noreferrer"
          >
            <BsLinkedin className={iconClassname} />
          </a>
          <a
            href="https://github.com/thekhangcloud/"
            target="_blank"
            rel="noreferrer"
          >
            <BsGithub className={iconClassname} />
          </a>
          <a
            href="https://www.facebook.com/nguyenthekhang94/"
            target="_blank"
            rel="noreferrer"
          >
            <BsFacebook className={iconClassname} />
          </a>
          <a
            href="https://www.instagram.com/thekhangnguyen_/"
            target="_blank"
            rel="noreferrer"
          >
            <BsInstagram className={iconClassname} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
