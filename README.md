# react-responsive-table-customisable

> Responsive, customisable react-table

[![NPM](https://img.shields.io/npm/v/react-responsive-table-customisable.svg)](https://www.npmjs.com/package/react-responsive-table-customisable) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-responsive-table-customisable
```
## Demo


## Usage

```tsx
import React from 'react'
import  ReactResponsiveTableCustomizable   from 'react-responsive-table-customisable'


export const columns = [
  {
    header: 'Email',
    accessor: 'email',
    widthPercentage: '40%'
  },
  {
    header: 'Name',
    accessor: 'name',
    widthPercentage: '30%'
  },
  {
    header: 'Password',
    accessor: 'password',
    widthPercentage: '30%'
  }
]

const testData = [
  {
    id: '1',
    email: 'test@test.com',
    name: 'test test',
    password: ''
  },
  {
    id: '2',
    email: 'test2@test.com',
    name: 'test test',
    password: ''
  },
  {
    id: '3',
    email: 'test3@test.com',
    name: 'test test',
    password: ''
  },
  {
    id: '4',
    email: 'test4@test.com',
    name: 'test test',
    password: ''
  },
  {
    id: '5',
    email: 'test5@test.com',
    name: 'test test',
    password: ''
  },
  {
    id: '6',
    email: 'test6@test.com',
    name: 'test test',
    password: ''
  },
  {
    id: '7',
    email: 'test7@test.com',
    name: 'test test',
    password: ''
  },
  {
    id: '8',
    email: 'test8@test.com',
    name: 'test test',
    password: ''
  },
  {
    id: '9',
    email: 'test9@test.com',
    name: 'test test',
    password: ''
  },
  {
    id: '10',
    email: 'test10@test.com',
    name: 'test test',
    password: ''
  },
  {
    id: '11',
    email: 'test11@test.com',
    name: 'test test',
    password: ''
  }
]

const editComponent = (item: any) => {
  return (
    <div
      onClick={(e) => console.log(e, item)}
    >
      <div>E</div>
    </div>
  )
}
const deleteComponent = (item: any) => {
  return (
    <div onClick={(e) => console.log(e, item)}>
      <div>D</div>
    </div>
  )
}
const moreComponent = (item: any) => {
  return (
    <div
      onClick={(e) => console.log(e, item)}
    >
      <div>M</div>
    </div>
  )
}

const App = () => {
  return (
      <ReactResponsiveTableCustomizable
        height={200}
        columns={columns}
        data={testData}
        searchValue={''}
        actionButtonComponents={[
          editComponent,
          deleteComponent,
          moreComponent,
        ]}
        selectedRows={[]}
        handleClickCheckBox={(id) => {
          console.log(id)
        }}
        handleClickAllCheckBox={() => {}}
      />
  )
}

export default App

```

## License

MIT © [tnanthagopal](https://github.com/tnanthagopal)
