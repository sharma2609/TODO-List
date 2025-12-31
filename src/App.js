import React, { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("nothing-todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("nothing-todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text, category = "personal", isUrgent = false) => {
    const newTodo = {
      id: Date.now(),
      text,
      category,
      isUrgent,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const clearAll = () => {
    if (window.confirm("Clear all tasks?")) {
      setTodos([]);
    }
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case "personal":
        return todos.filter((todo) => todo.category === "personal");
      case "work":
        return todos.filter((todo) => todo.category === "work");
      case "others":
        return todos.filter((todo) => todo.category === "others");
      case "urgent":
        return todos.filter((todo) => todo.isUrgent);
      case "completed":
        return todos.filter((todo) => todo.completed);
      case "active":
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  };

  const stats = {
    total: todos.length,
    completed: todos.filter((todo) => todo.completed).length,
    urgent: todos.filter((todo) => todo.isUrgent && !todo.completed).length,
    personal: todos.filter(
      (todo) => todo.category === "personal" && !todo.completed
    ).length,
    work: todos.filter((todo) => todo.category === "work" && !todo.completed)
      .length,
    others: todos.filter(
      (todo) => todo.category === "others" && !todo.completed
    ).length,
  };

  return (
    <div className="app">
      <div className="app-container">
        {/* Left Panel - Input */}
        <div className="left-panel">
          <header className="header">
            <div className="logo">
              <div className="dot"></div>
              <h1>Tasks</h1>
            </div>
            <p className="subtitle">Nothing but productivity</p>
          </header>

          <TodoForm onAddTodo={addTodo} />

          <div className="stats-section">
            <div className="stats-grid">
              <div className="stat-item primary">
                <span className="stat-number">{stats.total}</span>
                <span className="stat-label">Total</span>
              </div>
              <div className="stat-item urgent">
                <span className="stat-number">{stats.urgent}</span>
                <span className="stat-label">Urgent</span>
              </div>
            </div>

            <div className="category-stats">
              <div className="category-stat">
                <span className="category-name">Personal</span>
                <span className="category-count">{stats.personal}</span>
              </div>
              <div className="category-stat">
                <span className="category-name">Work</span>
                <span className="category-count">{stats.work}</span>
              </div>
              <div className="category-stat">
                <span className="category-name">Others</span>
                <span className="category-count">{stats.others}</span>
              </div>
            </div>
          </div>

          <div className="actions">
            {stats.completed > 0 && (
              <button className="action-btn" onClick={clearCompleted}>
                Clear Completed
              </button>
            )}
            {stats.total > 0 && (
              <button className="action-btn danger" onClick={clearAll}>
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Right Panel - Tasks Display */}
        <div className="right-panel">
          <div className="filter-section">
            <div className="filter-row">
              <div className="filter-group">
                <button
                  className={`filter-tab ${filter === "all" ? "active" : ""}`}
                  onClick={() => setFilter("all")}
                >
                  All
                </button>
                <button
                  className={`filter-tab ${
                    filter === "urgent" ? "active" : ""
                  }`}
                  onClick={() => setFilter("urgent")}
                >
                  Urgent
                </button>
                <button
                  className={`filter-tab ${
                    filter === "completed" ? "active" : ""
                  }`}
                  onClick={() => setFilter("completed")}
                >
                  Completed
                </button>
              </div>
            </div>

            <div className="filter-row">
              <div className="filter-group categories">
                <button
                  className={`filter-tab category ${
                    filter === "personal" ? "active" : ""
                  }`}
                  onClick={() => setFilter("personal")}
                >
                  Personal
                </button>
                <button
                  className={`filter-tab category ${
                    filter === "work" ? "active" : ""
                  }`}
                  onClick={() => setFilter("work")}
                >
                  Work
                </button>
                <button
                  className={`filter-tab category ${
                    filter === "others" ? "active" : ""
                  }`}
                  onClick={() => setFilter("others")}
                >
                  Others
                </button>
              </div>
            </div>
          </div>

          <TodoList
            todos={getFilteredTodos()}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
            filter={filter}
          />

          {getFilteredTodos().length === 0 && todos.length > 0 && (
            <div className="empty-state">
              <div className="empty-animation">
                <div className="empty-dot"></div>
                <div className="empty-rings">
                  <div className="ring"></div>
                  <div className="ring"></div>
                </div>
              </div>
              <p>No tasks in this view</p>
              <span>Try switching categories or add new tasks</span>
            </div>
          )}

          {todos.length === 0 && (
            <div className="empty-state">
              <div className="empty-animation">
                <div className="empty-dot"></div>
                <div className="empty-rings">
                  <div className="ring"></div>
                  <div className="ring"></div>
                </div>
              </div>
              <p>No tasks yet</p>
              <span>Add your first task to get started</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
