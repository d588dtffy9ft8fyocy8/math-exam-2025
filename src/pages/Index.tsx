import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Clock, Users, FileText, CheckCircle } from 'lucide-react';
import ExamInterface from '@/components/ExamInterface';
import ResultsPage from '@/components/ResultsPage';
import AdminPanel from '@/components/AdminPanel';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [studentName, setStudentName] = useState('');
  const [examResults, setExamResults] = useState(null);
  const [examConfig, setExamConfig] = useState({
    duration: '3 ساعات',
    totalQuestions: 10,
    questionType: 'صح/خطأ',
    participatingStudents: 0,
    welcomeMessage: 'مرحباً بكم في الامتحان التجريبي لمادة الرياضيات للعام الدراسي 2024-2025',
    headerTitle: 'الامتحان التجريبي - الرياضيات',
    headerSubtitle: 'المرحلة الثانوية - ليبيا 2024-2025',
    footerText: 'تم تصميم الموقع من قبل موسى حامد',
    footerCopyright: '© 2024 جميع الحقوق محفوظة',
    startExamTitle: 'ابدأ الامتحان',
    nameInputLabel: 'أدخل اسمك الكامل',
    nameInputPlaceholder: 'مثال: أحمد محمد علي',
    startExamButton: 'بدء الامتحان',
    // Grade labels
    excellentGrade: 'ممتاز',
    veryGoodGrade: 'جيد جداً',
    goodGrade: 'جيد',
    acceptableGrade: 'مقبول',
    weakGrade: 'ضعيف'
  });

  // Load participant count from localStorage on component mount
  useEffect(() => {
    const studentResults = JSON.parse(localStorage.getItem('studentResults') || '[]');
    setExamConfig(prev => ({
      ...prev,
      participatingStudents: studentResults.length
    }));
  }, []);

  const handleStudentNameSubmit = (e) => {
    e.preventDefault();
    if (studentName.trim()) {
      setCurrentPage('exam');
    }
  };

  const handleExamComplete = (results) => {
    setExamResults(results);
    setCurrentPage('results');
    // Update participating students count
    const studentResults = JSON.parse(localStorage.getItem('studentResults') || '[]');
    setExamConfig(prev => ({
      ...prev,
      participatingStudents: studentResults.length
    }));
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setStudentName('');
    setExamResults(null);
  };

  if (currentPage === 'admin') {
    return <AdminPanel examConfig={examConfig} setExamConfig={setExamConfig} onBack={handleBackToHome} />;
  }

  if (currentPage === 'exam') {
    return <ExamInterface studentName={studentName} onComplete={handleExamComplete} examConfig={examConfig} />;
  }

  if (currentPage === 'results') {
    return <ResultsPage results={examResults} studentName={studentName} onBackToHome={handleBackToHome} examConfig={examConfig} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-red-50" dir="rtl">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-red-600 text-white p-6 shadow-lg">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {examConfig.headerTitle}
          </h1>
          <p className="text-lg opacity-90">{examConfig.headerSubtitle}</p>
        </div>
        <Button
          variant="ghost"
          className="absolute top-4 left-4 text-white hover:bg-white/20"
          onClick={() => setCurrentPage('admin')}
        >
          إدارة
        </Button>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Message */}
        <Card className="mb-8 shadow-lg border-t-4 border-green-600">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {examConfig.welcomeMessage}
            </h2>
          </CardContent>
        </Card>

        {/* Info Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-md hover:shadow-lg transition-shadow border-r-4 border-blue-500">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Clock className="h-6 w-6 text-blue-500 ml-2" />
              <CardTitle className="text-lg">مدة الامتحان</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-600">{examConfig.duration}</p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow border-r-4 border-purple-500">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <FileText className="h-6 w-6 text-purple-500 ml-2" />
              <CardTitle className="text-lg">عدد الأسئلة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-purple-600">{examConfig.totalQuestions}</p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow border-r-4 border-orange-500">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CheckCircle className="h-6 w-6 text-orange-500 ml-2" />
              <CardTitle className="text-lg">نوع الأسئلة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-orange-600">{examConfig.questionType}</p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow border-r-4 border-green-500 md:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Users className="h-6 w-6 text-green-500 ml-2" />
              <CardTitle className="text-lg">عدد المشاركين</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">{examConfig.participatingStudents}</p>
            </CardContent>
          </Card>
        </div>

        {/* Student Name Input */}
        <Card className="max-w-md mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl flex items-center justify-center">
              <BookOpen className="h-6 w-6 ml-2 text-green-600" />
              {examConfig.startExamTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleStudentNameSubmit} className="space-y-4">
              <div>
                <Label htmlFor="studentName" className="text-lg">{examConfig.nameInputLabel}</Label>
                <Input
                  id="studentName"
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder={examConfig.nameInputPlaceholder}
                  className="mt-2 text-lg p-3 text-right"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
                disabled={!studentName.trim()}
              >
                {examConfig.startExamButton}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            {examConfig.footerText}
          </p>
          <p className="text-xs mt-2 opacity-70">
            {examConfig.footerCopyright}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
