import React from "react";
import {
  TableHead,
  TableCell,
  Tooltip,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";

/**
 * props.headCell = [
 *    {
        id: "name", //key of Json-obj, which is required to perfom sorting
        isActive: true, //  it should be 'true', if sorting is required. Otherwise it's value should be 'false'
        label: "col-name-1", // Table-column-name
      },
      {
        id: "obj.key",
        isActive: true,
        label: "col-name-2",
      },
    ]
 */

export default function EnhancedTableHead(props: any) {
  const { order, orderBy, headCell } = props;

  const createSortHandler = (property: string | number) => (event: any) => {
    console.log("property", property);
    props.onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCell &&
          headCell.map((n: any) => {
            if (n.isActive) {
              return (
                <TableCell key={headCell.id}>
                  <Tooltip title="Sort" enterDelay={300}>
                    <TableSortLabel
                      active={orderBy === n.id}
                      direction={orderBy === n.id ? order : "asc"}
                      onClick={createSortHandler(n.id)}
                    >
                      {n.label}
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              );
            } else {
              return (
                <TableCell key={headCell.id}>
                  {n.label}
                </TableCell>
              );
            }
          })}
      </TableRow>
    </TableHead>
  );
};
