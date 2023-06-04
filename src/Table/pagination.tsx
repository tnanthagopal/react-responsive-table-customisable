import React from 'react'

const Pagination = ({
  pageCount,
  onPageChange,
  selectedPage,
  selectionValueList,
  selectionValueSuffix,
  defaultSelectionListValue,
  onListValueChange,
  hideBorders
}: any) => {
  console.log(
    selectionValueList,
    selectionValueSuffix,
    defaultSelectionListValue,
    hideBorders,
    onListValueChange
  )
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'end',
        height: '34px',
        borderTop: '1px solid #e9e9e9',
        alignItems: 'center',
        padding: '16px'
      }}
    >
      <div>
        {Array(pageCount)
          .fill('')
          .map((_, i) => (
            <span
              onClick={() => onPageChange(i)}
              key={i}
              style={{
                textDecoration: i + 1 === selectedPage ? 'underline' : 'none'
              }}
            >
              {i + 1},
            </span>
          ))}
        Total {pageCount} Pages
      </div>
    </div>
  )
}

export default Pagination
