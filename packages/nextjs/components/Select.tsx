import { SvgSelectDown } from "./svg/SelectDown";
import { SvgSelected } from "./svg/Selected";

type SelectProps = {
  showSelect: boolean;
  options: any[];
  selectedOption: number | null;
  // add one prop onSelectClick which is a function
  onSelectClick: () => void;
  btnText: string;
  onSelectOptionClick: (index: number) => void;
};

export const Select = ({
  showSelect,
  options,
  selectedOption,
  onSelectClick,
  btnText,
  onSelectOptionClick,
}: SelectProps) => {
  return (
    <div className="relative" onClick={onSelectClick}>
      <button
        type="button"
        className="relative flex items-center justify-between gap-x-1.5 h-10 pr-2 bg-white rounded-lg dark:bg-dark-deep ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-gradFrom dark:ring-light-gray dark:focus:ring-light-gray"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
      >
        <span className="flex items-center justify-center flex-grow w-full px-2 py-1 whitespace-nowrap text-light-gray3 dark:text-dark-gray3">
          {btnText}
        </span>
        <SvgSelectDown className={`w-5 h-5 text-light-gray3 ${showSelect && "rotate-180"}`} />
      </button>
      {showSelect && (
        <ul
          className="absolute z-10 w-full whitespace-nowrap py-1 px-0.5 flex flex-col space-y-0.5 mt-1 overflow-auto bg-white dark:bg-dark-deep rounded max-h-28 ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3"
        >
          {options.map((option, index) => (
            <li
              className="box-border relative flex items-center justify-between px-2 py-1 border-transparent rounded cursor-default select-none text-light-gray3 hover:border hover:border-purple hover:bg-purple-light dark:hover:text-white dark:hover:bg-opacity-0"
              role="option"
              key={index}
              onClick={() => onSelectOptionClick(index)}
            >
              <div className={`flex items-center ${selectedOption === index && "font-bold"}`}>{option}</div>
              <SvgSelected className={`dark:text-purple-dark opacity-0 ${selectedOption === index && "opacity-100"}`} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
