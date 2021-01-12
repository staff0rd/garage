import React from "react";
import MaterialTable, { Column, Action } from "material-table";
import { tableIcons } from "./tableIcons";
import Paper from "@material-ui/core/Paper";

type StandardTableProps<RowData extends object> = {
  columns: Column<RowData>[];
  data: RowData[];
  actions?: (Action<RowData> | ((rowData: RowData) => Action<RowData>))[];
  title?: string | React.ReactElement<any>;
};

export const StandardTable = <RowData extends object>(
  props: StandardTableProps<RowData>
) => {
  const { columns, data, actions, title } = props;

  return (
    <MaterialTable
      columns={columns}
      data={data}
      actions={actions}
      title={title}
      options={{
        pageSizeOptions: [],
        padding: "dense",
        actionsColumnIndex: -1,
      }}
      localization={{
        pagination: {
          labelRowsSelect: "",
        },
      }}
      components={{
        Container: (props) => <Paper {...props} elevation={0} />,
      }}
      icons={tableIcons}
    />
  );
};
