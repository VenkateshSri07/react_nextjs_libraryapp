import './styles/globals.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header><h1>📚 Library Management System</h1></header>
        <main>{children}</main>
      </body>
    </html>
  );
}
