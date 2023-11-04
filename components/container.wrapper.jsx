import React from "react";

import styles from "./styles.css";

export default function ContainerWrapper({ children, Title, Footer }) {
  return (
    <div className={styles.container}>
      <Title />
      <hr className={styles.lineBreak} />
      {children}
      <div className={styles.footerWrap}>
        {Footer && <Footer />}
      </div>
    </div>
  );
}
