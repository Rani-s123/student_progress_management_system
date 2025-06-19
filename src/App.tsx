import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { StudentTable } from './components/students/StudentTable';
import { StudentForm } from './components/students/StudentForm';
import { StudentProfile } from './components/students/StudentProfile';
import { SyncStatus } from './components/dashboard/SyncStatus';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { SettingsPanel } from './components/settings/SettingsPanel';
import { ScheduleManager } from './components/schedule/ScheduleManager';
import { Student } from './types';
import { useStudents } from './hooks/useStudents';

function App() {
  const [activeView, setActiveView] = useState('students');
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  
  const {
    students,
    loading,
    error,
    addStudent,
    updateStudent,
    deleteStudent,
    getStudentProfile,
    syncStudent,
  } = useStudents();

  const handleAddStudent = () => {
    setEditingStudent(null);
    setShowStudentForm(true);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setShowStudentForm(true);
  };

  const handleSubmitStudent = (studentData: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingStudent) {
      updateStudent(editingStudent.id, studentData);
    } else {
      addStudent(studentData);
    }
    setShowStudentForm(false);
    setEditingStudent(null);
  };

  const handleDeleteStudent = (studentId: string) => {
    if (confirm('Are you sure you want to delete this student?')) {
      deleteStudent(studentId);
    }
  };

  const handleViewProfile = (studentId: string) => {
    setSelectedStudentId(studentId);
    setActiveView('profile');
  };

  const handleBackToStudents = () => {
    setSelectedStudentId(null);
    setActiveView('students');
  };

  const handleManualSync = async () => {
    // Simulate sync process
    for (const student of students) {
      await syncStudent(student.id);
    }
  };

  const renderContent = () => {
    if (activeView === 'profile' && selectedStudentId) {
      return (
        <StudentProfile
          studentId={selectedStudentId}
          onBack={handleBackToStudents}
          onGetProfile={getStudentProfile}
        />
      );
    }

    switch (activeView) {
      case 'students':
        return (
          <StudentTable
            students={students}
            onViewProfile={handleViewProfile}
            onEditStudent={handleEditStudent}
            onDeleteStudent={handleDeleteStudent}
            onAddStudent={handleAddStudent}
            onSyncStudent={syncStudent}
            loading={loading}
          />
        );
      
      case 'analytics':
        return <AnalyticsDashboard />;
      
      case 'sync':
        return (
          <SyncStatus
            lastSync={new Date()}
            nextSync={new Date(Date.now() + 24 * 60 * 60 * 1000)}
            status="idle"
            totalStudents={students.length}
            activeStudents={students.filter(s => s.isActive).length}
            onManualSync={handleManualSync}
          />
        );
      
      case 'schedule':
        return <ScheduleManager />;
      
      case 'settings':
        return <SettingsPanel />;
      
      default:
        return null;
    }
  };

  const getPageTitle = () => {
    if (activeView === 'profile') return 'Student Profile';
    
    switch (activeView) {
      case 'students': return 'Student Management';
      case 'analytics': return 'Analytics Dashboard';
      case 'sync': return 'Sync Status';
      case 'schedule': return 'Schedule Manager';
      case 'settings': return 'Settings';
      default: return 'CodeTracker';
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header title={getPageTitle()} />
        
        <div className="flex">
          <Sidebar activeView={activeView} onViewChange={setActiveView} />
          
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </main>
        </div>

        <StudentForm
          isOpen={showStudentForm}
          onClose={() => {
            setShowStudentForm(false);
            setEditingStudent(null);
          }}
          onSubmit={handleSubmitStudent}
          initialData={editingStudent || undefined}
          mode={editingStudent ? 'edit' : 'create'}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;