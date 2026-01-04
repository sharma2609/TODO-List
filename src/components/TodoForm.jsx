import React, { useState, useCallback } from "react";
import "./TodoForm.css";

const TodoForm = React.memo(({ onAddTodo }) => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("personal");
  const [isUrgent, setIsUrgent] = useState(false);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (text.trim()) {
        onAddTodo(text.trim(), category, isUrgent);
        setText("");
        setIsUrgent(false);
      }
    },
    [text, category, isUrgent, onAddTodo]
  );

  const handleTextChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const handleCategoryChange = useCallback((newCategory) => {
    setCategory(newCategory);
  }, []);

  const handleUrgencyToggle = useCallback(() => {
    setIsUrgent((prev) => !prev);
  }, []);

  const categories = ["personal", "work", "others"];

  return (
    <div className="todo-form-container">
      <form className="todo-form" onSubmit={handleSubmit}>
        <div className="input-section">
          <div className="input-wrapper">
            <input
              type="text"
              value={text}
              onChange={handleTextChange}
              placeholder="What needs to be done?"
              className="task-input"
              maxLength={120}
              autoComplete="off"
            />
            <div className="input-border"></div>
          </div>
        </div>

        <div className="form-controls">
          <div className="category-selector">
            <label className="control-label">Category</label>
            <div className="category-buttons">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-btn ${category === cat ? "active" : ""}`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  <span className="category-icon" aria-hidden="true"></span>
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
              onClick={handleUrgencyToggle}
              aria-pressed={isUrgent}
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
              <div className="plus-icon" aria-hidden="true"></div>
            </div>
          </div>
          <div className="button-ripple" aria-hidden="true"></div>
        </button>
      </form>
    </div>
  );
});

TodoForm.displayName = "TodoForm";

export default TodoForm;
