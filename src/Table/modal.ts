export interface iColumn {
  accessor: string
  header: string
  widthPercentage?: string
  textAlign?: string
}
export default interface iTableProps {
  columns: iColumn[]
  height?: number
  data: any[]
  searchValue?: string
  deleteOnClick?: (e: any, item: any) => any
  editOnClick?: (e: any, item: any) => any
  resetPasswordOnClick?: (item: any) => any
  selectedRows?: string[]
  handleClickCheckBox?: (x: string) => any
  handleClickAllCheckBox?: () => any
  actionColumnWidth?: number // this is used when loading is in progress only
  paginationComponent?: any
  firstButtonComponent?: any
  secondButtonComponent?: any
  actionButtonComponents?: any
  showSelectRow?: boolean
  showPagination?: boolean
}
