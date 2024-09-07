'use client'
import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
 import React, { useEffect, useState } from "react";
 
  const metadata: Metadata = {
  title:
    "Hotel Dashboard Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Home page for Hotel Dashboard Kit",
};

export default function Home() {
 
  return <>{  <ECommerce />}</>;
}
