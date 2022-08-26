import { useSelect } from "downshift";
import { IoMdArrowDropdown } from "react-icons/io";
import { useStateContext } from "../contexts/ContextProvider";

let classnames = require("classnames");
const Select = ({ setState, options, isThemeSelect }) => {
  const { theme } = useStateContext();

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    selectedItem,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items: options,
    initialSelectedItem: options[0],
    onSelectedItemChange: ({ selectedItem }) => {
      setState(selectedItem.value);
      if (isThemeSelect) {
        localStorage.setItem("theme", selectedItem.value);
      }
    },
  });

  return (
    <div>
      <div className="w-24 flex justify-center items-center overflow-auto rounded-sm bg-skin-fill-1">
        <label className="text-sm sr-only" {...getLabelProps()}>
          Rows per page
        </label>
        <button
          aria-label="Select"
          className="py-0.5 px-2 h-5 w-full flex justify-between items-center"
          type="button"
          {...getToggleButtonProps()}
        >
          <span>{isThemeSelect ? theme : selectedItem.label}</span>
          <span className={classnames(isOpen && "rotate-180")}>
            <IoMdArrowDropdown />
          </span>
        </button>
      </div>
      <ul
        {...getMenuProps()}
        className="absolute w-24 shadow-md max-h-42 rounded-b-sm overflow-auto bg-skin-fill-1"
      >
        {isOpen &&
          options.map((item, index) => {
            return (
              <button className="w-full" key={`${item.value}${index}`}>
                <li
                  className={classnames(
                    highlightedIndex === index && "bg-skin-secondary",
                    // Compare value instead of "selectedItem === item" as in the documentation
                    selectedItem.value === item.value && "text-skin-primary",
                    "py-1.5 px-3 shadow-sm flex items-center w-full"
                  )}
                  {...getItemProps({ item, index })}
                >
                  <span>{item.label}</span>
                </li>
              </button>
            );
          })}
      </ul>
    </div>
  );
};

export default Select;
