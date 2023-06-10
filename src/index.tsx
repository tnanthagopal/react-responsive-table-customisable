import React from 'react'
import Table from './Table'
// eslint-disable-next-line no-unused-vars
import { iTableProps } from './Table/modal'

const ReactResponsiveTableCustomizable = ({
  height,
  columns,
  data,
  searchValue,
  actionButtonComponents,
  actionColumnWidth,
  selectedRows,
  handleClickCheckBox,
  handleClickAllCheckBox,
  paginationComponent,
  showSelectRow,
  showPagination
}: iTableProps) => {
  return (
    <Table
      height={height}
      columns={columns}
      data={data}
      searchValue={searchValue}
      actionButtonComponents={actionButtonComponents}
      actionColumnWidth={actionColumnWidth}
      selectedRows={selectedRows}
      handleClickCheckBox={handleClickCheckBox}
      handleClickAllCheckBox={handleClickAllCheckBox}
      paginationComponent={paginationComponent}
      showSelectRow={showSelectRow}
      showPagination={showPagination}
    />
  )
}
export default ReactResponsiveTableCustomizable
