import { useState, useEffect, useMemo } from "react";

const ApiFetcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [sortConfig, setSortConfig] = useState({ key: "loc", direction: "asc" });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://api.rootnet.in/covid19-in/stats/latest");
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        setData(json.data.regional);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSort = (key) => {
    setSortConfig((current) => {
      if (current.key === key) {
        return { key, direction: current.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };
  const filteredAndSortedData = useMemo(() => {
    let filtered = data;
    if (searchTerm.trim()) {
      filtered = filtered.filter((item) =>
        item.loc.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortConfig.key) {
      filtered = [...filtered].sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];

        if (typeof valA === "string") valA = valA.toLowerCase();
        if (typeof valB === "string") valB = valB.toLowerCase();

        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [data, searchTerm, sortConfig]);

  if (loading) return <Loader />;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>India COVID-19 Statewise Data</h2>

      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Search by state"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <button onClick={() => setSearchTerm("")} style={styles.resetButton}>
          Reset
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            {["loc", "totalConfirmed", "discharged", "deaths"].map((key) => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                style={styles.th}
                title="Click to sort"
              >
                {key === "loc"
                  ? "State"
                  : key === "totalConfirmed"
                  ? "Confirmed"
                  : key === "discharged"
                  ? "Recovered"
                  : "Deaths"}
                {sortConfig.key === key ? (
                  sortConfig.direction === "asc" ? (
                    " 🔼"
                  ) : (
                    " 🔽"
                  )
                ) : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedData.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "1rem" }}>
                No states found
              </td>
            </tr>
          ) : (
            filteredAndSortedData.map(({ loc, totalConfirmed, discharged, deaths }) => {
             
              const highlight = deaths > 1000;
              return (
                <tr
                  key={loc}
                  style={highlight ? { backgroundColor: "#ffe6e6" } : undefined}
                  title={highlight ? "High death count" : ""}
                >
                  <td style={styles.td}>{loc}</td>
                  <td style={styles.td}>{totalConfirmed}</td>
                  <td style={styles.td}>{discharged}</td>
                  <td style={styles.td}>{deaths}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <p style={{ textAlign: "center", marginTop: 10, color: "#666" }}>
        Click column headers to sort ↑↓
      </p>
    </div>
  );
};

const Loader = () => (
  <div style={{ textAlign: "center", marginTop: 50 }}>
    <div className="spinner" />
    <style>
      {`
        .spinner {
          margin: auto;
          width: 40px;
          height: 40px;
          border: 5px solid #ccc;
          border-top-color: #1e90ff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}
    </style>
    <p>Loading data...</p>
  </div>
);

const styles = {
  container: {
    maxWidth: 800,
    margin: "2rem auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "1rem",
    color: "#222",
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 15,
    gap: 10,
  },
  searchInput: {
    padding: "0.5rem 1rem",
    fontSize: 16,
    borderRadius: 5,
    border: "1px solid #ccc",
    width: 200,
  },
  resetButton: {
    padding: "0.5rem 1rem",
    fontSize: 16,
    borderRadius: 5,
    border: "none",
    backgroundColor: "#1e90ff",
    color: "white",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    padding: "0.75rem",
    borderBottom: "2px solid #ddd",
    cursor: "pointer",
    userSelect: "none",
    backgroundColor: "#f9f9f9",
  },
  td: {
    padding: "0.75rem",
    borderBottom: "1px solid #eee",
  },
};

export default ApiFetcher;
