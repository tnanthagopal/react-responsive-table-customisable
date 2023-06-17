import React, {
  Fragment,
  useRef,
  createRef,
  useState,
  useCallback,
  useEffect
} from 'react'
import {
  TableWrapper,
  HeaderItemWrapper,
  SideRowItem,
  RowItemWrapper,
  TableColumn,
  ActionsWrapper,
  TableColumnsWrapper,
  SelectWrapperOuter,
  TableColumns3rdWrapper,
  TableColumns2ndWrapper,
  ActionHeaderItem,
  TableBorders,
  TableStyles
} from './styles'
// eslint-disable-next-line no-unused-vars
import { iTableProps } from './modal'
import Pagination from './pagination'

const Index = ({
  columns,
  height,
  data,
  selectedRows,
  handleClickCheckBox,
  handleClickAllCheckBox,
  handleClickRow,
  searchValue,
  actionColumnWidth,
  paginationComponent,
  actionButtonComponents,
  showSelectRow = true,
  showPagination = true
}: iTableProps) => {
  // Data manipulation
  const [selectedPage, setSelectedPage] = useState(0)
  const [sortedColumn, setSortedColumn] = useState({
    accessor: '',
    sortColumn: '',
    searchColumn: '',
    up: false
  })
  const [pageSize, setPageSize] = useState(10)
  const filteredData = (data || []).filter((item) => {
    const filteredColumns = columns.filter((columnItem) => {
      return item[columnItem.searchColumn || columnItem.accessor]
        ?.toString()
        .includes(searchValue || '')
    })
    return !!filteredColumns.length
  })
  const sortedData =
    sortedColumn.accessor === ''
      ? filteredData
      : filteredData.sort((a, b) =>
          sortedColumn.up
            ? a[sortedColumn.sortColumn] > b[sortedColumn.sortColumn]
              ? 1
              : -1
            : a[sortedColumn.sortColumn] < b[sortedColumn.sortColumn]
            ? 1
            : -1
        )

  const pageCount = Math.ceil((sortedData?.length || pageSize) / pageSize)
  const dataToShow = showPagination
    ? sortedData.slice(
        selectedPage * pageSize,
        selectedPage * pageSize + pageSize
      )
    : sortedData
  data?.length < selectedPage * pageSize && setSelectedPage(0)

  const handleSortColumn = (
    accessor: string,
    sortColumn: string,
    searchColumn: string
  ) => {
    const up = accessor !== sortedColumn.accessor
    const newAccessor = !up && up === sortedColumn.up ? '' : accessor
    setSortedColumn({ accessor: newAccessor, sortColumn, up, searchColumn })
  }
  //! Data manipulation

  // Table Design
  const [screenWidth, setTableWrapperScreenWidth] = useState(1)
  const [, triggerRenderOnPageChange] = useState(selectedPage)
  const [, triggerRenderOnPageSizeChange] = useState(pageSize)
  const [, triggerRenderOnScreenResize] = useState(0)
  const [, triggerRenderOnSearchValueChange] = useState(searchValue)
  const tableWrapperRef = useRef<HTMLDivElement>(null)
  const tableColumnsWrapperRef = useRef<HTMLDivElement>(null)
  const ActionsWrapperRef = useRef<HTMLDivElement>(null)
  const columnRefs = useRef<any>([])
  columnRefs.current = columns.map(
    (_, i) => columnRefs.current[i] ?? createRef()
  )
  let TableColumnsWrapperMaxContentWidth = 0
  columns &&
    columns.map((_, i) => {
      const columnChildren = columnRefs?.current[i].current?.children
      const arrayFromColumnChildren = columnChildren
        ? Array.from(columnChildren)
        : []
      let columnContentWidth = 0
      arrayFromColumnChildren.map((rowItem: any) => {
        const rowContentWidth = rowItem?.firstChild?.offsetWidth
        columnContentWidth =
          rowContentWidth > columnContentWidth
            ? rowContentWidth
            : columnContentWidth
      })

      TableColumnsWrapperMaxContentWidth += columnContentWidth + 32
      // adding margins 32
    })
  const isWidthPercentageActive =
    (tableWrapperRef?.current?.offsetWidth || 0) >
    48 +
      // adding select column width 48
      (ActionsWrapperRef?.current?.offsetWidth || 0) +
      TableColumnsWrapperMaxContentWidth
  const [, triggerRenderOnWidthPercentageActiveChange] = useState(
    isWidthPercentageActive
  )
  const setTableWrapperWidth = useCallback(() => {
    // on resize update window width
    setTableWrapperScreenWidth(tableWrapperRef?.current?.offsetWidth || 0)
  }, [])
  useEffect(() => {
    window.addEventListener('resize', setTableWrapperWidth)
    return () => {
      window.removeEventListener('resize', setTableWrapperWidth)
    }
  }, [setTableWrapperWidth])
  const dataToShowHeight = dataToShow.length * 62
  const maxHeight =
    (tableWrapperRef?.current?.offsetHeight || 0) < dataToShowHeight + 56
      ? undefined
      : dataToShowHeight + 56 + 67 + 2
  const tableBordersHeight =
    (height || 0) > dataToShowHeight + 56 + 67
      ? dataToShowHeight + 56 + 67 + 2
      : height
  // 2 for borders

  useEffect(() => {
    triggerRenderOnPageChange(selectedPage)
  }, [triggerRenderOnPageChange, selectedPage])
  useEffect(() => {
    triggerRenderOnPageSizeChange(pageSize)
  }, [triggerRenderOnPageSizeChange, pageSize])
  useEffect(() => {
    triggerRenderOnScreenResize(screenWidth)
  }, [triggerRenderOnScreenResize, screenWidth])
  useEffect(() => {
    triggerRenderOnWidthPercentageActiveChange(isWidthPercentageActive)
  }, [triggerRenderOnWidthPercentageActiveChange, isWidthPercentageActive])
  useEffect(() => {
    triggerRenderOnSearchValueChange(searchValue)
  }, [triggerRenderOnSearchValueChange, searchValue])
  //! Table Design

  // console.log(' isWidthPercentageActive', isWidthPercentageActive)
  const PaginationComponent = paginationComponent || Pagination

  console.log('handleClickRow', !dataToShow.length)
  return (
    <div style={TableBorders({ height: tableBordersHeight, maxHeight })}>
      <div
        style={TableWrapper({
          height: tableBordersHeight,
          noData: !dataToShow.length
        })}
        ref={tableWrapperRef}
      >
        {showSelectRow && (
          <div style={SelectWrapperOuter({ isWidthPercentageActive })}>
            <div
              style={TableStyles.SelectWrapper}
              id='selectWrapperElem'
              onScroll={() => {
                const selectWrapperElemScrollTop =
                  document.getElementById('selectWrapperElem')?.scrollTop || 0
                const tableColumnsWrapperElem = document.getElementById(
                  'tableColumnsWrapperElem'
                ) || {
                  scrollTop: 0
                }
                tableColumnsWrapperElem.scrollTop = selectWrapperElemScrollTop
                const actionsWrapperElem = document.getElementById(
                  'actionsWrapperElem'
                ) || {
                  scrollTop: 0
                }
                actionsWrapperElem.scrollTop = selectWrapperElemScrollTop
              }}
            >
              <div style={TableStyles.SelectHeaderItem}>
                <input
                  disabled={!dataToShow.length}
                  type='checkbox'
                  checked={(selectedRows || []).length === data.length}
                  onClick={handleClickAllCheckBox}
                />
              </div>
              <div style={TableStyles.HeaderItemPositionAdjustment} />
              {dataToShow.map((item, i) => (
                <div
                  style={SideRowItem({
                    selected: (selectedRows || [])?.indexOf(item?.id) > -1
                  })}
                  key={i}
                >
                  <input
                    type='checkbox'
                    checked={(selectedRows || [])?.indexOf(item?.id) > -1}
                    onClick={() =>
                      handleClickCheckBox && handleClickCheckBox(item?.id)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        <div
          style={TableColumns3rdWrapper({ isWidthPercentageActive })}
          id='tableColumns3ndWrapperElem'
          onScroll={() => {
            const test =
              document.getElementById('tableColumns3ndWrapperElem')
                ?.scrollLeft || 0
            console.log('isWidthPercentageActive', test)
          }}
        >
          <div
            style={TableColumns2ndWrapper({
              width: tableColumnsWrapperRef?.current?.offsetWidth || 0, // check this 0
              isWidthPercentageActive
            })}
          >
            <div
              style={TableColumnsWrapper({ isWidthPercentageActive })}
              ref={tableColumnsWrapperRef}
              id='tableColumnsWrapperElem'
              onScroll={() => {
                const tableColumnsWrapperElemScrollTop =
                  document.getElementById('tableColumnsWrapperElem')
                    ?.scrollTop || 0
                const selectWrapperElem = document.getElementById(
                  'selectWrapperElem'
                ) || {
                  scrollTop: 0
                }
                selectWrapperElem.scrollTop = tableColumnsWrapperElemScrollTop
                const actionsWrapperElem = document.getElementById(
                  'actionsWrapperElem'
                ) || {
                  scrollTop: 0
                }
                actionsWrapperElem.scrollTop = tableColumnsWrapperElemScrollTop
              }}
            >
              <div style={TableStyles.TableColumnsWrapperInner}>
                {columns.map((column, index) => {
                  return (
                    <div
                      style={TableColumn({
                        widthPercentage: isWidthPercentageActive
                          ? column.widthPercentage
                          : undefined
                      })}
                      key={column.accessor}
                      ref={columnRefs.current[index]}
                    >
                      <div
                        style={HeaderItemWrapper({
                          textAlign: column.textAlign,
                          width:
                            columnRefs?.current[index]?.current?.offsetWidth ||
                            500 // What is this 500
                        })}
                      >
                        <div style={TableStyles.HeaderItem}>
                          {column.header}
                          <div
                            style={TableStyles.ChevronWrapper}
                            onClick={() =>
                              handleSortColumn(
                                column.accessor,
                                column.sortColumn || column.accessor,
                                column.searchColumn || column.accessor
                              )
                            }
                          >
                            <div style={TableStyles.UpChevron}>
                              {(sortedColumn.accessor !== column.accessor ||
                                sortedColumn.up) && (
                                <Fragment>&#9650;</Fragment>
                              )}
                            </div>
                            <div style={TableStyles.DownChevron}>
                              {(sortedColumn.accessor !== column.accessor ||
                                !sortedColumn.up) && (
                                <Fragment>&#9650;</Fragment>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* added the below here to adjust the margin top and the width of column */}
                      <div style={TableStyles.HeaderItemPositionAdjustment}>
                        <div style={TableStyles.WidthMaxContent}>
                          {column.header}
                        </div>
                      </div>
                      {dataToShow.map((item, rowIndex) => {
                        return (
                          <div
                            style={RowItemWrapper({
                              selected:
                                (selectedRows || [])?.indexOf(item?.id) > -1,
                              textAlign: column.textAlign,
                              handleClickRowFunctionAvailable:
                                handleClickRow !== undefined
                            })}
                            key={rowIndex}
                            onClick={() =>
                              handleClickRow && handleClickRow(item?.id)
                            }
                          >
                            <div style={TableStyles.RowItem}>
                              {item[column.accessor] || ''}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
              {!dataToShow.length && (
                <div style={TableStyles.NoRecordFound}>No record found</div>
              )}
            </div>
          </div>
        </div>
        {actionButtonComponents && (
          <div
            style={ActionsWrapper({ isWidthPercentageActive })}
            ref={ActionsWrapperRef}
            id='actionsWrapperElem'
            onScroll={() => {
              const actionsWrapperElemScrollTop =
                document.getElementById('actionsWrapperElem')?.scrollTop || 0
              const tableColumnsWrapperElem = document.getElementById(
                'tableColumnsWrapperElem'
              ) || {
                scrollTop: 0
              }
              tableColumnsWrapperElem.scrollTop = actionsWrapperElemScrollTop
              const selectWrapperElem = document.getElementById(
                'selectWrapperElem'
              ) || {
                scrollTop: 0
              }
              selectWrapperElem.scrollTop = actionsWrapperElemScrollTop
            }}
          >
            <div style={TableStyles.ActionsColumn}>
              <div
                style={ActionHeaderItem({
                  width:
                    ActionsWrapperRef?.current?.offsetWidth ||
                    actionColumnWidth || // this is used when loading is in progress only
                    0 // 0 will be used when loading is in progress only
                })}
              >
                Action
              </div>
              <div style={TableStyles.HeaderItemPositionAdjustment}>Action</div>
              {dataToShow.map((item, i) => (
                <div
                  style={SideRowItem({
                    selected: (selectedRows || [])?.indexOf(item?.id) > -1
                  })}
                  key={i}
                >
                  <div style={TableStyles.ActionButtonsWrapper}>
                    {actionButtonComponents.map((el: any, i: number) => (
                      <Fragment key={i}>{el(item)}</Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {!!dataToShow.length && showPagination && (
        <PaginationComponent
          pageCount={pageCount}
          onPageChange={(index: number) => {
            setSelectedPage(index)
          }}
          selectedPage={selectedPage + 1}
          selectionValueList={['10', '20', '30']}
          selectionValueSuffix='/page'
          defaultSelectionListValue={String(pageSize)}
          onListValueChange={(value: string) => setPageSize(Number(value))}
          hideBorders={false}
        />
      )}
    </div>
  )
}

export default Index
