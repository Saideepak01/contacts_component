import React from "react";

import { Tooltip as AntTooltip } from "antd";

export function Tooltip({ title, children, placement }) {
  return (
    <AntTooltip title={title} placement={placement}>
      {children}
    </AntTooltip>
  );
}
