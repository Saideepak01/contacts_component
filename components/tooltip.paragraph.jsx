import React, { useState } from "react";

import { Typography } from "antd";
import { Tooltip } from "../widgets/index.jsx";

const { Text } = Typography;

export const TooltipParagraph = React.memo(
  ({ children, ellipsis, className }) => {
    const [truncated, setTruncated] = useState(false);

    return (
      <Tooltip title={truncated ? children : undefined}>
        <Text
          className={className}
          ellipsis={{ ...ellipsis, onEllipsis: setTruncated }}
        >
          <>{children}</>
        </Text>
      </Tooltip>
    );
  }
);
