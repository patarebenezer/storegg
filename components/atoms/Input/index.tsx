import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string,
    nametype: string,
    id: string
}
export default function Input(props: InputProps) {
  const {
    id, label, nametype, ...nativeProps
  } = props;
  return (
    <div className="pt-30">
      <label htmlFor={nametype} className="form-label text-lg fw-medium color-palette-1 mb-10">
        {label}
      </label>
      <input
        type="text"
        className="form-control rounded-pill text-lg"
        id={id}
        name={id}
        aria-describedby={id}
        placeholder={`Enter your ${id}`}
        {...nativeProps}
      />
    </div>
  );
}
