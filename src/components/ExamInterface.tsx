import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase'; // عدل المسار حسب مكان ملف firebase.js
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Clock, User } from 'lucide-react';

const ExamInterface = ({ studentName, onComplete, examConfig }) => {
  const [questions] = useState(() => {
    const saved = localStorage.getItem('examQuestions');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: 1, text: "مجموع زوايا المثلث يساوي 180 درجة", answer: true },
      { id: 2, text: "العدد صفر هو عدد طبيعي", answer: false },
      { id: 3, text: "حاصل ضرب أي عدد في الصفر يساوي صفر", answer: true },
      { id: 4, text: "الجذر التربيعي للعدد 16 يساوي 4", answer: true },
      { id: 5, text: "المعادلة الخطية لها حل واحد فقط", answer: false },
      { id: 6, text: "مساحة المربع = طول الضلع × 2", answer: false },
      { id: 7, text: "النسبة المئوية 50% تعادل الكسر 1/2", answer: true },
      { id: 8, text: "العدد السالب أصغر من العدد الموجب دائماً", answer: true },
      { id: 9, text: "مجموع الزوايا الداخلية للمربع 360 درجة", answer: true },
      { id: 10, text: "الرقم 1 هو عدد أولي", answer: false }
    ];
  });

  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(180 * 60); // 3 hours in seconds
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value === 'true'
    }));
  };

const handleSubmit = async () => {
  const results = {
    totalQuestions: questions.length,
    answeredQuestions: Object.keys(answers).length,
    correctAnswers: questions.filter(q => answers[q.id] === q.answer).length,
    answers: answers,
    questions: questions,
    timeSpent: 180 * 60 - timeLeft,
    percentage: 0,
    grade: ''
  };
  
  results.percentage = (results.correctAnswers / results.totalQuestions) * 100;
  results.grade = results.percentage >= 90 ? examConfig?.excellentGrade || 'ممتاز' : 
                  results.percentage >= 80 ? examConfig?.veryGoodGrade || 'جيد جداً' : 
                  results.percentage >= 70 ? examConfig?.goodGrade || 'جيد' : 
                  results.percentage >= 60 ? examConfig?.acceptableGrade || 'مقبول' : 
                  examConfig?.weakGrade || 'ضعيف';

  const newResult = {
    studentName,
    ...results,
    submittedAt: new Date().toISOString()
  };

  try {
    await addDoc(collection(db, "studentResults"), newResult);
    console.log("Result saved to Firebase!");
    onComplete(results);
  } catch (error) {
    console.error("Error saving result: ", error);
  }
};


  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50" dir="rtl">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <User className="h-5 w-5 ml-2" />
            <span className="font-semibold">{studentName}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 ml-2" />
            <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Progress Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                السؤال {currentQuestionIndex + 1} من {questions.length}
              </span>
              <span className="text-sm text-gray-600">
                {Math.round(progress)}% مكتمل
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question, index) => (
            <Card key={question.id} className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">
                  السؤال {question.id}: {question.text}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={answers[question.id] !== undefined ? answers[question.id].toString() : ''}
                  onValueChange={(value) => handleAnswerChange(question.id, value)}
                >
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="true" id={`true-${question.id}`} />
                    <Label htmlFor={`true-${question.id}`} className="text-lg cursor-pointer">
                      صح
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="false" id={`false-${question.id}`} />
                    <Label htmlFor={`false-${question.id}`} className="text-lg cursor-pointer">
                      خطأ
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Submit Button */}
        <Card className="mt-8 bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <p className="mb-4 text-gray-700">
              تأكد من إجاباتك قبل تسليم الامتحان
            </p>
            <Button 
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3"
              size="lg"
            >
              تسليم الامتحان
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ExamInterface;