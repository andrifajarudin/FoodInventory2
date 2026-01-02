"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, AlertTriangle, Calendar, TrendingUp, ArrowUp, ArrowDown, ShoppingCart, Users } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Items",
      value: "156",
      icon: Package,
      change: "+12%",
      trend: "up",
      description: "Items aktif"
    },
    {
      title: "Stok Rendah",
      value: "12",
      icon: AlertTriangle,
      change: "+3",
      trend: "up",
      description: "Perlu restock",
      alert: true
    },
    {
      title: "Hampir Expired",
      value: "8",
      icon: Calendar,
      change: "-2",
      trend: "down",
      description: "Dalam 7 hari"
    },
    {
      title: "Nilai Stok",
      value: formatCurrency(45200000),
      icon: TrendingUp,
      change: "+5.2%",
      trend: "up",
      description: "Total nilai inventory"
    }
  ]

  const recentTransactions = [
    { id: "TRX-001", item: "Beras Premium", type: "in", quantity: 50, date: "2024-01-15", user: "Admin" },
    { id: "TRX-002", item: "Minyak Goreng", type: "out", quantity: 10, date: "2024-01-15", user: "Staff" },
    { id: "TRX-003", item: "Telur", type: "in", quantity: 200, date: "2024-01-14", user: "Admin" },
    { id: "TRX-004", item: "Garam", type: "out", quantity: 5, date: "2024-01-14", user: "Staff" },
  ]

  const lowStockItems = [
    { name: "Beras Premium", current: 10, min: 50, unit: "kg" },
    { name: "Minyak Goreng", current: 5, min: 20, unit: "liter" },
    { name: "Garam", current: 2, min: 10, unit: "kg" },
    { name: "Telur", current: 30, min: 100, unit: "pcs" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-600">Overview sistem inventory Anda</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Filter Tanggal
          </Button>
          <Button>
            <Package className="mr-2 h-4 w-4" />
            Stok Opname
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className={stat.alert ? "border-red-200" : ""}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.alert ? "text-red-500" : "text-gray-500"}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs">
                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {stat.trend === "up" ? <ArrowUp className="inline h-3 w-3" /> : <ArrowDown className="inline h-3 w-3" />}
                  {stat.change}
                </span>
                <span className="text-gray-500 ml-2">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Low Stock Alert */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Stok Rendah</CardTitle>
            <CardDescription>
              Items yang perlu segera di-restock
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Stok saat ini: {item.current} {item.unit}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600">
                      {item.current} / {item.min} {item.unit}
                    </p>
                    <Button variant="link" size="sm" className="text-primary h-auto p-0">
                      Buat PO
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Lihat Semua Items
            </Button>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Transaksi Terbaru</CardTitle>
            <CardDescription>
              5 transaksi terakhir
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{transaction.item}</p>
                    <p className="text-sm text-gray-500">
                      {transaction.date} • {transaction.user}
                    </p>
                  </div>
                  <div className={`flex items-center ${transaction.type === "in" ? "text-green-600" : "text-red-600"}`}>
                    {transaction.type === "in" ? (
                      <ArrowDown className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowUp className="h-4 w-4 mr-1" />
                    )}
                    <span className="font-bold">
                      {transaction.type === "in" ? "+" : "-"}{transaction.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Lihat Semua Transaksi
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Akses cepat ke fitur yang sering digunakan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex-col">
              <Package className="h-8 w-8 mb-2" />
              <span>Tambah Item</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col">
              <ShoppingCart className="h-8 w-8 mb-2" />
              <span>Transaksi Masuk</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col">
              <TrendingUp className="h-8 w-8 mb-2" />
              <span>Transaksi Keluar</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col">
              <Users className="h-8 w-8 mb-2" />
              <span>Tambah Supplier</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
