import React, { useState, useEffect, useContext } from "react";

import { DropDown, Input } from "../../widgets/index.jsx";
import { InputTags } from "../../components/input.tags.jsx";
import { DataContext } from "../index.jsx";

import styles from "../styles.css";

export function InternalDetails({ record, formConfigValues }) {
  const { internalData } = useContext(DataContext);
  const { setInputValue, setUserNamesDropDown } = formConfigValues;

  const [tagsInputValue, setTagsInputValue] = useState("");

  useEffect(() => {
    if (record) {
      setInputValue({
        tags: record.source_value,
        dropDownValue: record.user_name,
        emailValue: record.email,
      });
    }
    const userNames = internalData.map((item) => {
      return {
        label: item._id,
        value: item.user_name,
      };
    });
    setUserNamesDropDown(userNames);
  }, [internalData]);

  const internalFormStates = {
    setTagsInputValue(data, setTagsInputValuecallback) {
      setTagsInputValue(data, setTagsInputValuecallback);
    },
    ...formConfigValues,
  };

  return (
    <InternalContactForm
      record={record}
      tagsInputValue={tagsInputValue}
      internalFormStates={internalFormStates}
    />
  );
}

export function InternalContactForm({
  tagsInputValue,
  internalFormStates,
  newData,
}) {
  const {
    inputValue,
    userNamesDropDown,
    setTagsInputValue,
    setInputValue,
    handleInputTagConfirm,
    handleTagClose,
    onDropDownValueChange,
  } = internalFormStates;

  return (
    <div>
      <DropDown
        title="User"
        placeholder="Select a user"
        width={350}
        handleOnChange={(value) => onDropDownValueChange(value, newData)}
        className={styles.dropDown}
        value={inputValue.dropDownValue}
        options={userNamesDropDown}
      />
      <InputTags
        type={"text"}
        label="User category"
        placeholder="Select user category(s)..."
        tags={inputValue.tags}
        className={styles.inputTags}
        inputValue={tagsInputValue}
        closable={true}
        handleInputChange={(e) => setTagsInputValue(e.target.value)}
        handleInputConfirm={() =>
          handleInputTagConfirm(tagsInputValue, setTagsInputValue)
        }
        handleTagClose={handleTagClose}
      />
      <Input
        type="text"
        inputValue={inputValue.emailValue}
        label="Email address"
        placeholder="Enter your email address"
        handleInputChange={(e) =>
          setInputValue({ ...inputValue, emailValue: e.target.value })
        }
      />
    </div>
  );
}
