import React from "react";

import { Avatar as AntAvatar } from "antd";

export function Avatar({ size, text, style }) {
  const avatarLetter = text
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .substring(0, 2);
  return (
    <AntAvatar style={style} size={size}>
      {avatarLetter}
    </AntAvatar>
  );
}
