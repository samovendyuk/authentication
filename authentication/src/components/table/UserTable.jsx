import Table from "react-bootstrap/Table";
import styles from "./user.module.css";
import { useEffect, useState } from "react";

import ToolBar from "../toolbar/ToolBar";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [needUpdate, setUpdate] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4200/users", { method: "GET" })
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, []);

  function checkedInput() {
    const selectAll = document.querySelector("input[id=select-all]");
    const allInput = document.querySelectorAll("input[id=checkboxNoLabel]");
    for (let i = 0; i < allInput.length; i++) {
      if (selectAll.checked) {
        allInput[i].checked = true;
      } else {
        allInput[i].checked = false;
      }
    }
  }

  // const handleUpdateTable = () => {
  //   console.log("update");
  //   setUpdate(!needUpdate);
  // };

  return (
    <>
      <ToolBar />
      <Table
        striped
        bordered
        hover
        size="sm"
        className={styles.table}
        style={{ width: "80vw", marginLeft: "50px" }}
      >
        <thead>
          <tr>
            <th>
              <input
                class="form-check-input"
                type="checkbox"
                id="select-all"
                value=""
                aria-label="..."
                onClick={checkedInput}
              />
            </th>
            <th>Name / Possition</th>
            <th>email</th>
            <th>Last login</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users
            ? users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="checkboxNoLabel"
                      value=""
                      aria-label="..."
                    />
                  </td>
                  <td>
                    {user.name}
                    <br />
                    {user.position}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.lastlogin}</td>
                  <td>{user.status}</td>
                </tr>
              ))
            : "not data"}
        </tbody>
      </Table>
    </>
  );
};

export default UserTable;
