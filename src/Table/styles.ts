export const TableBorders = (props: {
  height?: number
  maxHeight?: number
}) => {
  const styleObj: any = {}
  styleObj.height = props.height ? `${props.height}px` : '100%'
  if (props.maxHeight) {
    styleObj.maxHeight = `${props.maxHeight}px`
  }
  return {
    border: '1px solid #e9e9e9',
    overflow: 'hidden', // if it gives problem remove this and radius
    borderRadius: '8px',
    width: '100%',
    ...styleObj
  }
}
export const TableWrapper = (props: { height?: number }) => {
  const styleObj: any = {}
  if (props.height) {
    styleObj.height = `${props.height - 67}px`
  } else {
    styleObj.height = 'max-content'
    styleObj.maxHeight = `calc(100% - 67px)`
  }
  return {
    overflow: 'hidden',
    width: '100%',
    display: 'flex',
    ...styleObj
  }
}
export const SelectWrapperOuter = (props: {
  isWidthPercentageActive?: boolean
}) => {
  const styleObj: any = {}
  if (!props.isWidthPercentageActive) {
    styleObj.boxShadow = `0px -6px 8px rgba(0, 0, 0, 0.15)`
  }
  return {
    width: '48px',
    borderRight: '#8c8c8c',
    overflow: 'hidden',
    zIndex: 1,
    ...styleObj
  }
}
export const ActionsWrapper = (props: {
  isWidthPercentageActive?: boolean
}) => {
  const styleObj: any = {}
  if (!props.isWidthPercentageActive) {
    styleObj.boxShadow = `0px -5px 8px rgba(0, 0, 0, 0.15)`
  }
  return {
    width: 'max-content',
    borderRight: '#8c8c8c',
    overflow: 'scroll',
    zIndex: 1,
    ...styleObj
  }
}
export const TableColumns3rdWrapper = (props: {
  isWidthPercentageActive: boolean
}) => {
  const styleObj: any = {}
  styleObj.overflowX = props.isWidthPercentageActive ? 'hidden' : 'scroll'
  if (!props.isWidthPercentageActive) {
    styleObj.overscrollBehaviorX = 'contain'
  }
  return {
    flex: 1,
    overflowY: 'hidden',
    position: 'relative',
    ...styleObj
  }
}
export const TableColumns2ndWrapper = (props: {
  width: number
  isWidthPercentageActive: boolean
}) => {
  const styleObj: any = {}
  styleObj.width = props.isWidthPercentageActive
    ? '100%'
    : `${props.width - 15}px`
  return {
    height: '100%',
    overflow: 'hidden',
    ...styleObj
  }
}
export const TableColumnsWrapper = (props: {
  isWidthPercentageActive: boolean
}) => {
  const styleObj: any = {}
  styleObj.width = props.isWidthPercentageActive ? '100%' : 'max-content'
  return {
    display: 'flex',
    height: '100%',
    overflowY: 'scroll',
    paddingRight: '15px',
    ...styleObj
  }
}
export const TableColumn = (props: { widthPercentage?: string }) => {
  const styleObj: any = {}
  if (props.widthPercentage) {
    styleObj.width = props.widthPercentage
  }
  return {
    minWidth: 'max-content',
    ...styleObj
  }
}
export const ActionHeaderItem = (props: { width: number }) => {
  return {
    height: '24px',
    borderBottom: '1px solid #e9e9e9',
    padding: '16px',
    position: 'absolute',
    backgroundColor: '#ffffff',
    fontWeight: '700',
    textAlign: 'right',
    borderTopRightRadius: '8px',
    width: props.width
  } as any
}
export const HeaderItemWrapper = (props: {
  width?: number
  textAlign?: string
}) => {
  const styleObj: any = {}
  if (props.width) {
    styleObj.width = `${props.width}px`
  }
  if (props.textAlign) {
    styleObj.textAlign = props.textAlign
  }
  return {
    height: '24px',
    padding: '16px',
    borderBottom: '1px solid #e9e9e9',
    position: 'absolute',
    backgroundColor: '#ffffff',
    ...styleObj
  }
}
export const RowItemWrapper = (props: {
  textAlign?: string
  selected?: boolean
}) => {
  const styleObj: any = {}
  if (props.selected) {
    styleObj.background = '#f4f8fa'
  }
  if (props.textAlign) {
    styleObj.textAlign = props.textAlign
  }
  return {
    height: '30px',
    borderBottom: '1px solid #e9e9e9',
    padding: '16px',
    ...styleObj
  }
}
export const SideRowItem = (props: { selected?: boolean }) => {
  const styleObj: any = {}
  if (props.selected) {
    styleObj.background = '#f4f8fa'
  }
  return {
    height: '30px',
    borderBottom: '1px solid #e9e9e9',
    padding: '16px',
    ...styleObj
  }
}
