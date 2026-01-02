"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, User, Shield, Bell, Database, Download, Upload } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pengaturan</h1>
          <p className="text-gray-600">Konfigurasi aplikasi dan preferensi</p>
        </div>
        <Button>
          <Settings className="mr-2 h-4 w-4" />
          Simpan Perubahan
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Settings Menu */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardContent className="pt-6">
              <nav className="space-y-2">
                {[
                  { icon: User, label: "Profil Pengguna", active: true },
                  { icon: Shield, label: "Keamanan" },
                  { icon: Bell, label: "Notifikasi" },
                  { icon: Database, label: "Integrasi Database" },
                ].map((item, index) => (
                  <button
                    key={index}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left ${
                      item.active 
                        ? 'bg-primary-50 text-primary-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Profile */}
          <Card>
            <CardHeader>
              <CardTitle>Profil Pengguna</CardTitle>
              <CardDescription>
                Informasi akun dan preferensi Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nama Lengkap</label>
                  <input 
                    type="text" 
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    defaultValue="Admin FoodStock"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    defaultValue="admin@foodstock.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Role</label>
                  <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option>Owner</option>
                    <option>Manager</option>
                    <option>Staff</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Bahasa</label>
                  <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option>Indonesia</option>
                    <option>English</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Database Integration */}
          <Card>
            <CardHeader>
              <CardTitle>Integrasi Database</CardTitle>
              <CardDescription>
                Konfigurasi koneksi ke Google Sheets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Database className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="font-medium">Google Sheets Connection</p>
                      <p className="text-sm text-gray-500">Status: <span className="text-green-600">Connected</span></p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Test Connection</Button>
                </div>
                <div className="text-sm space-y-2">
                  <p>Spreadsheet ID: <code className="bg-gray-100 px-2 py-1 rounded">1A2B3C4D5E6F...</code></p>
                  <p>Last Sync: <span className="font-medium">Just now</span></p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Backup Data
                </Button>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Restore Data
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Notifikasi</CardTitle>
              <CardDescription>
                Kendali notifikasi yang ingin Anda terima
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Stok Rendah", description: "Ketika stok mencapai minimum" },
                { label: "Expiry Alert", description: "Item hampir kadaluwarsa" },
                { label: "Transaksi Baru", description: "Ada transaksi masuk/keluar" },
                { label: "Laporan Harian", description: "Ringkasan inventory harian" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}