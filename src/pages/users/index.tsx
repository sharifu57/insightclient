import { Breadcrumb } from "antd";
import React, { useState } from "react";

interface Props {}

function UsersPage(props: Props) {
  const {} = props;
  const[loading, setLoading] = useState();
  const[users, setUsers]=useState();

  const getUsers = async () => {
    try{
        const res = await 
    }catch(e){
        console.error(e)
    }
  }

  return (
    <>
      <Breadcrumb
        items={[
          {
            title: <a href="">Home</a>,
          },
          {
            title: "Users",
          },
        ]}
      />
    </>
  );
}

export default UsersPage;
