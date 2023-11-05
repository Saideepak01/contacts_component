import React from "react";
import { createRoot } from "react-dom/client";
import "./reset.css";
import "./variables.css";
import { ConfigProvider } from "antd";
import App from "../main/index.jsx";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#531CAB",
        borderRadius: 4,
        colorLink: "#531CAB",
      },
    }}
  >
    <App />
  </ConfigProvider>
);
