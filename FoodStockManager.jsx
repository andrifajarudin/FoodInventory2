import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ArrowRightLeft, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  Plus, 
  Filter, 
  AlertTriangle, 
  Clock, 
  ChevronDown, 
  Menu, 
  X,
  Database,
  Calendar,
  User,
  RefreshCw,
  FileText
} from 'lucide-react';

// --- MOCK DATA (Simulating Google Sheets Data) ---
const INITIAL_ITEMS = [
  { id: '1', name: 'Beras Premium', category: 'Dry Goods', stock: 45, unit: 'kg', minStock: 50, price: 12000, supplier: 'CV. Pangan Jaya' },
  { id: '2', name: 'Telur Ayam', category: 'Fresh', stock: 120, unit: 'pcs', minStock: 100, price: 2000, supplier: 'Peternakan Sejahtera' },
  { id: '3', name: 'Susu UHT Full Cream', category: 'Dairy', stock: 8, unit: 'liter', minStock: 12, price: 18000, supplier: 'PT. Dairy Milk' },
  { id: '4', name: 'Daging Sapi Slice', category: 'Frozen', stock: 5, unit: 'kg', minStock: 10, price: 110000, supplier: 'Frozen Mart' },
  { id: '5', name: 'Minyak Goreng', category: 'Dry Goods', stock: 25, unit: 'liter', minStock: 20, price: 14000, supplier: 'CV. Pangan Jaya' },
];

const INITIAL_TRANSACTIONS = [
  { id: 'T001', type: 'IN', item: 'Beras Premium', qty: 50, date: '2023-10-25', user: 'Mas Andi' },
  { id: 'T002', type: 'OUT', item: 'Telur Ayam', qty: 20, date: '2023-10-26', reason: 'Kitchen', user: 'Ibu Sari' },
  { id: 'T003', type: 'OUT', item: 'Susu UHT', qty: 2, date: '2023-10-26', reason: 'Waste', user: 'Mas Andi' },
];

// --- COMPONENTS ---

// 1. Sidebar Component
const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inventory', label: 'Stok Bahan', icon: Package },
    { id: 'transactions', label: 'Transaksi', icon: ArrowRightLeft },
    { id: 'reports', label: 'Laporan', icon: FileText },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 z-20 bg-black/50 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Content */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 bg-slate-950">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Database size={20} className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">FoodStock</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="px-4 py-6 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsOpen(false);
              }}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === item.id 
                  ? 'bg-emerald-600 text-white' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} className="mr-3" />
              {item.label}
            </button>
          ))}
        </div>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
          <div className="flex items-center px-4 py-3 mb-2 rounded-lg bg-slate-800">
            <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold">
              PB
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Pak Budi</p>
              <p className="text-xs text-slate-400">Owner</p>
            </div>
          </div>
          <button className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors">
            <LogOut size={18} className="mr-3" />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

// 2. Dashboard View
const DashboardView = ({ items, transactions }) => {
  const lowStockCount = items.filter(i => i.stock <= i.minStock).length;
  // Simulation for expiring items (hardcoded for demo)
  const expiringCount = 3; 

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Item" 
          value={items.length} 
          icon={Package} 
          color="bg-blue-500" 
          trend="+2 items" 
        />
        <StatCard 
          title="Stok Menipis" 
          value={lowStockCount} 
          icon={AlertTriangle} 
          color="bg-orange-500" 
          alert={lowStockCount > 0}
        />
        <StatCard 
          title="Hampir Expired" 
          value={expiringCount} 
          icon={Clock} 
          color="bg-red-500"
          alert={expiringCount > 0} 
        />
        <StatCard 
          title="Transaksi Hari Ini" 
          value={transactions.length} 
          icon={ArrowRightLeft} 
          color="bg-emerald-500" 
          trend="+5 new"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Low Stock Alert Section */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-semibold text-slate-800">Peringatan Stok Rendah</h3>
            <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full font-medium">Prioritas Belanja</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Nama Bahan</th>
                  <th className="px-6 py-3 font-medium">Stok Saat Ini</th>
                  <th className="px-6 py-3 font-medium">Min. Stok</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.filter(i => i.stock <= i.minStock).map(item => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-800">{item.name}</td>
                    <td className="px-6 py-4 text-red-600 font-bold">{item.stock} {item.unit}</td>
                    <td className="px-6 py-4 text-slate-500">{item.minStock} {item.unit}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Critical
                      </span>
                    </td>
                  </tr>
                ))}
                {items.filter(i => i.stock <= i.minStock).length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-slate-400">
                      Semua stok aman!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Aktivitas Terkini</h3>
          </div>
          <div className="p-4 space-y-4">
            {transactions.slice(0, 5).map((tx) => (
              <div key={tx.id} className="flex items-start space-x-3 text-sm border-b border-slate-50 last:border-0 pb-3 last:pb-0">
                <div className={`mt-0.5 w-2 h-2 rounded-full ${tx.type === 'IN' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                <div>
                  <p className="font-medium text-slate-800">
                    {tx.type === 'IN' ? 'Stok Masuk' : 'Stok Keluar'}: {tx.item}
                  </p>
                  <p className="text-slate-500 text-xs">
                    {tx.qty} unit • oleh {tx.user}
                  </p>
                </div>
                <span className="ml-auto text-xs text-slate-400">Just now</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color, alert, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className={`text-2xl font-bold ${alert ? 'text-red-600' : 'text-slate-800'}`}>{value}</h3>
      {trend && <p className="text-xs text-emerald-600 font-medium mt-1">{trend}</p>}
    </div>
    <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
      <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
    </div>
  </div>
);

// 3. Inventory View
const InventoryView = ({ items, onAddItem }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(items.map(i => i.category))];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-[calc(100vh-8rem)]">
      {/* Toolbar */}
      <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex gap-2 items-center flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari bahan makanan..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <button onClick={onAddItem} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors">
          <Plus size={18} className="mr-2" />
          Tambah Bahan
        </button>
      </div>

      {/* Table */}
      <div className="overflow-auto flex-1">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 sticky top-0">
            <tr>
              <th className="px-6 py-3 font-medium">Nama Item</th>
              <th className="px-6 py-3 font-medium">Kategori</th>
              <th className="px-6 py-3 font-medium">Stok</th>
              <th className="px-6 py-3 font-medium">Unit</th>
              <th className="px-6 py-3 font-medium">Supplier</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-800">{item.name}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs">
                    {item.category}
                  </span>
                </td>
                <td className={`px-6 py-4 font-bold ${item.stock <= item.minStock ? 'text-red-600' : 'text-slate-700'}`}>
                  {item.stock}
                </td>
                <td className="px-6 py-4 text-slate-500">{item.unit}</td>
                <td className="px-6 py-4 text-slate-500">{item.supplier}</td>
                <td className="px-6 py-4">
                  {item.stock <= item.minStock ? (
                    <span className="inline-flex items-center text-xs font-medium text-red-600">
                      <AlertTriangle size={14} className="mr-1" /> Restock
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-xs font-medium text-emerald-600">
                      Aman
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-emerald-600 hover:text-emerald-700 font-medium text-xs">Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 4. Transaction View
const TransactionView = ({ items, onTransaction }) => {
  const [activeTab, setActiveTab] = useState('IN');
  const [formData, setFormData] = useState({
    itemId: '',
    qty: '',
    reason: '',
    batchDate: '', // For IN only
    supplier: ''   // For IN only
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onTransaction({ type: activeTab, ...formData });
    setFormData({ itemId: '', qty: '', reason: '', batchDate: '', supplier: '' });
    // In a real app, show toast notification here
  };

  const selectedItem = items.find(i => i.id === formData.itemId);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-200">
          <button 
            className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${activeTab === 'IN' ? 'bg-emerald-50 text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-500 hover:bg-slate-50'}`}
            onClick={() => setActiveTab('IN')}
          >
            Barang Masuk (In)
          </button>
          <button 
            className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${activeTab === 'OUT' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
            onClick={() => setActiveTab('OUT')}
          >
            Barang Keluar (Out)
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Pilih Barang</label>
              <select 
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                value={formData.itemId}
                onChange={(e) => setFormData({...formData, itemId: e.target.value})}
                required
              >
                <option value="">-- Pilih Item --</option>
                {items.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name} (Stok: {item.stock} {item.unit})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Jumlah</label>
                <div className="relative">
                  <input 
                    type="number" 
                    className="w-full border border-slate-300 rounded-lg pl-3 pr-12 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="0"
                    value={formData.qty}
                    onChange={(e) => setFormData({...formData, qty: e.target.value})}
                    required
                    min="1"
                  />
                  <span className="absolute right-3 top-2 text-slate-400 text-sm">
                    {selectedItem ? selectedItem.unit : '-'}
                  </span>
                </div>
              </div>

              {activeTab === 'IN' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Kadaluarsa (Expiry)</label>
                  <input 
                    type="date" 
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    value={formData.batchDate}
                    onChange={(e) => setFormData({...formData, batchDate: e.target.value})}
                    required
                  />
                </div>
              )}
            </div>

            {activeTab === 'IN' ? (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Supplier</label>
                <input 
                  type="text" 
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="Nama Supplier"
                  value={formData.supplier}
                  onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Alasan / Tujuan</label>
                <select
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  required
                >
                  <option value="">-- Pilih Alasan --</option>
                  <option value="Kitchen">Produksi Dapur (Kitchen)</option>
                  <option value="Waste">Terbuang / Rusak (Waste)</option>
                  <option value="Sample">Sample / Tester</option>
                </select>
              </div>
            )}

            <div className="pt-4">
              <button 
                type="submit" 
                className={`w-full py-3 rounded-lg font-medium text-white shadow-sm transition-all ${
                  activeTab === 'IN' 
                    ? 'bg-emerald-600 hover:bg-emerald-700' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {activeTab === 'IN' ? 'Terima Barang & Simpan' : 'Keluarkan Barang'}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-slate-400">
          Data akan disinkronisasi ke Google Sheets secara real-time.
        </p>
      </div>
    </div>
  );
};

// 5. Settings / Connection View
const SettingsView = () => (
  <div className="space-y-6 max-w-3xl">
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
        <Database className="mr-2 text-emerald-600" size={20} />
        Database Connection
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Google Sheet ID</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value="1BxiMVs0XRA5nFMdKvBdBkJ..." 
              disabled
              className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-500 font-mono text-sm"
            />
            <button className="text-emerald-600 font-medium text-sm hover:underline">Change</button>
          </div>
          <p className="text-xs text-slate-400 mt-1">Spreadsheet terhubung: <strong>FoodStock_Database_V1</strong></p>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-100">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
            <span className="text-sm font-medium text-emerald-800">Status: Connected</span>
          </div>
          <button className="text-xs bg-white border border-emerald-200 text-emerald-700 px-3 py-1 rounded shadow-sm hover:bg-emerald-50">
            Test Connection
          </button>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
        <User className="mr-2 text-blue-600" size={20} />
        User Management
      </h3>
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="py-2">User</th>
            <th className="py-2">Role</th>
            <th className="py-2 text-right">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-50">
            <td className="py-3">Pak Budi</td>
            <td><span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-bold">Owner</span></td>
            <td className="text-right text-emerald-600 text-xs">Active</td>
          </tr>
          <tr className="border-b border-slate-50">
            <td className="py-3">Ibu Sari</td>
            <td><span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">Manager</span></td>
            <td className="text-right text-emerald-600 text-xs">Active</td>
          </tr>
          <tr>
            <td className="py-3">Mas Andi</td>
            <td><span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs font-bold">Staff</span></td>
            <td className="text-right text-emerald-600 text-xs">Active</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // App State (Simulating DB)
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);

  // Handlers
  const handleAddItem = () => {
    // In a real app, this opens a modal
    alert("Fitur Tambah Item akan membuka Modal Form di sini.");
  };

  const handleTransaction = (data) => {
    // 1. Update Transaction Log
    const newTx = {
      id: `T${Date.now()}`,
      type: data.type,
      item: items.find(i => i.id === data.itemId)?.name || 'Unknown',
      qty: parseInt(data.qty),
      date: new Date().toISOString().split('T')[0],
      user: 'Pak Budi' // Hardcoded current user
    };
    setTransactions([newTx, ...transactions]);

    // 2. Update Stock Level
    const updatedItems = items.map(item => {
      if (item.id === data.itemId) {
        const qty = parseInt(data.qty);
        return {
          ...item,
          stock: data.type === 'IN' ? item.stock + qty : item.stock - qty
        };
      }
      return item;
    });
    setItems(updatedItems);
    alert(`Transaksi Berhasil! Stok ${newTx.item} ${data.type === 'IN' ? 'bertambah' : 'berkurang'}.`);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:px-8">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-slate-500 hover:text-slate-700"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center ml-auto space-x-4">
            <div className="flex items-center text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
              System Live
            </div>
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
              PB
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-800">
                {activeTab === 'dashboard' && 'Dashboard Overview'}
                {activeTab === 'inventory' && 'Stok Bahan Makanan'}
                {activeTab === 'transactions' && 'Input Transaksi'}
                {activeTab === 'settings' && 'Pengaturan Sistem'}
                {activeTab === 'reports' && 'Laporan'}
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                {activeTab === 'dashboard' && 'Selamat datang kembali, Pak Budi.'}
                {activeTab === 'inventory' && 'Kelola daftar bahan, stok minimum, dan kategori.'}
                {activeTab === 'transactions' && 'Catat barang masuk (belanja) dan barang keluar (pemakaian).'}
              </p>
            </div>

            {activeTab === 'dashboard' && <DashboardView items={items} transactions={transactions} />}
            {activeTab === 'inventory' && <InventoryView items={items} onAddItem={handleAddItem} />}
            {activeTab === 'transactions' && <TransactionView items={items} onTransaction={handleTransaction} />}
            {activeTab === 'settings' && <SettingsView />}
            {activeTab === 'reports' && (
              <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl border border-dashed border-slate-300">
                <FileText size={48} className="text-slate-300 mb-4" />
                <p className="text-slate-500 font-medium">Laporan akan ditampilkan di sini</p>
                <p className="text-slate-400 text-sm">Fitur Export PDF/Excel akan tersedia di update berikutnya.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;