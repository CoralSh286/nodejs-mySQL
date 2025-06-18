import React from 'react';
import './style.css';

const FormInputs = ({ editingFor, inputsValue={} }) => {
  const formInputsArray = {
    todos: [
      {
        name: "title",
        type: "text",
        placeholder: "Enter title",
        required: true,
      },
      {
        name: "completed",
        type: "checkbox",
        placeholder: "",
        required: false,
      },
    ],
    posts: [
      {
        name: "title",
        type: "text",
        placeholder: "Enter title",
        required: true,
      },
      {
        name: "body",
        type: "textarea",
        placeholder: "Enter body",
        required: true,
      },
    ],
    albums: [
      {
        name: "title",
        type: "text",
        placeholder: "Enter title",
        required: true,
      },
    ],
    comments: [
      {
        name: "name",
        type: "text",
        placeholder: "Enter name",
        required: true,
      },
      {
        name: "email",
        type: "email",
        placeholder: "Enter email",
        required: true,
      },
      {
        name: "body",
        type: "textarea",
        placeholder: "Enter body",
        required: true,
      },
    ],
    photos: [
      {
        name: "title",
        type: "text",
        placeholder: "Enter title",
        required: true,
      },
      {
        name: "url",
        type: "url",
        placeholder: "Enter URL",
        required: true,
      },
      {
        name: "thumbnailUrl",
        type: "url",
        placeholder: "Enter thumbnail URL",
        required: true,
      },
    ]
  };

  // Check if editingFor is valid before trying to access inputs
  const inputs = formInputsArray[editingFor] || [];

  // Return early if editingFor is invalid
  if (!formInputsArray[editingFor]) {
    return <div className="error-message">Invalid form type: {editingFor}</div>;
  }

  return (
    <div className="form-inputs">
      {inputs.map((input) => (
        <div className="form-group" key={input.name}>
          <label htmlFor={input.name}>
            {input.name.charAt(0).toUpperCase() + input.name.slice(1)}
            {input.required && <span className="required">*</span>}
          </label>
          
          {input.type === 'textarea' ? (
            <textarea
              id={input.name}
              name={input.name}
              placeholder={input.placeholder}
              required={input.required}
              defaultValue={inputsValue?.[input.name] || ''}
            />
          ) : input.type === 'checkbox' ? (
            <input
              id={input.name}
              type="checkbox"
              name={input.name}
              defaultChecked={Boolean(inputsValue?.[input.name])}
            />
          ) : (
            <input
              id={input.name}
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              required={input.required}
              defaultValue={inputsValue?.[input.name] || ''}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default FormInputs;