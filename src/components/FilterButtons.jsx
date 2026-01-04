import React from "react";
import "./FilterButtons.css";

const FilterButtons = ({
  currentFilter,
  onFilterChange,
  onClearCompleted,
  onClearAll,
  hasCompleted,
  hasAny,
}) => {
  const filters = [
    { key: "all", label: "📋 All", count: null },
    { key: "active", label: "⏳ Active", count: null },
    { key: "completed", label: "✅ Completed", count: null },
  ];

  return (
    <div className="filter-section">
      <div className="filter-buttons">
        {filters.map((filter) => (
          <button
            key={filter.key}
            className={`filter-button ${
              currentFilter === filter.key ? "active" : ""
            }`}
            onClick={() => onFilterChange(filter.key)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="action-buttons">
        {hasCompleted && (
          <button
            className="action-button clear-completed"
            onClick={onClearCompleted}
          >
            🧹 Clear Completed
          </button>
        )}
        {hasAny && (
          <button className="action-button clear-all" onClick={onClearAll}>
            🗑️ Clear All
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterButtons;
