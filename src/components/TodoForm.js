import React, { useState } from "react";
import "./TodoForm.css";

const TodoForm = ({ onAddTodo }) => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("personal");
  const [isUrgent, setIsUrgent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text.trim(), category, isUrgent);
      setText("");
      setIsUrgent(false);
    }
  };

  return (
    <div className="todo-form-container">
      <form className="todo-form" onSubmit={handleSubmit}>
        <div className="input-section">
          <div className="input-wrapper">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What needs to be done?"
              className="task-input"
              maxLength={120}
            />
            <div className="input-border"></div>
          </div>
        </div>

        <div className="form-controls">
          <div className="category-selector">
            <label className="control-label">Category</label>
            <div className="category-buttons">
              {["personal", "work", "others"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-btn ${category === cat ? "active" : ""}`}
                  onClick={() => setCategory(cat)}
                >
                  <span className="category-icon"></span>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="urgency-selector">
            <label className="control-label">Priority</label>
            <button
              type="button"
              className={`urgency-toggle ${isUrgent ? "active" : ""}`}
              onClick={() => setIsUrgent(!isUrgent)}
            >
              <div className="toggle-switch">
                <div className="toggle-slider"></div>
              </div>
              <span className="toggle-label">
                {isUrgent ? "Urgent" : "Normal"}
              </span>
            </button>
          </div>
        </div>

        <button
          type="submit"
          className={`add-button ${text.trim() ? "ready" : ""}`}
          disabled={!text.trim()}
        >
          <div className="button-content">
            <span className="button-text">Add Task</span>
            <div className="button-icon">
              <div className="plus-icon"></div>
            </div>
          </div>
          <div className="button-ripple"></div>
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
