"use client";
import React, { useEffect, useState } from "react";
 import Loader from "./Loader";
import "jsvectormap/dist/css/jsvectormap.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning={true}>
        {loading ? <Loader /> : <DefaultLayout>{children}</DefaultLayout>}
      </body>
    </html>
  );
}
