/** @format */

import React from "react";
import { IoAddOutline } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import "./style.css";
import { usePopup } from "../../helper/UsePopUp/usePopUp";
import EditorPopUp from "../EditorPopUp/EditorPopUp";
import DeletePopUp from "../DeletePopUp/DeletePopUp";

// This component is used to display a CRUD bar with add, delete, and edit buttons
// It is used in the Post, Album, and Todo components

export default function CrudBar({
  updateFunction,
  editingFor,
  selected,
  onDelete,
  additionalData,
  refetchFunction,
}) {
  
  const { openPopup, closePopup } = usePopup();
  const isItemBelongsToUser = (message) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (editingFor === "comments" && selected.email != user.email) {
      openPopup({
        content: (
          <div className="popupmessage" id="popup">
            <span>{`you cennot ${message} comment that are not yours`}</span>
            <button className="close-btn" onClick={closePopup}>
              ×
            </button>
          </div>
        ),
      });
      return false;
    }
    return true;
  };
  const openPopupForEdit = () => {
    if (!isItemBelongsToUser("edit")) return;
    openPopup({
      content: (
        <EditorPopUp
          isNew={false}
          updateFunction={updateFunction}
          refetchFunction={refetchFunction}
          inputsValue={selected}
          additionalData={additionalData}
          onClose={closePopup}
          editingFor={editingFor}
        />
      ),
    });
  };
  const openPopupForCreate = () => {
    openPopup({
      content: (
        <EditorPopUp
          isNew={true}
          updateFunction={updateFunction}
          refetchFunction={refetchFunction}
          onClose={closePopup}
          additionalData={additionalData}
          editingFor={editingFor}
        />
      ),
    });
  };
  const openPopupForDelete = () => {
    if (!isItemBelongsToUser("delete")) return;

    openPopup({
      content: <DeletePopUp onDelete={onDelete} onClose={closePopup} />,
      title: "Delete",
    });
  };
  return (
    <div className="hover-crud-bar">
      <button
        className="crud-button add-button"
        title={`Add new ${editingFor}`}
        onClick={() => openPopupForCreate()}
      >
        <IoAddOutline />
      </button>

      <button
        className="crud-button delete-button"
        title={`Delete ${editingFor}`}
        onClick={() => openPopupForDelete()}
        disabled={!selected}
      >
        <AiFillDelete />
      </button>

      <button
        className="crud-button edit-button"
        title={`Edit ${editingFor}`}
        onClick={() => openPopupForEdit()}
        disabled={!selected}
      >
        <MdModeEditOutline />
      </button>
    </div>
  );
}
