import internalContactsModel from "../internalContactsModal.json";
import customerContactsModel from "../customerContactsModel.json";

import { getRandomInRange } from "../utils/helper.js";

const delay = getRandomInRange(1000, 3000);

export function getInternalContactDetails() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (internalContactsModel) {
        resolve(internalContactsModel);
      } else {
        reject(new Error("Error fetching data"));
      }
    }, delay);
  });
}

export function getCustomerContactDetails() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (customerContactsModel) {
        resolve(customerContactsModel);
      } else {
        reject(new Error("Error fetching data"));
      }
    }, delay);
  });
}
