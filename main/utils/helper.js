import { NOTIFICATION_KEYS } from "./contants.js";

export function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export function isValidPhoneNumber(phoneNumber) {
  const phoneNumberPattern = /^\d{10}$/;
  return phoneNumberPattern.test(phoneNumber);
}

export function notificationMessage(notificationType, openNotification) {
  switch (notificationType) {
    case NOTIFICATION_KEYS.INVALID_EMAIL:
      openNotification(
        "error",
        "Invalid Email",
        "Please enter an email address"
      );
      break;
    case NOTIFICATION_KEYS.EMPTY_FIELDS:
      openNotification(
        "error",
        "Some fields are Empty",
        "Please fill all the required fields"
      );
      break;
    case NOTIFICATION_KEYS.INVALID_PHONE:
      openNotification(
        "error",
        "Invalid Phone number",
        "Please enter a valid phone number"
      );
    case NOTIFICATION_KEYS.SUCCESS:
      openNotification("success", "Successful", "Details have been added !");
    default:
      break;
  }
}
