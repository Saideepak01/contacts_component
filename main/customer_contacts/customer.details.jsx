import React, { useEffect } from "react";

import { DropDown, Input } from "../../widgets/index.jsx";
import contactTypes from "../contactTypes.json";

import styles from "../styles.css";

export function CustomerDetails({ record, formConfigValues }) {
  const { setContactTypeDropDown, setInputValue } = formConfigValues;

  useEffect(() => {
    if (record) {
      setInputValue({
        name: record.user_name,
        emailValue: record.email,
        contactTypeDropdownValue: record.source_value,
        jobTitle: record.job_title,
        phoneNumber: record.phone_number,
      });
    }
    setContactTypeDropDown(contactTypes);
  }, []);

  return <CustomerContactForm record={record} customerFormStates={formConfigValues} />;
}

export function CustomerContactForm({ record, customerFormStates }) {
  const { inputValue, setInputValue, onDropDownValueChange } =
    customerFormStates;

  return (
    <div>
      <Input
        type="text"
        inputValue={inputValue.name}
        label="Name of contact"
        className={styles.inputTags}
        placeholder="Enter a name..."
        handleInputChange={(e) =>
          setInputValue({ ...inputValue, name: e.target.value })
        }
      />
      <Input
        type="text"
        inputValue={inputValue.emailValue}
        label="Email address"
        className={styles.inputTags}
        placeholder="Enter a email address..."
        handleInputChange={(e) =>
          setInputValue({ ...inputValue, emailValue: e.target.value })
        }
      />
      <DropDown
        title="Contact type"
        placeholder="Select a contact type..."
        width={180}
        handleOnChange={(value) => onDropDownValueChange(value, record)}
        className={styles.dropDown}
        value={inputValue.contactTypeDropdownValue}
        options={contactTypes}
      />
      <hr className={styles.lineBreak} />
      <div className={styles.optionalText}>Optional</div>
      <Input
        type="text"
        inputValue={inputValue.jobTitle}
        label="Job title"
        className={styles.inputTags}
        placeholder="Enter a job title..."
        handleInputChange={(e) =>
          setInputValue({ ...inputValue, jobTitle: e.target.value })
        }
      />
      <Input
        type="text"
        inputValue={inputValue.phoneNumber}
        label="Phone number"
        className={styles.inputTags}
        placeholder="Enter a phone number..."
        handleInputChange={(e) =>
          setInputValue({ ...inputValue, phoneNumber: e.target.value })
        }
      />
    </div>
  );
}
