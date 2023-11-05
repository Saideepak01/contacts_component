import React from "react";

import { Tag as AntTag } from "antd";
import { Tooltip } from "./tooltip";

export const TAG_COLOR = {
  default: "default",
  green: "green",
  orange: "orange",
  blue: "blue",
  geekblue: "geekblue",
};

export function Tag({ tags, handleTagClose, closable, multiTag, color }) {
  const [firstTag, ...otherTags] = tags;
  let combinedTag = otherTags.length >= 1 ? `+${otherTags.length}` : "";

  return !multiTag ? (
    tags.map((tag) => (
      <AntTag
        key={tag}
        closable={closable}
        color={TAG_COLOR[color]}
        onClose={() => handleTagClose(tag)}
      >
        {tag}
      </AntTag>
    ))
  ) : (
    <Tooltip
      title={combinedTag > 1 && otherTags.map((item) => <div>{item}</div>)}
    >
      <AntTag key={firstTag} closable={closable}>
        {firstTag} <br />
        {combinedTag > 1 && `${combinedTag}`}
      </AntTag>
    </Tooltip>
  );
}
