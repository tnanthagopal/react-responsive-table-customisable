export interface iColumn {
  accessor: string
  header: string
  widthPercentage?: string
  textAlign?: string
  sortColumn?: string
}
export interface iTableProps {
  columns: iColumn[]
  height?: number
  data: any[]
  searchValue?: string
  selectedRows?: string[]
  handleClickCheckBox?: (x: string) => any
  handleClickAllCheckBox?: () => any
  actionColumnWidth?: number // this is used when loading is in progress only
  paginationComponent?: any
  actionButtonComponents?: any
  showSelectRow?: boolean
  showPagination?: boolean
}
