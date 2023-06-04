import * as React from 'react'
import styles from './styles.module.css'
import Table from './Table'
// eslint-disable-next-line no-unused-vars
import iTableProps from './Table/modal'

interface Props {
  text: string
}

export const ExampleComponent = ({ text }: Props) => {
  return <div className={styles.test}>Example Component: {text}</div>
}
export const ReactResponsiveTableCustomizable = ({
  columns,
  data,
  searchValue,
  deleteOnClick,
  editOnClick,
  resetPasswordOnClick,
  actionButtonComponents,
  actionColumnWidth,
  selectedRows,
  handleClickCheckBox,
  handleClickAllCheckBox
}: iTableProps) => {
  return (
    // <Table
    //   columns={Columns}
    //   data={data}
    //   showPagination={false}
    //   showSelectRow={false}
    // />
    <Table
      // height={500}
      columns={columns}
      data={data}
      searchValue={searchValue}
      deleteOnClick={deleteOnClick}
      editOnClick={editOnClick}
      resetPasswordOnClick={resetPasswordOnClick}
      actionButtonComponents={actionButtonComponents}
      actionColumnWidth={actionColumnWidth}
      selectedRows={selectedRows}
      handleClickCheckBox={handleClickCheckBox}
      handleClickAllCheckBox={handleClickAllCheckBox}
    />
  )
}
