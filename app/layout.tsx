import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/layout/sidebar"
import Header from "@/components/layout/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FoodStock Manager - Sistem Inventory Bahan Makanan",
  description: "Aplikasi manajemen stok bahan makanan dengan Google Sheets sebagai database",
  keywords: ["inventory", "food stock", "restaurant", "cafe", "Google Sheets"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-gray-50`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1">
            <Header />
            <main className="p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
