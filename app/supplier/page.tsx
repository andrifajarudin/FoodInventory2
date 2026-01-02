"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Plus, Search, Phone, Mail, Star } from "lucide-react"

export default function SupplierPage() {
  const suppliers = [
    { id: "SUP-001", name: "Toko Beras Jaya", contact: "08123456789", email: "beras@example.com", products: ["Beras", "Kacang"], rating: 4.5, status: "active" },
    { id: "SUP-002", name: "Supplier Minyak", contact: "08234567890", email: "minyak@example.com", products: ["Minyak Goreng", "Mentega"], rating: 4.2, status: "active" },
    { id: "SUP-003", name: "Poultry Farm", contact: "08345678901", email: "ayam@example.com", products: ["Daging Ayam", "Telur"], rating: 4.8, status: "active" },
    { id: "SUP-004", name: "Toko Telur Segar", contact: "08456789012", email: "telur@example.com", products: ["Telur"], rating: 4.0, status: "inactive" },
    { id: "SUP-005", name: "Supplier Bumbu", contact: "08567890123", email: "bumbu@example.com", products: ["Garam", "Gula", "Merica"], rating: 4.3, status: "active" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Supplier</h1>
          <p className="text-gray-600">Kelola data supplier dan vendor</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Supplier
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              placeholder="Cari nama supplier atau produk..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Supplier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((supplier) => (
          <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{supplier.name}</CardTitle>
                  <CardDescription>{supplier.id}</CardDescription>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  supplier.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {supplier.status === 'active' ? 'Aktif' : 'Nonaktif'}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{supplier.contact}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{supplier.email}</span>
                </div>
              </div>

              {/* Products */}
              <div>
                <p className="text-sm font-medium mb-2">Produk:</p>
                <div className="flex flex-wrap gap-2">
                  {supplier.products.map((product, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 rounded text-sm">
                      {product}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="ml-1 font-medium">{supplier.rating}</span>
                  <span className="text-gray-500 text-sm ml-1">/5.0</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">PO</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{suppliers.length}</p>
              <p className="text-sm text-gray-500">Total Supplier</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {suppliers.filter(s => s.status === 'active').length}
              </p>
              <p className="text-sm text-gray-500">Aktif</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {suppliers.filter(s => s.rating >= 4.5).length}
              </p>
              <p className="text-sm text-gray-500">Rating ≥ 4.5</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">
                {Array.from(new Set(suppliers.flatMap(s => s.products))).length}
              </p>
              <p className="text-sm text-gray-500">Jenis Produk</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}