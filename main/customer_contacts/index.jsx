import React, { useState, useEffect, useRef, useContext } from "react";

import { v4 as uuidv4 } from "uuid";
import { ContactsTable } from "../contacts.table.jsx";
import { ContactsRenderer } from "./contact.renderer";
import { DataContext } from "../index.jsx";
import ContainerWrapper from "../../components/container.wrapper.jsx";
import { ErrorBoundary } from "../../widgets/errorboundary.jsx";
import { CustomerDetails, CustomerContactForm } from "./customer.details.jsx";
import {
  Modal,
  Button,
  BUTTON_TYPE,
  confirmModal,
  BUTTON_SHAPE,
} from "../../widgets/index.jsx";
import userNames from "../userNames.json";
import Title from "../common/title.jsx";
import {
  notificationMessage,
  isValidPhoneNumber,
  validateEmail,
} from "../utils/helper.js";
import {
  DATA_TYPE,
  NOTIFICATION_KEYS,
  CONTACT_DATA_KEYS,
  BUTTON_TEXT_NAMES,
} from "../utils/contants.js";

import { AddIcon, EditIcon, DeleteIcon } from "../assets/index.jsx";

import styles from "../styles.css";

const uuid = uuidv4();

export function CustomerContacts({ onDataModify, onDataAddition }) {
  const { customerData, openNotification } = useContext(DataContext);
  const instanceModalRef = useRef(null);

  const [hoveredRow, setHoveredRow] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isFooterModalOpen, setIsFooterModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState({});

  const [contactTypeDropDown, setContactTypeDropDown] = useState([]);
  const [inputValue, setInputValue] = useState({
    name: "",
    emailValue: "",
    contactTypeDropdownValue: "",
    jobTitle: "",
    phoneNumber: "",
  });

  const contactTableState = {
    inputValue,
    contactTypeDropDown,
    inputValue,
    setHoveredRow(data) {
      setHoveredRow(data);
    },
    setContactTypeDropDown(data) {
      setContactTypeDropDown(data);
    },
    setInputValue(data) {
      setInputValue(data);
    },
    onDropDownValueChange(data, record) {
      onDropDownValueChange(data, record);
    },
  };

  function onDropDownValueChange(value, record) {
    setSelectedRecord(record);
    setInputValue({
      ...inputValue,
      contactTypeDropdownValue: value,
    });
  }

  const columns = [
    {
      title: "Name",
      dataIndex: CONTACT_DATA_KEYS.USER_NAME,
      key: CONTACT_DATA_KEYS.USER_NAME,
      width: 100,
      render: (name, record) => {
        return (
          <ContactsRenderer
            name={name}
            record={record}
            type={CONTACT_DATA_KEYS.USER_NAME}
          />
        );
      },
    },
    {
      title: "Contact type",
      dataIndex: CONTACT_DATA_KEYS.SOURCE_VALUE,
      key: CONTACT_DATA_KEYS.SOURCE_VALUE,
      width: 100,
      render: (name, record) => {
        return (
          <ContactsRenderer
            name={name}
            record={record}
            type={CONTACT_DATA_KEYS.SOURCE_VALUE}
          />
        );
      },
    },
    {
      title: "Email",
      dataIndex: CONTACT_DATA_KEYS.EMAIL,
      key: CONTACT_DATA_KEYS.EMAIL,
      width: 100,
      render: (name, record) => {
        return (
          <ContactsRenderer
            name={name}
            record={record}
            type={CONTACT_DATA_KEYS.EMAIL}
          />
        );
      },
    },
    {
      width: 50,
      render: (record) => {
        return (
          <div
            className={`${styles.actionButtons} ${
              record._id === hoveredRow ? styles.visible : styles.hidden
            }`}
          >
            <Button
              type={BUTTON_TYPE.TEXT}
              shape={BUTTON_SHAPE.circle}
              buttonToolTip={BUTTON_TEXT_NAMES.DELETE}
              onClick={() => {
                instanceModalRef.current = confirmModal({
                  onConfirm: () => onConfirm(record),
                  onCancel,
                  title: "Are you sure ?",
                  content: `Do you really want to delete the contact ${record.user_name}`,
                });
              }}
              icon={<DeleteIcon />}
            />
            <Button
              type={BUTTON_TYPE.TEXT}
              shape={BUTTON_SHAPE.circle}
              buttonToolTip={BUTTON_TEXT_NAMES.EDIT}
              onClick={() => {
                setIsShowModal(!isShowModal);
                setSelectedRecord(record);
              }}
              icon={<EditIcon />}
            />
          </div>
        );
      },
    },
  ];

  function onConfirm(record) {
    onDataModify(customerData, record, true, DATA_TYPE.CUSTOMER_DATA);
    onCancel();
  }

  function onCancel() {
    instanceModalRef.current.destroy();
  }

  function onClose() {
    setContactTypeDropDown("");
    setSelectedRecord("");
    setInputValue({
      name: "",
      emailValue: "",
      contactTypeDropdownValue: "",
      jobTitle: "",
      phoneNumber: "",
    });
    setIsShowModal(false);
  }

  function resetData() {
    setContactTypeDropDown("");
    setSelectedRecord("");
    setInputValue({
      name: "",
      emailValue: "",
      contactTypeDropdownValue: "",
      jobTitle: "",
      phoneNumber: "",
    });
    setIsShowModal(false);
  }

  function handleOnSaveData(formValues, updatedData) {
    const { inputValue } = updatedData;
    if (validateFields(inputValue)) {
      onDataModify(
        customerData,
        {
          ...formValues,
          user_name: inputValue.name,
          email: inputValue.emailValue,
          source_value: [inputValue.contactTypeDropdownValue],
          job_title: inputValue.jobTitle,
          phone_number: inputValue.phoneNumber,
        },
        false,
        DATA_TYPE.CUSTOMER_DATA
      );
      resetData();
    }
  }

  function handleAddData(data) {
    const { inputValue } = data;

    if (validateFields(inputValue)) {
      onDataAddition(
        customerData,
        {
          _id: uuid,
          user_name: inputValue.name,
          email: inputValue.emailValue,
          source_value: [inputValue.contactTypeDropdownValue],
          job_title: inputValue.jobTitle,
          phone_number: inputValue.phoneNumber,
          source_type: "others",
        },
        DATA_TYPE.CUSTOMER_DATA
      );
      resetData();
      setIsFooterModalOpen(false);
    }
  }

  function validateFields(inputValue) {
    const { emailValue, name, jobTitle, phoneNumber } = inputValue;
    if (!validateEmail(emailValue) && emailValue.trim() !== "") {
      notificationMessage(NOTIFICATION_KEYS.INVALID_EMAIL, openNotification);
      return false;
    } else if (!isValidPhoneNumber(phoneNumber) && phoneNumber.trim() !== "") {
      notificationMessage(NOTIFICATION_KEYS.INVALID_PHONE, openNotification);
      return false;
    } else if (!(name || emailValue || jobTitle || phoneNumber)) {
      notificationMessage(NOTIFICATION_KEYS.EMPTY_FIELDS, openNotification);
      return false;
    }
    notificationMessage(NOTIFICATION_KEYS.SUCCESS, openNotification);
    return true;
  }

  return (
    <ErrorBoundary>
      <ContainerWrapper
        Title={() =>
          Title({
            title: "Customer contacts",
            TitleRender: () => <span>({customerData.length})</span>,
          })
        }
        Footer={() => {
          return (
            <Button
              type={BUTTON_TYPE.TEXT}
              className={styles.footerButton}
              buttonTextClassName={styles.footerText}
              buttonText="Add contact"
              onClick={() => setIsFooterModalOpen(true)}
              icon={<AddIcon />}
            />
          );
        }}
      >
        <ContactsTable
          onDataAddition={onDataAddition}
          onDataModify={onDataModify}
          columns={columns}
          data={customerData}
          contactTableState={contactTableState}
          isShowModal={isShowModal}
          onClose={onClose}
          FormRenderer={CustomerDetails}
          modalTitle={"Edit customer contact"}
          selectedRecord={selectedRecord}
          handleOnSaveData={handleOnSaveData}
        />
        <AddCustomerContactDetails
          isModalOpen={isFooterModalOpen}
          internalFormStates={contactTableState}
          modalTitle="New customer contact"
          handleOnCancel={() => setIsFooterModalOpen(false)}
          handleOnSave={handleAddData}
        />
      </ContainerWrapper>
    </ErrorBoundary>
  );
}

export function AddCustomerContactDetails({
  isModalOpen,
  modalTitle = "",
  handleOnCancel,
  handleOnSave,
  internalFormStates,
}) {
  useEffect(() => {
    internalFormStates.setContactTypeDropDown(userNames);
  }, []);

  return (
    <ErrorBoundary>
      <Modal
        title={modalTitle}
        isModalOpen={isModalOpen}
        handleOnSave={() => handleOnSave(internalFormStates)}
        handleOnCancel={handleOnCancel}
        width={400}
        footer={[
          <Button
            key="cancel"
            type={BUTTON_TYPE.LINK}
            buttonText={"Cancel"}
            onClick={handleOnCancel}
          />,
          <Button
            key="save"
            type={BUTTON_TYPE.PRIMARY}
            buttonText={"Save"}
            onClick={() => handleOnSave(internalFormStates)}
          />,
        ]}
      >
        <CustomerContactForm customerFormStates={internalFormStates} />
      </Modal>
    </ErrorBoundary>
  );
}
