import React, { useState } from 'react';
import { getDirectorates } from '../../data/store';
import { Search, User, Trash2, Eye } from 'lucide-react';

export default function UserList({ users, onSelectUser, onDeleteUser }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'health', 'specialized'
  const directorates = getDirectorates();

  const getDirectorateNames = (dirIds = []) => {
    if (!dirIds || dirIds.length === 0) return 'غير محدد';
    return dirIds
      .map(id => {
        const dir = directorates.find(d => d.id === id);
        return dir ? dir.name.replace('دائرة صحة ', '') : '';
      })
      .filter(Boolean)
      .join('، ');
  };

  const getSectorName = (dirIds = [], secId) => {
    if (!dirIds || dirIds.length === 0) return '';
    for (const dirId of dirIds) {
      const dir = directorates.find((d) => d.id === dirId);
      if (dir) {
        const sec = dir.sectors.find((s) => s.id === secId);
        if (sec) return sec.name;
      }
    }
    return '';
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.username.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && u.specialization === filter;
  });

  return (
    <div className="flex flex-col gap-md">
      {/* Search & Filter */}
      <div className="search-box">
        <Search className="search-box-icon" />
        <input
          type="text"
          placeholder="ابحث عن مستخدم بالاسم أو المعرف..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex gap-sm flex-wrap mb-sm">
        <button
          className={`chip ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          الكل
        </button>
        <button
          className={`chip ${filter === 'health' ? 'active' : ''}`}
          onClick={() => setFilter('health')}
        >
          مراكز صحية
        </button>
        <button
          className={`chip ${filter === 'specialized' ? 'active' : ''}`}
          onClick={() => setFilter('specialized')}
        >
          مراكز تخصصية
        </button>
      </div>

      {/* Users List */}
      {filteredUsers.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <User size={32} />
          </div>
          <p className="empty-state-title">لا يوجد مستخدمون</p>
          <p className="empty-state-desc">لم يتم العثور على حسابات تطابق خيارات الفلترة والبحث.</p>
        </div>
      ) : (
        <div className="flex flex-col">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="user-card"
              onClick={() => onSelectUser(user)}
            >
              <div
                className={`user-avatar ${
                  user.role === 'admin'
                    ? 'blue'
                    : user.specialization === 'health'
                    ? 'green'
                    : 'purple'
                }`}
              >
                {user.fullName.charAt(0)}
              </div>
              <div className="user-info">
                <h3 className="user-name">{user.fullName}</h3>
                <p className="user-role">
                  {user.role === 'admin'
                    ? 'مدير النظام'
                    : user.specialization === 'health'
                    ? `مقيّم مراكز صحية - ${getDirectorateNames(user.directorateIds)}`
                    : `مقيّم مراكز تخصصية - ${getDirectorateNames(user.directorateIds)}`}
                </p>
                {user.specialization === 'health' && user.sectorId && (
                  <p className="text-secondary text-xs mt-sm">
                    القطاع: {getSectorName(user.directorateIds, user.sectorId)}
                  </p>
                )}
              </div>
              
              <div className="user-actions" onClick={(e) => e.stopPropagation()}>
                <button
                  className="btn btn-secondary btn-icon btn-sm"
                  onClick={() => onSelectUser(user)}
                  title="عرض التفاصيل"
                >
                  <Eye size={16} />
                </button>
                {user.role !== 'admin' && (
                  <button
                    className="btn btn-danger btn-icon btn-sm"
                    onClick={() => onDeleteUser(user.id)}
                    title="حذف الحساب"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
