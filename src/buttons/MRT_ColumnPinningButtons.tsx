import React, { FC } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import type { MRT_Column, MRT_TableInstance } from '..';

interface Props {
  column: MRT_Column;
  tableInstance: MRT_TableInstance;
}

export const MRT_ColumnPinningButtons: FC<Props> = ({
  column,
  tableInstance,
}) => {
  const {
    options: {
      icons: { PushPinIcon },
      localization,
    },
  } = tableInstance;

  const handlePinColumn = (pinDirection: 'left' | 'right' | false) => {
    column.pin(pinDirection);
  };

  return (
    <Box sx={{ mr: '8px' }}>
      {column.getIsPinned() ? (
        <Tooltip arrow title={localization.unpin}>
          <IconButton onClick={() => handlePinColumn(false)} size="small">
            <PushPinIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Tooltip arrow title={localization.pinToLeft}>
            <IconButton onClick={() => handlePinColumn('left')} size="small">
              <PushPinIcon
                style={{
                  transform: 'rotate(90deg)',
                }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip arrow title={localization.pinToRight}>
            <IconButton onClick={() => handlePinColumn('right')} size="small">
              <PushPinIcon
                style={{
                  transform: 'rotate(-90deg)',
                }}
              />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Box>
  );
};
