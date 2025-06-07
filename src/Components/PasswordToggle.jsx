import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaCopy, FaTrash } from "react-icons/fa";

const PasswordToggle = () => {
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  const getStrength = (pwd) => {
    if (pwd.length === 0) return "";
    if (pwd.length < 6) return "Weak";
    if (pwd.match(/[A-Z]/) && pwd.match(/[0-9]/) && pwd.length >= 8)
      return "Strong";
    return "Medium";
  };

  const strength = getStrength(password);

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password).then(() => {
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000);
    });
  };

  const clearPassword = () => setPassword("");

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Password Toggle</h2>
     <div style={styles.inputWrapper}>
  <input
    type={visible ? "text" : "password"}
    placeholder="Enter your password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    style={styles.input}
    autoComplete="new-password"
  />
  <button
    onClick={() => setVisible(!visible)}
    style={styles.iconBtn}
    title={visible ? "Hide Password" : "Show Password"}
    aria-label={visible ? "Hide Password" : "Show Password"}
    type="button"
  >
    {visible ? <FaEyeSlash /> : <FaEye />}
  </button>
</div>
        {password && (
          <>
            <button
              onClick={copyToClipboard}
              style={{ ...styles.iconBtn, marginLeft: 4 }}
              title="Copy Password"
              type="button"
            >
              <FaCopy />
            </button>
            <button
              onClick={clearPassword}
              style={{ ...styles.iconBtn, marginLeft: 4 }}
              title="Clear Password"
              type="button"
            >
              <FaTrash />
            </button>
          </>
        )}

      {strength && (
        <div style={{ ...styles.strengthBar, ...styles[strength.toLowerCase()] }}>
          Password Strength: {strength}
        </div>
      )}

      {copySuccess && <p style={styles.copySuccess}>{copySuccess}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 400,
    margin: "3rem auto",
    padding: "2rem",
    borderRadius: 12,
    boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
    backgroundColor: "#fff",
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    textAlign: "center",
  },
  heading: {
    marginBottom: "1.5rem",
    color: "#333",
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    border: "2px solid #ddd",
    borderRadius: 8,
    padding: "0.3rem 0.5rem",
    backgroundColor: "#fafafa",
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "1.1rem",
    padding: "0.5rem 0.75rem",
    borderRadius: 6,
    backgroundColor: "transparent",
  },
  iconBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#555",
    fontSize: "1.25rem",
    padding: "0 6px",
    transition: "color 0.2s ease",
  },
  strengthBar: {
    marginTop: "1rem",
    fontWeight: "600",
    padding: "0.5rem",
    borderRadius: 6,
    color: "#fff",
    userSelect: "none",
  },
  weak: {
    backgroundColor: "#e74c3c",
  },
  medium: {
    backgroundColor: "#f39c12",
  },
  strong: {
    backgroundColor: "#27ae60",
  },
  copySuccess: {
    marginTop: 10,
    color: "#27ae60",
    fontWeight: "600",
    userSelect: "none",
  },
};

export default PasswordToggle;
