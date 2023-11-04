import React from "react";

import { Modal as AntModal, ConfigProvider } from "antd";
import { Button } from "./button";

export function Modal({
  title,
  isModalOpen,
  handleOnSave,
  handleOnCancel,
  footer = null,
  children,
  width
}) {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 4,
        },
      }}
    >
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
    </ConfigProvider>
  );
}

export const confirmModal = ({ onConfirm, onCancel, title, content }) => {
  return AntModal.confirm({
    title,
    content,
    footer: () => (
      <>
        <Button buttonText="Cancel" onClick={onCancel} />
        <Button
          type="primary"
          buttonText="Confirm"
          size="medium"
          onClick={onConfirm}
        />
      </>
    ),
  });
};
