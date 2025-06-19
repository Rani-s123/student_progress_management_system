import React, { useState } from 'react';
import { Student } from '../../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

interface StudentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (student: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: Student;
  mode: 'create' | 'edit';
}

export const StudentForm: React.FC<StudentFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    cfHandle: initialData?.cfHandle || '',
    currentRating: initialData?.currentRating || 1200,
    maxRating: initialData?.maxRating || 1200,
    lastSyncAt: initialData?.lastSyncAt || new Date(),
    isActive: initialData?.isActive ?? true,
    inactivityDays: initialData?.inactivityDays || 0,
    remindersSent: initialData?.remindersSent || 0,
    autoEmailDisabled: initialData?.autoEmailDisabled || false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (!formData.cfHandle.trim()) {
      newErrors.cfHandle = 'Codeforces handle is required';
    }

    if (formData.currentRating < 0) {
      newErrors.currentRating = 'Rating must be positive';
    }

    if (formData.maxRating < formData.currentRating) {
      newErrors.maxRating = 'Max rating must be >= current rating';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'create' ? 'Add New Student' : 'Edit Student'}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            error={errors.name}
            placeholder="Enter student's full name"
          />

          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors.email}
            placeholder="student@example.com"
          />

          <Input
            label="Phone Number"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            error={errors.phone}
            placeholder="+1234567890"
          />

          <Input
            label="Codeforces Handle"
            value={formData.cfHandle}
            onChange={(e) => handleInputChange('cfHandle', e.target.value)}
            error={errors.cfHandle}
            placeholder="codeforces_username"
          />

          <Input
            label="Current Rating"
            type="number"
            value={formData.currentRating}
            onChange={(e) => handleInputChange('currentRating', parseInt(e.target.value))}
            error={errors.currentRating}
            min="0"
          />

          <Input
            label="Max Rating"
            type="number"
            value={formData.maxRating}
            onChange={(e) => handleInputChange('maxRating', parseInt(e.target.value))}
            error={errors.maxRating}
            min="0"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => handleInputChange('isActive', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Active Student
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.autoEmailDisabled}
              onChange={(e) => handleInputChange('autoEmailDisabled', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Disable Auto Email
            </span>
          </label>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit">
            {mode === 'create' ? 'Add Student' : 'Update Student'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};