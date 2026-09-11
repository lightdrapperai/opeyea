"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export default function DashboardPage() {
  const [consents, setConsents] = useState([]);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);
    setError("");

    console.log("Dashboard: starting load");
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log("Dashboard: user check complete", user);

    if (!user) {
      window.location.href = "/admin";
      return;
    }

    setUserEmail(user.email || "");

console.log("Dashboard: loading parent consents");
     const {
      data: consentData,
      error: consentError,
    } = await supabase
      .from("parent_consents")
      .select("*")
      .order("created_at", { ascending: false });
console.log("Dashboard: parent consents request finished", {
  consentData,
  consentError,
});

    if (consentError) {
      console.error("Parent consent error:", consentError);
      setError(consentError.message);
      setLoading(false);
      return;
    }

    console.log("Dashboard: loading school registrations");
    const {
      data: schoolData,
      error: schoolError,
    } = await supabase
      .from("school_registrations")
      .select("*")
      .order("created_at", { ascending: false });
    console.log("Dashboard: school registrations request finished", {
  schoolData,
  schoolError,
});

    if (schoolError) {
      console.error("School registration error:", schoolError);
      setError(schoolError.message);
      setLoading(false);
      return;
    }

    setConsents(consentData || []);
    setSchools(schoolData || []);
    setLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/admin";
  }

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <p style={styles.eyebrow}>OPEYEA</p>

          <h1 style={styles.title}>
            Admin Dashboard
          </h1>

          <p style={styles.subtitle}>
            Manage parent consent and school registration records
          </p>
        </div>

        <button
          onClick={handleLogout}
          style={styles.logout}
        >
          Log Out
        </button>
      </header>

      <section style={styles.account}>
        <strong>Administrator</strong>
        <span>{userEmail}</span>
      </section>

      {/* PARENT CONSENT RECORDS */}

      <section style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <h2 style={styles.cardTitle}>
              Parent Consent Records
            </h2>

            <p style={styles.cardSubtitle}>
              Total submissions:{" "}
              <strong>{consents.length}</strong>
            </p>
          </div>

          <button
            onClick={loadDashboard}
            style={styles.refresh}
          >
            Refresh
          </button>
        </div>

        {loading && (
          <p style={styles.message}>
            Loading records...
          </p>
        )}

        {!loading &&
          !error &&
          consents.length === 0 && (
            <p style={styles.message}>
              No parent consent records have been submitted yet.
            </p>
          )}

        {!loading &&
          !error &&
          consents.length > 0 && (
            <div style={styles.tableWrap}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Student</th>
                    <th style={styles.th}>Class</th>
                    <th style={styles.th}>School</th>
                    <th style={styles.th}>
                      Parent/Guardian
                    </th>
                    <th style={styles.th}>Phone</th>
                    <th style={styles.th}>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {consents.map((consent) => (
                    <tr key={consent.id}>
                      <td style={styles.td}>
                        {consent.student_name}
                      </td>

                      <td style={styles.td}>
                        {consent.student_class}
                      </td>

                      <td style={styles.td}>
                        {consent.school}
                      </td>

                      <td style={styles.td}>
                        {consent.parent_guardian_name}
                      </td>

                      <td style={styles.td}>
                        {consent.parent_guardian_phone}
                      </td>

                      <td style={styles.td}>
                        {new Date(
                          consent.created_at
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </section>

      {/* SCHOOL REGISTRATIONS */}

      <section style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <h2 style={styles.cardTitle}>
              School Registrations
            </h2>

            <p style={styles.cardSubtitle}>
              Total registrations:{" "}
              <strong>{schools.length}</strong>
            </p>
          </div>
        </div>

        {!loading &&
          !error &&
          schools.length === 0 && (
            <p style={styles.message}>
              No school registrations have been submitted yet.
            </p>
          )}

        {!loading &&
          !error &&
          schools.length > 0 && (
            <div style={styles.tableWrap}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>School</th>
                    <th style={styles.th}>Address</th>
                    <th style={styles.th}>
                      Principal / Head
                    </th>
                    <th style={styles.th}>
                      Contact Person
                    </th>
                    <th style={styles.th}>Phone</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Classes</th>
                    <th style={styles.th}>Students</th>
                    <th style={styles.th}>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {schools.map((school) => (
                    <tr key={school.id}>
                      <td style={styles.td}>
                        {school.school_name}
                      </td>

                      <td style={styles.td}>
                        {school.school_address}
                      </td>

                      <td style={styles.td}>
                        {school.principal_name}
                      </td>

                      <td style={styles.td}>
                        {school.contact_person}
                      </td>

                      <td style={styles.td}>
                        {school.phone}
                      </td>

                      <td style={styles.td}>
                        {school.email || "Not provided"}
                      </td>

                      <td style={styles.td}>
                        {school.classes_interested}
                      </td>

                      <td style={styles.td}>
                        {school.student_count ||
                          "Not provided"}
                      </td>

                      <td style={styles.td}>
                        {new Date(
                          school.created_at
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </section>

      {error && (
        <p style={styles.error}>
          {error}
        </p>
      )}
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f7fb",
    padding: "30px 20px",
    fontFamily: "Arial, sans-serif",
    color: "#243b53",
  },

  header: {
    maxWidth: "1200px",
    margin: "0 auto 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },

  eyebrow: {
    margin: "0 0 6px",
    color: "#0b5ed7",
    fontWeight: "800",
    letterSpacing: "1px",
    fontSize: "13px",
  },

  title: {
    margin: "0",
    fontSize: "32px",
    color: "#102a43",
  },

  subtitle: {
    margin: "6px 0 0",
    color: "#627d98",
  },

  logout: {
    border: "none",
    background: "#102a43",
    color: "#fff",
    padding: "12px 18px",
    borderRadius: "10px",
    fontWeight: "700",
    cursor: "pointer",
  },

  account: {
    maxWidth: "1200px",
    margin: "0 auto 20px",
    background: "#fff",
    padding: "15px 18px",
    borderRadius: "12px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
  },

  card: {
    maxWidth: "1200px",
    margin: "0 auto 25px",
    background: "#fff",
    borderRadius: "16px",
    padding: "22px",
    boxShadow: "0 10px 35px rgba(0,0,0,0.07)",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
  },

  cardTitle: {
    margin: "0",
    fontSize: "22px",
    color: "#102a43",
  },

  cardSubtitle: {
    margin: "6px 0 0",
    color: "#627d98",
  },

  refresh: {
    border: "1px solid #bcccdc",
    background: "#fff",
    color: "#102a43",
    padding: "10px 15px",
    borderRadius: "9px",
    fontWeight: "700",
    cursor: "pointer",
  },

  tableWrap: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "1100px",
  },

  th: {
    textAlign: "left",
    padding: "13px 12px",
    background: "#f0f4f8",
    borderBottom: "1px solid #d9e2ec",
    fontSize: "14px",
  },

  td: {
    padding: "13px 12px",
    borderBottom: "1px solid #e6edf3",
    fontSize: "14px",
  },

  message: {
    padding: "25px 10px",
    textAlign: "center",
    color: "#627d98",
  },

  error: {
    maxWidth: "1200px",
    margin: "0 auto 20px",
    background: "#fff5f5",
    color: "#c92a2a",
    padding: "14px",
    borderRadius: "10px",
  },
};
