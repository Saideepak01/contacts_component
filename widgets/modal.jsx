import React, { useCallback } from "react";

import { Modal as AntModal, ConfigProvider } from "antd";
import { Button, BUTTON_TYPE } from "./button";

export function Modal({
  title,
  isModalOpen,
  handleOnSave,
  handleOnCancel,
  footer = null,
  children,
  width,
}) {
  return (
    <AntModal
      title={title}
      open={isModalOpen}
      onOk={handleOnSave}
      onCancel={handleOnCancel}
      footer={footer}
      width={width}
      destroyOnClose={true}
    >
      {children}
    </AntModal>
  );
}

export const confirmModal = ({
  onConfirm,
  onCancel,
  title,
  content,
  cancelButtonText,
  saveButtonText,
}) => {
  return AntModal.confirm({
    title,
    content,
    footer: () => (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#531CAB",
            borderRadius: 4,
            colorLink: "#531CAB",
          },
        }}
      >
        <Button
          type={BUTTON_TYPE.LINK}
          buttonText={cancelButtonText}
          onClick={onCancel}
        />
        <Button
          type={BUTTON_TYPE.PRIMARY}
          buttonText={saveButtonText}
          onClick={onConfirm}
        />
      </ConfigProvider>
    ),
  });
};
