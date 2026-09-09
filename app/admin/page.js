"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    window.location.href = "/admin/dashboard";
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.logo}>O</div>

        <h1 style={styles.title}>OPEYEA Admin</h1>

        <p style={styles.subtitle}>
          Secure administrator login
        </p>

        <form onSubmit={handleLogin}>
          <label style={styles.label}>Email Address</label>

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your admin email"
            required
            style={styles.input}
          />

          <label style={styles.label}>Password</label>

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            required
            style={styles.input}
          />

          {error && <p style={styles.error}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={styles.footer}>
          OPEYEA • English Clinic
        </p>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    background: "#f4f7fb",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#ffffff",
    padding: "36px 28px",
    borderRadius: "20px",
    boxShadow: "0 15px 45px rgba(0,0,0,0.10)",
  },

  logo: {
    width: "58px",
    height: "58px",
    borderRadius: "50%",
    background: "#0b5ed7",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    fontWeight: "800",
    margin: "0 auto 18px",
  },

  title: {
    textAlign: "center",
    margin: "0",
    fontSize: "28px",
    color: "#102a43",
  },

  subtitle: {
    textAlign: "center",
    color: "#627d98",
    marginBottom: "28px",
  },

  label: {
    display: "block",
    fontWeight: "600",
    color: "#243b53",
    marginBottom: "8px",
    marginTop: "16px",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 14px",
    border: "1px solid #bcccdc",
    borderRadius: "10px",
    fontSize: "16px",
    outline: "none",
  },

  button: {
    width: "100%",
    marginTop: "24px",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#0b5ed7",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
  },

  error: {
    color: "#c92a2a",
    background: "#fff5f5",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "14px",
  },

  footer: {
    textAlign: "center",
    marginTop: "25px",
    color: "#829ab1",
    fontSize: "13px",
  },
};
