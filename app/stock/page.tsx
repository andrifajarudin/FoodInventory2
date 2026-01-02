"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Plus, Search, Filter, Download, AlertTriangle } from "lucide-react"

export default function StockPage() {
  // Mock data
  const stockItems = [
    { id: "F001", name: "Beras Premium", category: "Dry Food", currentStock: 150, minStock: 50, unit: "kg", location: "Gudang A", status: "good" },
    { id: "F002", name: "Minyak Goreng", category: "Dry Food", currentStock: 45, minStock: 20, unit: "liter", location: "Gudang A", status: "warning" },
    { id: "F003", name: "Daging Ayam", category: "Fresh Food", currentStock: 25, minStock: 15, unit: "kg", location: "Freezer", status: "good" },
    { id: "F004", name: "Telur", category: "Fresh Food", currentStock: 180, minStock: 100, unit: "pcs", location: "Chiller", status: "good" },
    { id: "F005", name: "Garam", category: "Dry Food", currentStock: 30, minStock: 10, unit: "kg", location: "Gudang B", status: "good" },
    { id: "F006", name: "Gula Pasir", category: "Dry Food", currentStock: 8, minStock: 20, unit: "kg", location: "Gudang B", status: "low" },
    { id: "F007", name: "Tepung Terigu", category: "Dry Food", currentStock: 12, minStock: 25, unit: "kg", location: "Gudang A", status: "low" },
    { id: "F008", name: "Bawang Merah", category: "Fresh Food", currentStock: 15, minStock: 10, unit: "kg", location: "Chiller", status: "warning" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manajemen Stok</h1>
          <p className="text-gray-600">Kelola semua bahan makanan dan inventory</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Item Baru
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                placeholder="Cari nama item, kategori, atau ID..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stock Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Stok</CardTitle>
          <CardDescription>
            Total {stockItems.length} items dalam inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">ID</th>
                  <th className="text-left py-3 px-4">Nama Item</th>
                  <th className="text-left py-3 px-4">Kategori</th>
                  <th className="text-left py-3 px-4">Stok</th>
                  <th className="text-left py-3 px-4">Minimal</th>
                  <th className="text-left py-3 px-4">Lokasi</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {stockItems.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-sm">{item.id}</td>
                    <td className="py-3 px-4 font-medium">{item.name}</td>
                    <td className="py-3 px-4 text-gray-600">{item.category}</td>
                    <td className="py-3 px-4">
                      <span className="font-bold">{item.currentStock}</span>
                      <span className="text-gray-500 ml-1">{item.unit}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{item.minStock} {item.unit}</td>
                    <td className="py-3 px-4">{item.location}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.status === 'low' 
                          ? 'bg-red-100 text-red-800' 
                          : item.status === 'warning'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {item.status === 'low' && <AlertTriangle className="w-3 h-3 mr-1" />}
                        {item.status === 'low' ? 'Rendah' : item.status === 'warning' ? 'Perhatian' : 'Aman'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Detail</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Items</p>
                <p className="text-2xl font-bold">{stockItems.length}</p>
              </div>
              <Package className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Items Stok Rendah</p>
                <p className="text-2xl font-bold text-red-600">
                  {stockItems.filter(item => item.status === 'low').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Kategori</p>
                <p className="text-2xl font-bold">
                  {Array.from(new Set(stockItems.map(item => item.category))).length}
                </p>
              </div>
              <Filter className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}