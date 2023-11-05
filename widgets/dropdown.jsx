import React from "react";

import { Select as AntSelect, ConfigProvider } from "antd";

import styles from "./styles.css";

export function DropDown({
  title,
  placeholder,
  defaultValue = "",
  width,
  options = [],
  handleOnChange,
  value,
  className,
  errorStatus,
}) {
  return (
    <>
      <div className={styles.labelStyle}>{title}</div>
      <AntSelect
        defaultValue={defaultValue}
        placeholder={placeholder}
        style={{
          width,
        }}
        className={className}
        onChange={handleOnChange}
        value={value}
        status={errorStatus && "error"}
      >
        {options.length > 0 &&
          options.map((option) => (
            <AntSelect.Option key={option._id} value={option.value}>
              {option.value}
            </AntSelect.Option>
          ))}
      </AntSelect>
    </>
  );
}
