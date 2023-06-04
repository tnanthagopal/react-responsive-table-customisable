import React from "react";
import { ReactResponsiveTableCustomizable } from "react-responsive-table-customisable";
import "react-responsive-table-customisable/dist/index.css";
import styles from "./styles.module.css";

export const Columns = [
  {
    header: "Email",
    accessor: "email",
    widthPercentage: "40%"
  },
  {
    header: "Name",
    accessor: "name",
    widthPercentage: "30%"
  },
  {
    header: "Password",
    accessor: "password",
    widthPercentage: "30%"
  }
];

const testData = [
  {
    "id": "1",
    "email": "test@test.com",
    "name": "test test",
    "password": ""

  }, {
    "id": "2",
    "email": "test2@test.com",
    "name": "test test",
    "password": ""

  }, {
    "id": "3",
    "email": "test3@test.com",
    "name": "test test",
    "password": ""

  }, {
    "id": "4",
    "email": "test4@test.com",
    "name": "test test",
    "password": ""

  }, {
    "id": "5",
    "email": "test5@test.com",
    "name": "test test",
    "password": ""

  }, {
    "id": "6",
    "email": "test6@test.com",
    "name": "test test",
    "password": ""

  }, {
    "id": "7",
    "email": "test7@test.com",
    "name": "test test",
    "password": ""

  }, {
    "id": "8",
    "email": "test8@test.com",
    "name": "test test",
    "password": ""

  }, {
    "id": "9",
    "email": "test9@test.com",
    "name": "test test",
    "password": ""

  }, {
    "id": "10",
    "email": "test10@test.com",
    "name": "test test",
    "password": ""

  }, {
    "id": "11",
    "email": "test11@test.com",
    "name": "test test",
    "password": ""

  }

];

const editComponent = (item:any) => {
  return <div
    className={styles.ActionButtonWrapper}
    onClick={(e) => console.log(e,item)}
  >
    <div>E</div>
  </div>;
};
const deleteComponent = (item:any) => {
  return <div
    className={styles.DeleteWrapper}
    onClick={(e) => console.log(e,item)}
  >
    <div>D</div>
  </div>;
};
const moreComponent = (item:any) => {
  return <div
    className={styles.ActionButtonWrapper}
    onClick={(e) => console.log(e,item)}
  >
    <div>M</div>
  </div>;
};

const App = () => {
  return <div style={{ padding: "50px" }}><ReactResponsiveTableCustomizable
    // height={500}
    columns={Columns}
    data={testData}
    searchValue={""}
    deleteOnClick={(_, item) => {
      console.log(item);
    }}
    editOnClick={(_, item) => {
      console.log(item);
    }}
    resetPasswordOnClick={item => {
      console.log(item);
    }}
    actionButtonComponents={[editComponent,deleteComponent,moreComponent,moreComponent,moreComponent]}
    // actionColumnWidth={86}
    selectedRows={[]}
    handleClickCheckBox={(id) => {
      console.log(id);
    }
    }
    handleClickAllCheckBox={() => {
    }}
  /></div>;

};

export default App;
