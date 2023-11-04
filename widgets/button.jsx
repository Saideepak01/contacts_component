import React from "react";

import { Button as AntButton, ConfigProvider } from "antd";
import { Tooltip } from "./tooltip";

import styles from "./styles.css";

export const BUTTON_TYPE = {
  TEXT: "text",
  LINK: "link",
  PRIMARY: "primary",
};

export const BUTTON_STYLE = {
  [BUTTON_TYPE.TEXT]: "buttonTextStyle",
  [BUTTON_TYPE.LINK]: "buttonLinkStyle",
  [BUTTON_TYPE.PRIMARY]: "buttonPrimaryStyle",
};

export const BUTTON_SIZE = {
  small: "small",
  large: "large",
};

export const BUTTON_SHAPE = {
  circle: "circle",
  round: "round",
};

export function Button({
  type = "primary",
  icon,
  className,
  onClick,
  buttonText,
  buttonTextClassName,
  size,
  shape,
  buttonToolTip,
}) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#531CAB",
          borderRadius: 4,
          colorLink: "#531CAB",
        },
      }}
    >
      <Tooltip title={buttonToolTip}>
        <AntButton
          type={type}
          icon={icon}
          shape={BUTTON_SHAPE[shape]}
          className={`${className} ${styles[BUTTON_STYLE[type]]}`}
          onClick={onClick}
          size={size}
        >
          {buttonText && (
            <span className={buttonTextClassName}>{buttonText}</span>
          )}
        </AntButton>
      </Tooltip>
    </ConfigProvider>
  );
}
