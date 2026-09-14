import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const { success, error: showError } = useToast();

  const [role, setRole] = useState<'STUDENT' | 'OWNER'>('STUDENT');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [university, setUniversity] = useState('Cairo University');
  const [studyLevel, setStudyLevel] = useState('Undergraduate (Year 2)');
  const [organizationName, setOrganizationName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({
        email,
        password,
        fullName,
        phone,
        role,
        university: role === 'STUDENT' ? university : undefined,
        studyLevel: role === 'STUDENT' ? studyLevel : undefined,
        organizationName: role === 'OWNER' ? organizationName : undefined,
      });
      success(`Account created successfully as ${role}!`, 'Welcome');
      navigate(role === 'OWNER' ? '/owner' : '/');
    } catch (err: any) {
      // Demo fallback
      showError(err.message || 'Registration failed. Please check inputs.');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-margin py-12 animate-fade-in">
      <Card
        elevation="level-2"
        className="w-full max-w-lg p-6 sm:p-8 bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-6 text-left"
      >
        {/* Header */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-on-secondary-fixed mx-auto flex items-center justify-center mb-3 shadow-warm-sm">
            <span className="material-symbols-outlined text-[24px]">person_add</span>
          </div>
          <h1 className="font-headline-lg text-headline-sm text-primary tracking-tight font-bold">
            Create Your Account
          </h1>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Join the verified Egyptian student housing platform.
          </p>
        </div>

        {/* Role Toggle */}
        <div className="flex p-1 bg-surface-container-low rounded-xl">
          <button
            type="button"
            onClick={() => setRole('STUDENT')}
            className={`flex-1 py-2.5 rounded-lg font-label-md text-label-md transition-all flex items-center justify-center gap-2 ${
              role === 'STUDENT'
                ? 'bg-primary text-on-primary shadow-sm font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">school</span>
            <span>I am a Student</span>
          </button>
          <button
            type="button"
            onClick={() => setRole('OWNER')}
            className={`flex-1 py-2.5 rounded-lg font-label-md text-label-md transition-all flex items-center justify-center gap-2 ${
              role === 'OWNER'
                ? 'bg-primary text-on-primary shadow-sm font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">real_estate_agent</span>
            <span>I am a Property Owner</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Full Name"
            placeholder="e.g. Karim Mansour"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="e.g. karim@student.cu.edu.eg"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              label="Phone Number"
              type="tel"
              placeholder="01012345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Role-Specific Fields */}
          {role === 'STUDENT' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-outline-variant/20">
              <Select
                label="Target University"
                options={[
                  { value: 'Cairo University', label: 'Cairo University' },
                  { value: 'Ain Shams University', label: 'Ain Shams University' },
                  { value: 'GUC', label: 'German University in Cairo' },
                  { value: 'AUC', label: 'American University in Cairo' },
                ]}
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              />
              <Input
                label="Study Level / Major"
                placeholder="e.g. 2nd Year Computer Engineering"
                value={studyLevel}
                onChange={(e) => setStudyLevel(e.target.value)}
              />
            </div>
          ) : (
            <div className="pt-1 border-t border-outline-variant/20">
              <Input
                label="Organization / Agency Name (Optional)"
                placeholder="e.g. Dokki Academic Properties LLC"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
              />
            </div>
          )}

          <Button
            variant="accent"
            size="lg"
            type="submit"
            isLoading={isLoading}
            className="w-full mt-2"
          >
            Create {role === 'STUDENT' ? 'Student' : 'Owner'} Account
          </Button>
        </form>

        <div className="pt-2 border-t border-outline-variant/20 text-center text-body-sm text-on-surface-variant">
          Already have an account?{' '}
          <Link to="/login" className="text-secondary font-bold hover:underline">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
};
