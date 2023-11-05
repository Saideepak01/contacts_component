import React from "react";

import styles from "./styles.css";

export default function ContainerWrapper({ children, Title, Footer }) {
  return (
    <div className={styles.container}>
      <Title />
      <hr className={styles.lineBreak} />
      {children}
      <hr className={styles.lineBreak} />
      <div>
        {Footer && <Footer />}
      </div>
    </div>
  );
}
