
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, User, Clock, Award, BarChart3 } from 'lucide-react';

const ResultsPage = ({ results, studentName, onBackToHome, examConfig }) => {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours} ساعة و ${minutes} دقيقة`;
  };

  const getGradeColor = (grade) => {
    const excellentGrade = examConfig?.excellentGrade || 'ممتاز';
    const veryGoodGrade = examConfig?.veryGoodGrade || 'جيد جداً';
    const goodGrade = examConfig?.goodGrade || 'جيد';
    const acceptableGrade = examConfig?.acceptableGrade || 'مقبول';
    
    switch (grade) {
      case excellentGrade: return 'text-green-600';
      case veryGoodGrade: return 'text-blue-600';
      case goodGrade: return 'text-yellow-600';
      case acceptableGrade: return 'text-orange-600';
      default: return 'text-red-600';
    }
  };

  const getGradeBg = (grade) => {
    const excellentGrade = examConfig?.excellentGrade || 'ممتاز';
    const veryGoodGrade = examConfig?.veryGoodGrade || 'جيد جداً';
    const goodGrade = examConfig?.goodGrade || 'جيد';
    const acceptableGrade = examConfig?.acceptableGrade || 'مقبول';
    
    switch (grade) {
      case excellentGrade: return 'bg-green-50 border-green-200';
      case veryGoodGrade: return 'bg-blue-50 border-blue-200';
      case goodGrade: return 'bg-yellow-50 border-yellow-200';
      case acceptableGrade: return 'bg-orange-50 border-orange-200';
      default: return 'bg-red-50 border-red-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50" dir="rtl">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 shadow-lg">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold mb-2">نتائج الامتحان</h1>
          <div className="flex items-center justify-center">
            <User className="h-5 w-5 ml-2" />
            <span className="text-lg">{studentName}</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg border-t-4 border-blue-500">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <BarChart3 className="h-6 w-6 text-blue-500 ml-2" />
              <CardTitle className="text-sm">الأسئلة المجابة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-600">
                {results.answeredQuestions} من {results.totalQuestions}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-t-4 border-green-500">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CheckCircle className="h-6 w-6 text-green-500 ml-2" />
              <CardTitle className="text-sm">الإجابات الصحيحة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">
                {results.correctAnswers}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-t-4 border-purple-500">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Award className="h-6 w-6 text-purple-500 ml-2" />
              <CardTitle className="text-sm">النسبة المئوية</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-purple-600">
                {results.percentage.toFixed(1)}%
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-t-4 border-orange-500">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Clock className="h-6 w-6 text-orange-500 ml-2" />
              <CardTitle className="text-sm">الوقت المستغرق</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold text-orange-600">
                {formatTime(results.timeSpent)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Grade Card */}
        <Card className={`mb-8 shadow-xl ${getGradeBg(results.grade)}`}>
          <CardContent className="p-8 text-center">
            <Award className={`h-16 w-16 mx-auto mb-4 ${getGradeColor(results.grade)}`} />
            <h2 className="text-3xl font-bold mb-2">التقدير النهائي</h2>
            <p className={`text-4xl font-bold ${getGradeColor(results.grade)}`}>
              {results.grade}
            </p>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">تفاصيل الإجابات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.questions.map((question) => {
                const userAnswer = results.answers[question.id];
                const isCorrect = userAnswer === question.answer;
                const wasAnswered = userAnswer !== undefined;

                return (
                  <div
                    key={question.id}
                    className={`p-4 rounded-lg border-2 ${
                      !wasAnswered
                        ? 'border-gray-200 bg-gray-50'
                        : isCorrect
                        ? 'border-green-200 bg-green-50'
                        : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold mb-2">
                          السؤال {question.id}: {question.text}
                        </p>
                        <div className="flex items-center space-x-4 space-x-reverse text-sm">
                          <span>
                            إجابتك: {
                              !wasAnswered 
                                ? 'لم تجب' 
                                : userAnswer ? 'صح' : 'خطأ'
                            }
                          </span>
                          <span>
                            الإجابة الصحيحة: {question.answer ? 'صح' : 'خطأ'}
                          </span>
                        </div>
                      </div>
                      <div className="mr-4">
                        {!wasAnswered ? (
                          <XCircle className="h-6 w-6 text-gray-400" />
                        ) : isCorrect ? (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : (
                          <XCircle className="h-6 w-6 text-red-500" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Back to Home Button */}
        <div className="text-center">
          <Button 
            onClick={onBackToHome}
            className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-3"
            size="lg"
          >
            العودة للصفحة الرئيسية
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            {examConfig?.footerText || 'تم تصميم الموقع من قبل موسى حامد'}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ResultsPage;
