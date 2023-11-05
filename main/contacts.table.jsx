import React from "react";

import { Table, ErrorBoundary, TABLE_SIZE } from "../widgets/index.jsx";
import { ContactModal } from "./common/contact.modal.jsx";
import { BUTTON_TEXT_NAMES } from "./utils/contants.js";

export function ContactsTable({
  onDataAddition,
  onDataModify,
  columns,
  data,
  contactTableState,
  isShowModal,
  onClose,
  modalTitle,
  FormRenderer,
  selectedRecord,
  handleOnSaveData,
}) {
  const { setHoveredRow } = contactTableState;

  const handleMouseEnter = (record) => {
    setHoveredRow(record._id);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  return (
    <ErrorBoundary>
      <Table
        columns={columns}
        rowKey="_id"
        data={data.length ? data : []}
        showPagination={false}
        loading={!data.length}
        showHeader={false}
        onRow={(record) => ({
          onMouseEnter: () => handleMouseEnter(record),
          onMouseLeave: handleMouseLeave,
        })}
        size={TABLE_SIZE.small}
        tableStyle={{ width: "600px", height: "355px" }}
        scroll={{
          x: 200,
          y: 350,
        }}
      />
      <ContactModal
        isModalOpen={isShowModal}
        modalTitle={modalTitle}
        onDataAddition={onDataAddition}
        onDataModify={onDataModify}
        data={data}
        FormRenderer={FormRenderer}
        record={isShowModal ? selectedRecord : []}
        handleOnSave={handleOnSaveData}
        handleOnCancel={onClose}
        contactTableState={contactTableState}
        cancelButtonText={BUTTON_TEXT_NAMES.CANCEL}
        saveButtonText={BUTTON_TEXT_NAMES.SAVE}
      />
    </ErrorBoundary>
  );
}
