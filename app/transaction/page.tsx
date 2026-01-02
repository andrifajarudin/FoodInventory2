"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, Plus, Search, Calendar, Filter } from "lucide-react"

export default function TransactionPage() {
  const transactions = [
    { id: "TRX-001", date: "2024-01-15 08:30", type: "in", item: "Beras Premium", quantity: 50, unit: "kg", user: "Admin", supplier: "Toko Beras Jaya" },
    { id: "TRX-002", date: "2024-01-15 09:15", type: "out", item: "Minyak Goreng", quantity: 10, unit: "liter", user: "Staff", department: "Kitchen" },
    { id: "TRX-003", date: "2024-01-14 14:20", type: "in", item: "Telur", quantity: 200, unit: "pcs", user: "Admin", supplier: "Telur Segar" },
    { id: "TRX-004", date: "2024-01-14 10:45", type: "out", item: "Garam", quantity: 5, unit: "kg", user: "Staff", department: "Kitchen" },
    { id: "TRX-005", date: "2024-01-13 11:30", type: "adjust", item: "Daging Ayam", quantity: -2, unit: "kg", user: "Manager", reason: "Rusak" },
    { id: "TRX-006", date: "2024-01-13 16:00", type: "transfer", item: "Gula Pasir", quantity: 15, unit: "kg", user: "Admin", from: "Gudang A", to: "Gudang B" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transaksi</h1>
          <p className="text-gray-600">Keluar/masuk barang dan adjustment</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <ArrowDown className="mr-2 h-4 w-4" />
            Barang Masuk
          </Button>
          <Button variant="outline">
            <ArrowUp className="mr-2 h-4 w-4" />
            Barang Keluar
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Transaksi Baru
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">Semua Tipe</option>
                <option value="in">Barang Masuk</option>
                <option value="out">Barang Keluar</option>
                <option value="adjust">Adjustment</option>
                <option value="transfer">Transfer</option>
              </select>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  placeholder="Cari item atau ID transaksi..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Terapkan Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Transaksi</CardTitle>
          <CardDescription>
            Transaksi 30 hari terakhir
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'in' ? 'bg-green-100' : 
                    transaction.type === 'out' ? 'bg-red-100' : 
                    transaction.type === 'adjust' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    {transaction.type === 'in' ? (
                      <ArrowDown className="h-5 w-5 text-green-600" />
                    ) : transaction.type === 'out' ? (
                      <ArrowUp className="h-5 w-5 text-red-600" />
                    ) : (
                      <span className="font-bold">↔</span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.item}</p>
                    <p className="text-sm text-gray-500">
                      {transaction.date} • {transaction.id}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    transaction.type === 'in' ? 'text-green-600' : 
                    transaction.type === 'out' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {transaction.type === 'in' ? '+' : ''}{transaction.quantity} {transaction.unit}
                  </p>
                  <p className="text-sm text-gray-500">
                    {transaction.user} • {transaction.type === 'in' ? 'Dari: ' + transaction.supplier : 
                    transaction.type === 'out' ? 'Ke: ' + transaction.department :
                    transaction.type === 'adjust' ? 'Alasan: ' + transaction.reason :
                    'Dari: ' + transaction.from + ' → Ke: ' + transaction.to}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}