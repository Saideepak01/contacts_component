import React from "react";

import { Input, Tag } from "../widgets/index.jsx";

export function InputTags({
  type,
  label,
  placeholder,
  tags,
  inputValue,
  handleInputChange,
  handleInputConfirm,
  handleTagClose,
  closable,
  className,
  errorStatus,
}) {
  console.log(errorStatus)
  return (
    <Input
      type={type}
      label={label}
      placeholder={placeholder}
      inputValue={inputValue}
      className={className}
      handleInputChange={handleInputChange}
      handleInputConfirm={handleInputConfirm}
      errorStatus={errorStatus}
      prefix={
        <>
          <Tag
            tags={tags}
            handleTagClose={handleTagClose}
            closable={closable}
          />
        </>
      }
    />
  );
}
