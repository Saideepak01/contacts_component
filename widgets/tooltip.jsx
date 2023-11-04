import React from "react";

import { Tooltip as AntTooltip, ConfigProvider } from "antd";

export function Tooltip({ title, children, placement }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 4,
        },
      }}
    >
      <AntTooltip title={title} placement={placement}>
        {children}
      </AntTooltip>
    </ConfigProvider>
  );
}
