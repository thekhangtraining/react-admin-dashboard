import React, { forwardRef, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useStateContext } from "../contexts/ContextProvider";

let classnames = require("classnames");

const Modal = forwardRef((props, ref) => {
  const { theme } = useStateContext();
  const modalOverlayRef = useRef(null);
  // Handle events for modal
  useEffect(() => {
    const handlePressEsc = (e) => {
      if (e.keyCode !== 27 || !props.modalOpen) return;
      props.setModalOpen(false);
    };
    document.addEventListener("keydown", handlePressEsc);
    return () => document.removeEventListener("keydown", handlePressEsc);
  });

  useEffect(() => {
    const handleClick = ({ target }) => {
      if (props.modalOpen && modalOverlayRef.current.contains(target))
        props.setModalOpen(false);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  });

  useEffect(() => {
    const body = document.querySelector("body");
    if (props.modalOpen) body.style.overflow = "hidden";
    else body.style.overflow = "auto";
  });

  return createPortal(
    <div
      className={classnames(
        "text-skin-base text-xs sm:text-sm",
        !props.modalOpen && "hidden",
        theme === "Nord" && "theme-nord",
        theme === "Emerald" && "theme-emerald",
        theme === "Maroon" && "theme-maroon"
      )}
    >
      <div
        ref={modalOverlayRef}
        className="z-20 fixed inset-0 bg-black/50"
      ></div>
      <div className="flex justify-center h-4/5 w-full px-4 py-6 overflow-y-auto fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-skin-fill bg-opacity-80 z-20 animate-fadeIn">
        <div className="w-full lg:max-w-4xl">{props.children}</div>
      </div>
    </div>,
    document.getElementById("portal")
  );
});

export default Modal;
