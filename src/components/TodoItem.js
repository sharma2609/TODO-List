import React, { useState, useEffect } from "react";
import "./TodoItem.css";

const TodoItem = ({ todo, onToggle, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    // Check if this is a new item (created within last 100ms)
    const now = new Date().getTime();
    const created = new Date(todo.createdAt).getTime();
    if (now - created < 100) {
      setIsNew(true);
      const timer = setTimeout(() => setIsNew(false), 300);
      return () => clearTimeout(timer);
    }
  }, [todo.createdAt]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete();
    }, 200);
  };

  return (
    <div
      className={`todo-item ${todo.completed ? "completed" : ""} ${
        todo.isUrgent ? "urgent" : ""
      } ${isDeleting ? "deleting" : ""} ${isNew ? "new" : ""}`}
    >
      <div className="todo-content">
        <button
          className="toggle-button"
          onClick={onToggle}
          aria-label={
            todo.completed ? "Mark as incomplete" : "Mark as complete"
          }
        >
          <div className={`checkbox ${todo.completed ? "checked" : ""}`}>
            <div className="checkbox-inner">
              {todo.completed && (
                <svg className="checkmark" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6L5 9L10 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </div>
        </button>

        <div className="todo-details">
          <div className="todo-text-container">
            <span className="todo-text">{todo.text}</span>
            {todo.isUrgent && (
              <div className="urgent-indicator">
                <div className="urgent-pulse"></div>
              </div>
            )}
          </div>

          <div className="todo-meta">
            <span className={`category-badge ${todo.category}`}>
              <div className="category-dot"></div>
              {todo.category}
            </span>
            <span className="date-badge">{formatDate(todo.createdAt)}</span>
          </div>
        </div>
      </div>

      <button
        className="delete-button"
        onClick={handleDelete}
        aria-label="Delete task"
      >
        <div className="delete-icon">
          <div className="delete-line"></div>
          <div className="delete-line"></div>
        </div>
      </button>
    </div>
  );
};

export default TodoItem;
