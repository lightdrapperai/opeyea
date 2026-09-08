import "./globals.css";

export const metadata = {
  title: "OPEYEA | English Clinic",
  description: "Helping students correct incorrect English expressions and communicate confidently in Standard English.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
