import { FaTrashAlt, FaRegEdit } from "react-icons/fa";

function List({ list, removeItem, editItem }) {
  return (
    <div className="liste">
      <h3 className="list-title">Liste Komponent</h3>
      {list.map((eleman) => {
        return (
          <section className="list-section" key={eleman.id}>
            <p className="list-p">{eleman.title}</p>
            <div className="button-container">
              <button onClick={() => editItem(eleman.id)}>
                <FaRegEdit />
              </button>
              <button onClick={() => removeItem(eleman.id)}>
                <FaTrashAlt />
              </button>
            </div>
          </section>
        );
      })}
    </div>
  );
}
export default List;
