import React, { useState } from 'react';
import { User } from '../../types/auth.types';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

export const UserManagement: React.FC = () => {
  const { success } = useToast();
  const [users, setUsers] = useState<User[]>([
    {
      id: 'u1',
      email: 'karim@student.cu.edu.eg',
      fullName: 'Karim Mansour',
      role: 'STUDENT',
      isActive: true,
      createdAt: '2026-08-15',
      updatedAt: '2026-08-15',
    },
    {
      id: 'u2',
      email: 'mahmoud@dokki-realestate.com',
      fullName: 'Hajj Mahmoud El-Messaha',
      role: 'OWNER',
      isActive: true,
      createdAt: '2026-08-10',
      updatedAt: '2026-08-10',
    },
    {
      id: 'u3',
      email: 'omar.student@eng.asu.edu.eg',
      fullName: 'Omar Hassan',
      role: 'STUDENT',
      isActive: false,
      createdAt: '2026-08-20',
      updatedAt: '2026-08-20',
    },
    {
      id: 'u4',
      email: 'admin@maskan-ai.edu.eg',
      fullName: 'Supervisor Admin',
      role: 'ADMIN',
      isActive: true,
      createdAt: '2026-07-01',
      updatedAt: '2026-07-01',
    },
  ]);

  const toggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const nextState = !u.isActive;
          success(`User account ${nextState ? 'activated' : 'suspended'}.`, 'User Updated');
          return { ...u, isActive: nextState };
        }
        return u;
      })
    );
  };

  return (
    <div className="flex flex-col gap-4 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline-md text-primary font-bold">
            Platform Users ({users.length})
          </h2>
          <p className="text-body-sm text-on-surface-variant">
            Manage student, landlord, and supervisor accounts.
          </p>
        </div>
      </div>

      <div className="w-full overflow-x-auto rounded-xl border border-outline-variant/30 bg-surface-container-lowest">
        <table className="w-full border-collapse text-left text-body-sm">
          <thead>
            <tr className="border-b border-outline-variant/20 bg-surface-container-low/50 text-label-md font-semibold text-primary">
              <th className="p-4">User</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Joined</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/15">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-surface-container-low/30">
                <td className="p-4">
                  <div className="font-semibold text-primary">{u.fullName}</div>
                  <div className="text-xs text-on-surface-variant/70">{u.email}</div>
                </td>
                <td className="p-4">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-surface-container text-on-surface">
                    {u.role}
                  </span>
                </td>
                <td className="p-4">
                  <span
                    className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      u.isActive
                        ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                        : 'bg-error-container text-on-error-container'
                    }`}
                  >
                    {u.isActive ? 'Active' : 'Suspended'}
                  </span>
                </td>
                <td className="p-4 text-on-surface-variant">{u.createdAt}</td>
                <td className="p-4 text-right">
                  <Button
                    variant={u.isActive ? 'outline' : 'primary'}
                    size="sm"
                    onClick={() => toggleStatus(u.id)}
                    className={u.isActive ? 'text-error border-error/40 hover:bg-error-container/30' : ''}
                  >
                    {u.isActive ? 'Suspend' : 'Activate'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
