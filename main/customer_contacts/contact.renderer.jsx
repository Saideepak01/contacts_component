import React from "react";

import { Avatar, Tag, TAG_COLOR } from "../../widgets/index.jsx";
import { TooltipParagraph } from "../../components/tooltip.paragraph";
import { CONTACT_DATA_KEYS } from "../utils/contants.js";

import {
  PersonCardIcon,
  IntegrationsIcon,
  UserProfileIcon,
} from "../assets/index.jsx";

import styles from "../styles.css";

const SOURCE_ICON = {
  auto: <UserProfileIcon />,
  integrations: <IntegrationsIcon />,
  others: <PersonCardIcon />,
};

const TAG_TYPE = {
  primary: TAG_COLOR.blue,
  secondary: TAG_COLOR.geekblue,
  others: TAG_COLOR.default,
  purchaser: TAG_COLOR.orange,
  payer: TAG_COLOR.green,
};

export function ContactsRenderer({ name, record, type }) {
  switch (type) {
    case CONTACT_DATA_KEYS.USER_NAME: {
      return (
        <div className={styles.userNameContainer}>
          <Avatar
            size={25}
            text={name}
            style={{
              backgroundColor: "var(--bg-extra-light-purple)",
              color: "var(--bg-base-purple)",
              fontSize: "10px",
            }}
          />
          <div className={styles.nameProfileCell}>
            <TooltipParagraph ellipsis={true} className={styles.userDetails}>
              {name}
            </TooltipParagraph>
            {record.job_title ? (
              <TooltipParagraph ellipsis={true} className={styles.userRole}>
                {record.job_title}
              </TooltipParagraph>
            ) : (
              ""
            )}
          </div>
        </div>
      );
    }
    case CONTACT_DATA_KEYS.SOURCE_VALUE: {
      return (
        <div className={styles.sourceValueContainer}>
          <div className={styles.sourceIcons}>
            {SOURCE_ICON[record.source_type]}
          </div>
          <div>
            <Tag
              tags={name}
              closable={false}
              color={TAG_TYPE[name[0].toLowerCase()]}
            />
          </div>
        </div>
      );
    }
    case CONTACT_DATA_KEYS.EMAIL: {
      return (
        <>
          <TooltipParagraph ellipsis={true} className={styles.emailContainer}>
            {name}
          </TooltipParagraph>
          <br />
          <TooltipParagraph ellipsis={true} className={styles.emailContainer}>
            {record.phone_number}
          </TooltipParagraph>
        </>
      );
    }
    default: {
      return null;
    }
  }
}
