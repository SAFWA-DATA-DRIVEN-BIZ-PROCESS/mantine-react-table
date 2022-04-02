import React, { FC } from 'react';
import { TableCell } from '@mui/material';
import { useMRT } from '../useMRT';
import type { MRT_Header } from '..';
import { MRT_TableSpacerCell } from '../table/MRT_TableSpacerCell';

interface Props {
  footer: MRT_Header;
}

export const MRT_TableFooterCell: FC<Props> = ({ footer }) => {
  const {
    muiTableFooterCellProps,
    enableColumnResizing,
    tableInstance,
    tableInstance: { getState },
  } = useMRT();

  const { isDensePadding } = getState();

  const isParentHeader = !!footer.column.columns?.length;

  const mTableFooterCellProps =
    muiTableFooterCellProps instanceof Function
      ? muiTableFooterCellProps(footer.column)
      : muiTableFooterCellProps;

  const mcTableFooterCellProps =
    footer.column.muiTableFooterCellProps instanceof Function
      ? footer.column.muiTableFooterCellProps(footer.column)
      : footer.column.muiTableFooterCellProps;

  const tableCellProps = {
    ...footer.getFooterProps(),
    ...mTableFooterCellProps,
    ...mcTableFooterCellProps,
  };

  const footerElement =
    footer.column?.Footer?.({
      footer,
      tableInstance,
    }) ??
    footer.column.footer ??
    null;

  if (footer.isPlaceholder) {
    return <MRT_TableSpacerCell />;
  }

  return (
    <TableCell
      align={isParentHeader ? 'center' : 'left'}
      variant="head"
      {...tableCellProps}
      sx={{
        fontWeight: 'bold',
        verticalAlign: 'text-top',
        p: isDensePadding ? '0.5rem' : '1rem',
        transition: `all ${enableColumnResizing ? '10ms' : '0.2s'} ease-in-out`,
        //@ts-ignore
        ...tableCellProps?.sx,
      }}
    >
      {footerElement}
    </TableCell>
  );
};
