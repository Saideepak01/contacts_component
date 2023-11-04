import React from "react";

import { Avatar, Tag } from "../../widgets/index.jsx";
import { TooltipParagraph } from "../../components/tooltip.paragraph";
import { CONTACT_DATA_KEYS } from "../utils/contants.js";

import {
  UserProfileIcon,
  IntegrationsIcon,
  ThunderIcon,
} from "../assets/index.jsx";

import styles from "../styles.css";

const SOURCE_ICON = {
  auto: <ThunderIcon />,
  integrations: <IntegrationsIcon />,
  manual: <UserProfileIcon />,
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
            <TooltipParagraph ellipsis={true} className={styles.userRole}>
              {record.role}
            </TooltipParagraph>
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
            <Tag multiTag={true} tags={name} closable={false} />
          </div>
        </div>
      );
    }
    case CONTACT_DATA_KEYS.EMAIL: {
      return (
        <TooltipParagraph ellipsis={true} className={styles.emailContainer}>
          {name}
        </TooltipParagraph>
      );
    }
    default: {
      return null;
    }
  }
}
