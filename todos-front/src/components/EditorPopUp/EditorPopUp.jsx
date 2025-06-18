/** @format */

import React from "react";
import "./style.css";
import { apiRequest } from "../../service/api";
import FormInputs from "../FormInputs/FormInputs";

export default function EditorPopUp({
  isNew,
  onClose,
  inputsValue,
  editingFor,
  additionalData = {},
  updateFunction,
  refetchFunction,
}) {
  const subTitle = isNew ? "Create" : "Edit";

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemId = inputsValue?.id ? `/${inputsValue.id}` : "";
    const formData = new FormData(e.target);
    const formEntries = Object.fromEntries(formData.entries());
    const checkboxes = e.target.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      formEntries[checkbox.name] = checkbox.checked;
    });

    const apiRoutes = {
      todos: {
        post: "todos/add-task",
        put: "todos/update-task" + itemId,
      },
      posts: {
        post: "posts/add-post",
        put: "posts/update-post" + itemId,
      },
      comments: {
        post: "comments/add-comment",
        put: "comments/update-comment" + itemId,
      },
    };
    apiRequest({
      url: apiRoutes[editingFor][isNew ? "post" : "put"],
      method: isNew ? "post" : "put",
      body: { ...formEntries, ...additionalData },
    }).then((res) => {
      if (!res || res.success === false) {
        onClose();
        return;
      }
      const itemChanged = res.data;
      updateFunction((prevData) => {
        if (isNew) {
          return [...prevData, res.data];
        } else {
          return prevData.map((item) =>
            item.id === res.data.id ? res.data : item
          );
        }
      });
    });
    onClose();
  };

  return (
    <div className="editor-popup-overlay">
      <div className="editor-popup">
        <div className="editor-popup-header">
          <h2 className="editor-popup-title">{subTitle + " " + editingFor}</h2>
          <button
            type="button"
            className="editor-popup-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="editor-popup-content">
          <form onSubmit={handleSubmit}>
            <FormInputs
              editingFor={editingFor}
              isNew={isNew}
              inputsValue={inputsValue}
            />

            <div className="editor-popup-actions">
              <button
                type="button"
                className="editor-popup-button cancel"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="editor-popup-button submit">
                {subTitle}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
