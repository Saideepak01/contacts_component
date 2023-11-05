import React from "react";

import styles from "./styles.css";

export const ContactsCount = ({ title, data }) => (
  <div className={styles.titleWrapper}>
    <div className={styles.titleText}>{title}</div>{" "}
    <div className={styles.customerCount}>({data.length})</div>
  </div>
);
