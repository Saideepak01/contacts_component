import React from "react";

import { Tooltip } from "../../widgets/index.jsx";

import styles from "./styles.css";

export default function Title({ title, TitleRender, Icon, tooltipText }) {
  return (
    <div>
      {title && <div>{title}</div>}
      {TitleRender && <TitleRender />}
      {Icon && (
        <div className={styles.cardActions}>
          <Tooltip title={tooltipText}>
            <img src={Icon} alt="title" />
          </Tooltip>
        </div>
      )}
    </div>
  );
}
