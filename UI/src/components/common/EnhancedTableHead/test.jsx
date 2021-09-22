import React from "react";
import {
  TableHead,
  TableCell,
  Tooltip,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";

import EnhancedTableHead from '.';

export default function TableExample(props: any) {

  return (
    <div>
      <EnhancedTableHead
        numSelected={props.selected.length}
        order={props.sortType}
        orderBy={props.sortBy}
        onRequestSort={props.handleRequestSort}
        rowCount={props.data.length}
        headCell={props.headCells}
      />
    </div>
  )
}