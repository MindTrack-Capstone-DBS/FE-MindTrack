import { User, Mail, Phone, MapPin, Calendar, ChevronDown, Edit2, Save, X } from 'lucide-react';

const ProfileForm = ({ isEditing, editedData, handleChange, handleEdit, handleSave, handleCancel, genderOptions, days, months, years }) => (
  <div className="bg-white rounded-2xl shadow p-8 mb-8">
    <h2 className="text-lg font-bold text-blue-900 mb-6">Data Diri</h2>
    <form className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <User className="w-5 h-5 text-blue-400" />
        <input type="text" className="flex-1 border border-blue-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-200" value={editedData.name} disabled={!isEditing} onChange={e => handleChange('name', e.target.value)} placeholder="Nama Lengkap" />
      </div>
      <div className="flex items-center gap-3">
        <Mail className="w-5 h-5 text-blue-400" />
        <input type="email" className="flex-1 border border-blue-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-200" value={editedData.email} disabled={!isEditing} onChange={e => handleChange('email', e.target.value)} placeholder="Email" />
      </div>
      <div className="flex items-center gap-3">
        <Phone className="w-5 h-5 text-blue-400" />
        <input type="tel" className="flex-1 border border-blue-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-200" value={editedData.phone} disabled={!isEditing} onChange={e => handleChange('phone', e.target.value)} placeholder="No. Telepon" />
      </div>
      <div className="flex gap-4">
        <div className="flex-1 flex items-center gap-3">
          <ChevronDown className="w-5 h-5 text-blue-400" />
          <select className="flex-1 border border-blue-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-200" value={editedData.gender} disabled={!isEditing} onChange={e => handleChange('gender', e.target.value)}>
            {genderOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div className="flex-1 flex items-center gap-3">
          <Calendar className="w-5 h-5 text-blue-400" />
          <select className="border border-blue-100 rounded-lg px-2 py-2 focus:ring-2 focus:ring-blue-200" value={editedData.birthdate.day} disabled={!isEditing} onChange={e => handleChange('birthdate', { day: e.target.value })}>{days.map(d => <option key={d} value={d}>{d}</option>)}</select>
          <select className="border border-blue-100 rounded-lg px-2 py-2 focus:ring-2 focus:ring-blue-200" value={editedData.birthdate.month} disabled={!isEditing} onChange={e => handleChange('birthdate', { month: e.target.value })}>{months.map(m => <option key={m} value={m}>{m}</option>)}</select>
          <select className="border border-blue-100 rounded-lg px-2 py-2 focus:ring-2 focus:ring-blue-200" value={editedData.birthdate.year} disabled={!isEditing} onChange={e => handleChange('birthdate', { year: e.target.value })}>{years.map(y => <option key={y} value={y}>{y}</option>)}</select>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <MapPin className="w-5 h-5 text-blue-400" />
        <input type="text" className="flex-1 border border-blue-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-200" value={editedData.city} disabled={!isEditing} onChange={e => handleChange('city', e.target.value)} placeholder="Kota Domisili" />
      </div>
      <div className="flex gap-3 mt-6">
        {!isEditing ? (
          <button type="button" className="bg-blue-900 text-white rounded-lg px-6 py-2 font-semibold flex items-center gap-2 hover:bg-blue-800 transition" onClick={handleEdit}><Edit2 className="w-4 h-4" /> Edit</button>
        ) : (
          <>
            <button type="button" className="bg-blue-900 text-white rounded-lg px-6 py-2 font-semibold flex items-center gap-2 hover:bg-blue-800 transition" onClick={handleSave}><Save className="w-4 h-4" /> Simpan</button>
            <button type="button" className="bg-gray-200 text-blue-900 rounded-lg px-6 py-2 font-semibold flex items-center gap-2 hover:bg-gray-300 transition" onClick={handleCancel}><X className="w-4 h-4" /> Batal</button>
          </>
        )}
      </div>
    </form>
  </div>
);

export default ProfileForm; 