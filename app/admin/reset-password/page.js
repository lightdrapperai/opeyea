"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset(event) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("Password updated successfully. You can now sign in.");

    setTimeout(() => {
      window.location.href = "/admin";
    }, 1500);
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.logo}>O</div>

        <h1 style={styles.title}>Reset Admin Password</h1>

        <p style={styles.subtitle}>
          Create a new secure password for your OPEYEA administrator account.
        </p>

        <form onSubmit={handleReset}>
          <label style={styles.label}>New Password</label>

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter new password"
            minLength={8}
            required
            style={styles.input}
          />

          <label style={styles.label}>Confirm New Password</label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm new password"
            minLength={8}
            required
            style={styles.input}
          />

          {error && <p style={styles.error}>{error}</p>}

          {message && <p style={styles.success}>{message}</p>}

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Updating Password..." : "Update Password"}
          </button>
        </form>

        <p style={styles.footer}>OPEYEA • English Clinic</p>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f7fb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: "460px",
    background: "#ffffff",
    padding: "32px",
    borderRadius: "18px",
    boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
  },

  logo: {
    width: "52px",
    height: "52px",
    borderRadius: "14px",
    background: "#0b5ed7",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "25px",
    fontWeight: "800",
    marginBottom: "18px",
  },

  title: {
    margin: "0",
    color: "#102a43",
    fontSize: "28px",
  },

  subtitle: {
    color: "#627d98",
    lineHeight: "1.6",
    marginBottom: "25px",
  },

  label: {
    display: "block",
    marginBottom: "7px",
    marginTop: "16px",
    fontWeight: "700",
    color: "#243b53",
  },

  input: {
    width:
