import React from "react";

import { Table as AntTable, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export const TABLE_SIZE = {
  middle: "middle",
  small: "small",
}

export function Table({
  columns,
  data,
  showHeader,
  showPagination,
  size,
  scroll,
  loading,
  onRow,
  rowKey,
  tableStyle
}) {
  return (
    <Spin
      delay={0}
      spinning={loading}
      indicator={
        <LoadingOutlined
          style={{
            fontSize: 44,
          }}
          spin
        />
      }
    >
      <AntTable
        rowKey={rowKey}
        style={tableStyle}
        columns={columns}
        dataSource={data}
        showHeader={showHeader}
        pagination={showPagination}
        size={size}
        onRow={onRow}
        virtual
        scroll={scroll}
      />
    </Spin>
  );
}
