import React from "react";

import {
  ErrorBoundary,
  Button,
  BUTTON_TYPE,
  Modal,
} from "../../widgets/index.jsx";

export function ContactModal({
  isModalOpen,
  modalTitle,
  handleOnSave,
  handleOnCancel,
  FormRenderer,
  record,
  contactTableState,
  cancelButtonText,
  saveButtonText,
}) {
  return (
    <ErrorBoundary>
      <Modal
        title={modalTitle}
        isModalOpen={isModalOpen}
        handleOnSave={() => handleOnSave(record, contactTableState)}
        handleOnCancel={handleOnCancel}
        width={400}
        footer={[
          <Button
            key={cancelButtonText}
            type={BUTTON_TYPE.LINK}
            buttonText={cancelButtonText}
            onClick={handleOnCancel}
          />,
          <Button
            key={saveButtonText}
            type={BUTTON_TYPE.PRIMARY}
            buttonText={saveButtonText}
            onClick={() => handleOnSave(record, contactTableState)}
          />,
        ]}
      >
        <FormRenderer record={record} formConfigValues={contactTableState} />
      </Modal>
    </ErrorBoundary>
  );
}
