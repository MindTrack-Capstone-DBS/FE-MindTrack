import { LogOut, User, BookOpen, ClipboardList, Shield, Home, Edit2 } from 'lucide-react';

const SidebarProfile = ({ userData, onEditPhoto }) => (
  <aside className="w-full md:w-1/4 bg-white border-r border-blue-50 flex flex-col items-center py-10 px-4 gap-6 shadow-sm min-h-screen">
    <div className="relative w-24 h-24 mb-2">
      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-400 to-blue-700 flex items-center justify-center text-4xl font-bold text-white shadow-lg border-4 border-white">
        {userData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
      </div>
      <button
        className="absolute bottom-2 right-2 bg-green-500 border-2 border-white rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-blue-600 transition cursor-pointer"
        title="Edit Foto Profile"
        type="button"
        onClick={onEditPhoto}
      >
        <Edit2 className="w-5 h-5 text-white" />
      </button>
    </div>
    <div className="text-center mb-4">
      <div className="font-semibold text-blue-900 text-lg">{userData.name}</div>
      <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mt-1">Aktif</span>
    </div>
    <nav className="flex flex-col gap-2 w-full">
      <button className="flex items-center gap-3 px-4 py-2 rounded-lg text-blue-900 font-medium hover:bg-blue-50 transition"><Home className="w-5 h-5" /> Dashboard</button>
      <button className="flex items-center gap-3 px-4 py-2 rounded-lg text-blue-900 font-medium hover:bg-blue-50 transition"><BookOpen className="w-5 h-5" /> Jurnal Harian</button>
      <button className="flex items-center gap-3 px-4 py-2 rounded-lg text-blue-900 font-medium hover:bg-blue-50 transition"><Shield className="w-5 h-5" /> Rekomendasi</button>
      <button className="flex items-center gap-3 px-4 py-2 rounded-lg text-white bg-blue-900 font-bold shadow transition"><User className="w-5 h-5" /> Pengaturan Akun</button>
      <button className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-500 font-medium hover:bg-red-50 transition mt-8"><LogOut className="w-5 h-5" /> Logout</button>
    </nav>
  </aside>
);

export default SidebarProfile; 