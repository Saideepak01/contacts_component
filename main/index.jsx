import React, { useState, useEffect, createContext } from "react";

import { InternalContacts } from "./internal_contacts/index.jsx";
import { CustomerContacts } from "./customer_contacts/index.jsx";
import {
  getCustomerContactDetails,
  getInternalContactDetails,
} from "./service/fetch.js";
import { Notification, ErrorBoundary } from "../widgets/index.jsx";
import { DATA_TYPE } from "./utils/contants.js";

import styles from "./styles.css";

export const DataContext = createContext(null);

export default function App() {
  const { openNotification, contextHolder } = Notification();
  const [internalData, setInternalData] = useState([]);
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const internalContacts = await getInternalContactDetails();
      const customerContacts = await getCustomerContactDetails();

      setInternalData(internalContacts);
      setCustomerData(customerContacts);
    }
    fetchData();
  }, []);

  const onDataAddition = (data, updatedData, key) => {
    key === DATA_TYPE.CUSTOMER_DATA
      ? setCustomerData([...data, updatedData])
      : setInternalData([...data, updatedData]);
  };

  const onDataModify = (data, updatedData, deleteData, key) => {
    let updatedDataValue;
    if (deleteData) {
      updatedDataValue = data.filter((item) => item._id !== updatedData._id);
    } else {
      updatedDataValue = data.map((item) =>
        item._id === updatedData._id ? updatedData : item
      );
    }
    key === DATA_TYPE.CUSTOMER_DATA
      ? setCustomerData(updatedDataValue)
      : setInternalData(updatedDataValue);
  };

  return (
    <ErrorBoundary>
      <DataContext.Provider
        value={{ internalData, customerData, openNotification }}
      >
        <div className={styles.mainContainerWrapper}>
          <InternalContacts
            onDataAddition={onDataAddition}
            onDataModify={onDataModify}
          />
          <CustomerContacts
            onDataAddition={onDataAddition}
            onDataModify={onDataModify}
          />
        </div>

        {/* for notification */}
        {contextHolder}
      </DataContext.Provider>
    </ErrorBoundary>
  );
}
