import { useEffect, useState } from "react";

const API_BASE = "http://localhost:8000";

// Owner: Dashboard Dev.
// TODO: replace mock fetch below with GET /escalations?tier=high once
// Backend Lead finalizes that endpoint (see /docs/api_contract.md).
export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Mocked until /escalations exists
    setUsers([
      { user_id: "demo-user-1", tier: "high", fusion_risk_index: 78.2, trend: "rising" },
      { user_id: "demo-user-2", tier: "medium", fusion_risk_index: 52.1, trend: "stable" },
    ]);
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: 24 }}>
      <h1>Counselor Dashboard</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th align="left">User</th>
            <th align="left">Tier</th>
            <th align="left">Risk Index</th>
            <th align="left">Trend</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.user_id}>
              <td>{u.user_id}</td>
              <td>{u.tier}</td>
              <td>{u.fusion_risk_index}</td>
              <td>{u.trend}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
