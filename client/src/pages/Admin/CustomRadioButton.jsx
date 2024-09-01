import React from 'react';

// eslint-disable-next-line react/prop-types
function CustomRadioButton({ id, checked, onChange, value, children }) {
  return (
    <label className="flex items-center cursor-pointer space-x-2">
      <input
        type="radio"
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <span
        className={`w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center
                    ${checked ? 'bg-sky-900 border-sky-900' : 'bg-white'}
                    relative`}
      >
        {checked && (
          <span className="w-2 h-2 bg-white rounded-full absolute"></span>
        )}
      </span>
      <span>{children}</span>
    </label>
  );
}

export default CustomRadioButton;
