import { useSelect } from "downshift";
import { IoMdArrowDropdown } from "react-icons/io";

var classnames = require("classnames");

// TODO: Flip dropdown direction on reaching screen end

const Select = ({ setPageSize }) => {
  const options = [
    { value: 10, label: "Show 10" },
    { value: 20, label: "Show 20" },
    { value: 30, label: "Show 30" },
    { value: 40, label: "Show 40" },
  ];
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
    onSelectedItemChange: ({ selectedItem }) => setPageSize(selectedItem.value),
  });

  return (
    <div>
      <div className="w-24 flex justify-center items-center overflow-auto rounded-sm">
        <label className="text-sm sr-only" {...getLabelProps()}>
          Rows per page
        </label>
        <button
          aria-label="Select"
          className="py-0.5 px-2 h-5 w-full flex justify-between items-center bg-slate-800"
          type="button"
          {...getToggleButtonProps()}
        >
          <span>{selectedItem.label}</span>
          <span className={classnames(isOpen && "rotate-180")}>
            <IoMdArrowDropdown />
          </span>
        </button>
      </div>
      <ul
        {...getMenuProps()}
        className="absolute w-24 shadow-md max-h-42 bg-slate-800 rounded-b-sm overflow-auto text-slate-200"
      >
        {isOpen &&
          options.map((item, index) => {
            return (
              <li
                className={classnames(
                  highlightedIndex === index && "bg-slate-700",
                  // Compare value instead of "selectedItem === item" as in the documentation
                  selectedItem.value === item.value && "text-sky-500",
                  "py-2 px-3 shadow-sm"
                )}
                key={`${item.value}${index}`}
                {...getItemProps({ item, index })}
              >
                <span>{item.label}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Select;
