import React from "react";

import { Input as AntInput } from "antd";

import styles from "./styles.css";

export function Input({
  type,
  label,
  placeholder,
  inputValue,
  handleInputChange,
  handleInputConfirm,
  prefix,
  className,
  errorStatus,
}) {
  return (
    <>
      <div className={styles.labelStyle}>{label}</div>
      <AntInput
        type={type}
        value={inputValue}
        className={className}
        onChange={handleInputChange}
        onPressEnter={handleInputConfirm}
        placeholder={placeholder}
        prefix={prefix}
        status={errorStatus && "error"}
      />
    </>
  );
}
