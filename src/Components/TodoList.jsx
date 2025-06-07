import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaCheckCircle,
  FaRegCircle,
  FaCalendarAlt,
  FaTimes,
  FaFlag,
  FaListUl,
  FaHourglassHalf,
  FaCheck,
} from "react-icons/fa";

const PRIORITY_COLORS = {
  High: "#e74c3c",
  Medium: "#f39c12",
  Low: "#2ecc71",
};

const FILTERS = {
  ALL: "All",
  ACTIVE: "Active",
  COMPLETED: "Completed",
};

const ToDo = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState(FILTERS.ALL);

  const getToday = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const handleDueDateChange = (e) => {
    const val = e.target.value;
    if (val < getToday()) {
      setDueDate(getToday());
    } else {
      setDueDate(val);
    }
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTask = () => {
    if (!task.trim()) return;

    if (editingId !== null) {
     
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editingId
            ? { ...todo, text: task.trim(), priority, dueDate }
            : todo
        )
      );
      setEditingId(null);
    } else {
      setTodos((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: task.trim(),
          completed: false,
          priority,
          dueDate,
        },
      ]);
    }

    setTask("");
    setPriority("Medium");
    setDueDate("");
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTask = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setTask(todo.text);
    setPriority(todo.priority);
    setDueDate(todo.dueDate || "");
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === FILTERS.ALL) return true;
    if (filter === FILTERS.ACTIVE) return !todo.completed;
    if (filter === FILTERS.COMPLETED) return todo.completed;
  });

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.header}>📝 ToDo_List</h1>

        {}
        <div style={styles.inputRow}>
          <input
            style={styles.input}
            type="text"
            placeholder="Add or edit a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />

          <select
            style={{ ...styles.select, borderColor: PRIORITY_COLORS[priority] }}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            title="Select priority"
          >
            {Object.keys(PRIORITY_COLORS).map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>

          <input
            style={styles.dateInput}
            type="date"
            value={dueDate}
            min={getToday()}
            onChange={handleDueDateChange}
            title="Due date (today or later)"
          />

          <button style={styles.addBtn} onClick={addTask} title="Add or Save Task">
            <FaPlus />
          </button>
        </div>

        {}
        <div style={styles.filterRow}>
          {Object.values(FILTERS).map((f) => {
            let Icon;
            if (f === FILTERS.ALL) Icon = FaListUl;
            else if (f === FILTERS.ACTIVE) Icon = FaHourglassHalf;
            else if (f === FILTERS.COMPLETED) Icon = FaCheck;

            return (
              <button
                key={f}
                style={{
                  ...styles.filterBtn,
                  ...(filter === f ? styles.filterBtnActive : {}),
                }}
                onClick={() => setFilter(f)}
              >
                <Icon style={{ marginRight: 5 }} />
                {f}
              </button>
            );
          })}
          <button
            style={styles.clearBtn}
            onClick={clearCompleted}
            title="Clear Completed Tasks"
          >
            <FaTrash /> Clear Completed
          </button>
        </div>

        {}
        <ul style={styles.list}>
          {filteredTodos.length === 0 && (
            <li style={styles.emptyMsg}>No tasks to show.</li>
          )}

          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              style={{
                ...styles.listItem,
                backgroundColor: todo.completed ? "#e0ffe0" : "#fff",
              }}
            >
              <button
                onClick={() => toggleComplete(todo.id)}
                style={styles.completeBtn}
                title={todo.completed ? "Mark as incomplete" : "Mark as complete"}
              >
                {todo.completed ? (
                  <FaCheckCircle color="#27ae60" size={20} />
                ) : (
                  <FaRegCircle color="#aaa" size={20} />
                )}
              </button>

              <div style={styles.taskInfo}>
                <span
                  style={{
                    ...styles.taskText,
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "#888" : "#222",
                  }}
                >
                  {todo.text}
                </span>
                <div style={styles.metaInfo}>
                  <span
                    style={{
                      ...styles.priorityBadge,
                      backgroundColor: PRIORITY_COLORS[todo.priority],
                    }}
                    title={`Priority: ${todo.priority}`}
                  >
                    <FaFlag style={{ marginRight: 4 }} />
                    {todo.priority}
                  </span>

                  {todo.dueDate && (
                    <span style={styles.dueDate} title={`Due: ${todo.dueDate}`}>
                      <FaCalendarAlt style={{ marginRight: 4 }} />
                      {new Date(todo.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              <div style={styles.actionBtns}>
                <button
                  onClick={() => startEdit(todo)}
                  style={styles.actionBtn}
                  title="Edit Task"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteTask(todo.id)}
                  style={styles.actionBtn}
                  title="Delete Task"
                >
                  <FaTimes color="#e74c3c" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    padding: "2rem",
  },
  container: {
    maxWidth: 700,
    margin: "0 auto",
    backgroundColor: "#fff",
    borderRadius: 12,
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    padding: "2rem",
  },
  header: {
    marginBottom: "1.5rem",
    color: "#4a90e2",
    textAlign: "center",
  },
  inputRow: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "1rem",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: "0.7rem 1rem",
    fontSize: "1rem",
    borderRadius: 8,
    border: "1.8px solid #ddd",
    outline: "none",
  },
  select: {
    padding: "0.6rem",
    borderRadius: 8,
    border: "1.8px solid #ddd",
    fontSize: "0.9rem",
    cursor: "pointer",
  },
  dateInput: {
    padding: "0.6rem 0.8rem",
    fontSize: "0.9rem",
    borderRadius: 8,
    border: "1.8px solid #ddd",
  },
  addBtn: {
    backgroundColor: "#4a90e2",
    border: "none",
    color: "white",
    padding: "0.65rem 0.85rem",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: "1.2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s ease",
  },
  filterRow: {
    display: "flex",
    gap: "0.7rem",
    marginBottom: "1rem",
    flexWrap: "wrap",
  },
  filterBtn: {
    flex: "1 1 30%",
    padding: "0.5rem",
    borderRadius: 8,
    border: "1.8px solid #4a90e2",
    backgroundColor: "white",
    color: "#4a90e2",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
  filterBtnActive: {
    backgroundColor: "#4a90e2",
    color: "white",
  },
  clearBtn: {
    flex: "1 1 100%",
    marginTop: 6,
    padding: "0.5rem",
    borderRadius: 8,
    border: "1.8px solid #e74c3c",
    backgroundColor: "white",
    color: "#e74c3c",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    maxHeight: 350,
    overflowY: "auto",
  },
  emptyMsg: {
    textAlign: "center",
    color: "#999",
    padding: "2rem",
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    padding: "0.8rem",
    borderRadius: 8,
    marginBottom: 8,
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  completeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    marginRight: 12,
    fontSize: "1.2rem",
  },
  taskInfo: {
    flex: 1,
  },
  taskText: {
    fontSize: "1.1rem",
  },
  metaInfo: {
    marginTop: 6,
    display: "flex",
    gap: 10,
    fontSize: "0.85rem",
    color: "#555",
  },
  priorityBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "2px 6px",
    borderRadius: 12,
    color: "white",
    fontWeight: "bold",
  },
  dueDate: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    color: "#888",
  },
  actionBtns: {
    display: "flex",
    gap: 8,
    marginLeft: 12,
  },
  actionBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1.1rem",
    color: "#666",
    transition: "color 0.2s ease",
  },
};

export default ToDo;
