import { useState } from "react";

import "./index.css";
import List from "./List";
import Alert from "./Alert";
import { type } from "@testing-library/user-event/dist/type";

function AppJs() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  function handleButton() {
    if (!name) {
      showAlert(true, "danger", "pelease enter value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id == editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );

      setName("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "success", "İtem change");
    } else {
      showAlert(true, "success", "item added to the list");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  }

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "empty List");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "removeItem");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  };

  return (
    <section className="section-center">
      <div className="form">
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <h3 className="title">Grocery Bud</h3>
        <input
          type="text"
          placeholder="Add Item"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleButton}>{isEditing ? "Edit" : "Add"}</button>
      </div>
      {list.length > 0 && (
        <div className="grocery-container">
          <List list={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-Buttoon" onClick={clearList}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  );
}

export default AppJs;
