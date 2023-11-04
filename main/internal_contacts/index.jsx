import React, { useState, useRef, useContext, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";
import { ContactsTable } from "../contacts.table.jsx";
import { ContactsRenderer } from "./contact.renderer.jsx";
import { DataContext } from "../index.jsx";
import { CONTACT_DATA_KEYS } from "../utils/contants.js";
import { AddIcon, EditIcon, DeleteIcon } from "../assets/index.jsx";
import ContainerWrapper from "../../components/container.wrapper.jsx";
import {
  InternalDetails,
  InternalContactForm,
} from "../internal_contacts/internal.details.jsx";
import Title from "../common/title.jsx";
import userNames from "../userNames.json";
import {
  ErrorBoundary,
  Modal,
  Button,
  BUTTON_TYPE,
  confirmModal,
  BUTTON_SHAPE,
} from "../../widgets/index.jsx";
import { validateEmail, notificationMessage } from "../utils/helper.js";
import { NOTIFICATION_KEYS, DATA_TYPE, BUTTON_TEXT_NAMES } from "../utils/contants.js";

import styles from "../styles.css";

const uuid = uuidv4();
export function InternalContacts({ onDataModify, onDataAddition }) {
  const { internalData, openNotification } = useContext(DataContext);
  const instanceModalRef = useRef(null);

  const [hoveredRow, setHoveredRow] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isFooterModalOpen, setIsFooterModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState({});

  const [userNamesDropDown, setUserNamesDropDown] = useState([]);
  const [inputValue, setInputValue] = useState({
    tags: [],
    dropDownValue: "",
    emailValue: "",
  });

  const contactsCount = () => <span>(8)</span>;

  const contactTableState = {
    userNamesDropDown,
    inputValue,
    setHoveredRow(data) {
      setHoveredRow(data);
    },
    setUserNamesDropDown(data) {
      setUserNamesDropDown(data);
    },
    setInputValue(data) {
      setInputValue(data);
    },
    handleInputTagConfirm(data, setTagsInputValue) {
      handleInputTagConfirm(data, setTagsInputValue);
    },
    handleTagClose(data) {
      handleTagClose(data);
    },
    onDropDownValueChange(data, newData) {
      onDropDownValueChange(data, newData);
    },
  };

  function handleInputTagConfirm(tagsInputValue, setTagsInputValue) {
    if (tagsInputValue && inputValue.tags.indexOf(tagsInputValue) === -1) {
      setInputValue({
        ...inputValue,
        tags: [...inputValue.tags, tagsInputValue],
      });
    }
    setTagsInputValue("");
  }

  function handleTagClose(removedTag) {
    const updatedTags = inputValue.tags.filter((tag) => tag !== removedTag);
    setInputValue({ ...inputValue, tags: updatedTags });
  }

  function onDropDownValueChange(value, newData) {
    if (newData) {
      setInputValue({
        ...inputValue,
        dropDownValue: value,
      });
    } else {
      const data = internalData.filter((item) => {
        return item.user_name === value;
      })[0];
      setSelectedRecord(data);
      setInputValue({
        tags: data.source_value,
        dropDownValue: value,
        emailValue: data.email,
      });
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: CONTACT_DATA_KEYS.USER_NAME,
      key: CONTACT_DATA_KEYS.USER_NAME,
      width: 90,
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
      title: "Source value",
      dataIndex: CONTACT_DATA_KEYS.SOURCE_VALUE,
      key: CONTACT_DATA_KEYS.SOURCE_VALUE,
      width: 150,
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
      render: (name) => {
        return <ContactsRenderer name={name} type={CONTACT_DATA_KEYS.EMAIL} />;
      },
    },
    {
      width: 60,
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
              onClick={() => {
                setIsShowModal(!isShowModal);
                setSelectedRecord(record);
              }}
              buttonToolTip={BUTTON_TEXT_NAMES.EDIT}
              icon={<EditIcon />}
            />
          </div>
        );
      },
    },
  ];

  function onConfirm(record) {
    onDataModify(internalData, record, true);
    onCancel();
  }

  function onCancel() {
    instanceModalRef.current.destroy();
  }

  function onClose() {
    setUserNamesDropDown("");
    setInputValue({
      tags: [],
      emailValue: "",
      dropDownValue: "",
    });
    setIsShowModal(false);
  }

  function resetData() {
    setUserNamesDropDown("");
    setInputValue({
      tags: [],
      emailValue: "",
      dropDownValue: "",
    });
    setIsShowModal(false);
  }

  function handleOnSaveData(formValues, updatedData) {
    const { inputValue } = updatedData;

    if (validateFields(inputValue)) {
      onDataModify(
        internalData,
        {
          ...formValues,
          source_value: tags,
          email: emailValue,
        },
        false,
        DATA_TYPE.INTERNAL_DATA
      );
      resetData();
    }
  }

  function handleAddData(data) {
    const { inputValue } = data;

    if (validateFields(inputValue)) {
      onDataAddition(
        internalData,
        {
          _id: uuid,
          user_name: inputValue.dropDownValue,
          email: inputValue.emailValue,
          source_value: inputValue.tags,
          source_type: "manual",
        },
        DATA_TYPE.INTERNAL_DATA
      );
      resetData();
      setIsFooterModalOpen(false);
    }
  }

  function validateFields(inputValue) {
    const { tags, emailValue, dropDownValue } = inputValue;
    if (!validateEmail(emailValue) && emailValue.trim() !== "") {
      notificationMessage(NOTIFICATION_KEYS.INVALID_EMAIL, openNotification);
      return false;
    } else if (tags.length === 0 || !emailValue || !dropDownValue) {
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
          Title({ title: "Internal contacts", TitleRender: contactsCount })
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
          data={internalData}
          contactTableState={contactTableState}
          isShowModal={isShowModal}
          onClose={onClose}
          FormRenderer={InternalDetails}
          modalTitle={"Edit internal contact"}
          selectedRecord={selectedRecord}
          handleOnSaveData={handleOnSaveData}
        />
        <AddInternalContactDetails
          isModalOpen={isFooterModalOpen}
          internalFormStates={contactTableState}
          modalTitle="Add internal contact"
          handleOnCancel={() => setIsFooterModalOpen(false)}
          handleOnSave={handleAddData}
        />
      </ContainerWrapper>
    </ErrorBoundary>
  );
}

export function AddInternalContactDetails({
  isModalOpen,
  modalTitle = "",
  handleOnCancel,
  handleOnSave,
  internalFormStates,
}) {
  const [tagsInputValue, setTagsInputValue] = useState("");

  useEffect(() => {
    internalFormStates.setUserNamesDropDown(userNames);
  }, []);

  const addFormStates = {
    ...internalFormStates,
    setTagsInputValue(data) {
      setTagsInputValue(data);
    },
  };

  return (
    <ErrorBoundary>
      <Modal
        title={modalTitle}
        isModalOpen={isModalOpen}
        handleOnSave={() => handleOnSave(addFormStates)}
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
            onClick={() => handleOnSave(addFormStates)}
          />,
        ]}
      >
        <InternalContactForm
          newData={true}
          tagsInputValue={tagsInputValue}
          internalFormStates={addFormStates}
        />
      </Modal>
    </ErrorBoundary>
  );
}
