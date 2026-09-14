import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuth();
  const { success, error: showError } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      success('Welcome back to Maskan AI!', 'Login Successful');
      navigate(from, { replace: true });
    } catch (err: any) {
      // Demo quick login fallback if backend offline
      showError(err.message || 'Invalid credentials');
    }
  };

  const handleQuickDemoLogin = async (role: 'STUDENT' | 'OWNER' | 'ADMIN') => {
    try {
      const demoUsers = {
        STUDENT: {
          email: 'student@cu.edu.eg',
          password: 'password123',
        },
        OWNER: {
          email: 'owner@dokki-realestate.com',
          password: 'password123',
        },
        ADMIN: {
          email: 'admin@maskan-ai.edu.eg',
          password: 'password123',
        },
      };

      setEmail(demoUsers[role].email);
      setPassword(demoUsers[role].password);

      // simulate or call login
      try {
        await login(demoUsers[role]);
      } catch {
        // Mock session injection for smooth frontend demo if server not reachable
        const mockUser = {
          id: `demo_${role.toLowerCase()}`,
          email: demoUsers[role].email,
          fullName:
            role === 'STUDENT'
              ? 'Karim Mansour'
              : role === 'OWNER'
              ? 'Hajj Mahmoud El-Messaha'
              : 'Supervisor Admin',
          role,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        localStorage.setItem('maskan_auth_token', 'demo_jwt_token_sample');
        localStorage.setItem('maskan_user_profile', JSON.stringify(mockUser));
        window.location.href = role === 'OWNER' ? '/owner' : role === 'ADMIN' ? '/admin' : '/';
        return;
      }
      success(`Signed in as ${role}!`, 'Demo Access');
      navigate(role === 'OWNER' ? '/owner' : role === 'ADMIN' ? '/admin' : '/');
    } catch (e: any) {
      showError(e.message);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-margin py-12 animate-fade-in">
      <Card
        elevation="level-2"
        className="w-full max-w-md p-6 sm:p-8 bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-6 text-left"
      >
        {/* Header */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-on-secondary-fixed mx-auto flex items-center justify-center mb-3 shadow-warm-sm">
            <span className="material-symbols-outlined text-[24px]">lock</span>
          </div>
          <h1 className="font-headline-lg text-headline-sm text-primary tracking-tight font-bold">
            Sign In to Maskan AI
          </h1>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Access your student shortlist, saved flats, and direct landlord chats.
          </p>
        </div>

        {/* Quick Demo Access Bar */}
        <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-2">
          <span className="text-[11px] font-bold text-secondary uppercase tracking-wider block">
            Quick One-Click Demo Access:
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('STUDENT')}
              className="py-1.5 px-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-primary transition-colors"
            >
              🎓 Student
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('OWNER')}
              className="py-1.5 px-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-primary transition-colors"
            >
              🏢 Owner
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('ADMIN')}
              className="py-1.5 px-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-primary transition-colors"
            >
              🛡️ Admin
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="e.g. karim@student.cu.edu.eg"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<span className="material-symbols-outlined text-[18px]">mail</span>}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<span className="material-symbols-outlined text-[18px]">key</span>}
          />

          <Button
            variant="primary"
            size="lg"
            type="submit"
            isLoading={isLoading}
            className="w-full mt-2"
          >
            Sign In
          </Button>
        </form>

        {/* Footer link */}
        <div className="pt-2 border-t border-outline-variant/20 text-center text-body-sm text-on-surface-variant">
          Don't have an account?{' '}
          <Link to="/register" className="text-secondary font-bold hover:underline">
            Register now
          </Link>
        </div>
      </Card>
    </div>
  );
};
