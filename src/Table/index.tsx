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
  TableBorders
} from './styles'
import styles from '../styles.module.css'
// eslint-disable-next-line no-unused-vars
import iTableProps from './modal'
import Pagination from './pagination'

const Index = ({
  columns,
  height,
  data,
  selectedRows,
  handleClickCheckBox,
  handleClickAllCheckBox,
  deleteOnClick,
  editOnClick,
  resetPasswordOnClick,
  searchValue,
  actionColumnWidth,
  paginationComponent,
  actionButtonComponents,
  showSelectRow = true,
  showPagination = true
}: iTableProps) => {
  // Data manipulation
  const [selectedPage, setSelectedPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const filteredData = (data || []).filter((item) => {
    const filteredColumns = columns.filter((columnItem) => {
      return item[columnItem.accessor]?.toString().includes(searchValue || '')
    })
    return !!filteredColumns.length
  })
  const pageCount = Math.ceil((filteredData?.length || pageSize) / pageSize)
  const dataToShow = showPagination
    ? filteredData.slice(
        selectedPage * pageSize,
        selectedPage * pageSize + pageSize
      )
    : filteredData
  data?.length < selectedPage * pageSize && setSelectedPage(0)
  //! Data manipulation

  // Table Design
  const [screenWidth, setTableWrapperScreenWidth] = useState(1)
  const [, triggerRenderOnPageChange] = useState(selectedPage)
  const [, triggerRenderOnPageSizeChange] = useState(pageSize)
  const [, triggerRenderOnScreenResize] = useState(0)
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
  //! Table Design

  console.log(resetPasswordOnClick, pageCount, setPageSize)

  console.log(' isWidthPercentageActive', isWidthPercentageActive)
  const PaginationComponent = paginationComponent || Pagination
  return (
    <div style={TableBorders({ height: tableBordersHeight, maxHeight })}>
      <div
        style={TableWrapper({ height: tableBordersHeight })}
        ref={tableWrapperRef}
      >
        {showSelectRow && (
          <div style={SelectWrapperOuter({ isWidthPercentageActive })}>
            <div
              className={styles.SelectWrapper}
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
              <div className={styles.SelectHeaderItem}>
                <input
                  type='checkbox'
                  checked={(selectedRows || []).length === data.length}
                  onClick={handleClickAllCheckBox}
                />
              </div>
              <div className={styles.HeaderItemPositionAdjustment} />
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
        <div style={TableColumns3rdWrapper({ isWidthPercentageActive })}>
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
                          (columnRefs?.current[index]?.current?.offsetWidth ||
                            500) - 32
                      })}
                    >
                      <div className={styles.HeaderItem}>{column.header}</div>
                    </div>
                    {/* added the below here to adjust the margin top and the width of column */}
                    <div className={styles.HeaderItemPositionAdjustment}>
                      <div className={styles.WidthMaxContent}>
                        {column.header}
                      </div>
                    </div>
                    {dataToShow.map((item, rowIndex) => {
                      return (
                        <div
                          style={RowItemWrapper({
                            selected:
                              (selectedRows || [])?.indexOf(item?.id) > -1,
                            textAlign: column.textAlign
                          })}
                          key={rowIndex}
                        >
                          <div className={styles.RowItem}>
                            {item[column.accessor] || ''}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        {(deleteOnClick || editOnClick) && (
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
            <div className={styles.ActionsColumn}>
              <div
                style={ActionHeaderItem({
                  width:
                    (ActionsWrapperRef?.current?.offsetWidth ||
                      actionColumnWidth || // this is used when loading is in progress only
                      0) - 32 // 0 will be used when loading is in progress only
                })}
              >
                Action
              </div>
              <div className={styles.HeaderItemPositionAdjustment}>Action</div>
              {dataToShow.map((item, i) => (
                <div
                  style={SideRowItem({
                    selected: (selectedRows || [])?.indexOf(item?.id) > -1
                  })}
                  key={i}
                >
                  <div className={styles.ActionButtonsWrapper}>
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
      {showPagination && (
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
