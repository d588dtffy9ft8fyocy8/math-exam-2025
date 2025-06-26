
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const QuestionManager = () => {
  const [questions, setQuestions] = useState(() => {
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
  
  const [editingId, setEditingId] = useState(null);
  const [newQuestion, setNewQuestion] = useState({ text: '', answer: true });
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  const saveQuestions = (updatedQuestions) => {
    localStorage.setItem('examQuestions', JSON.stringify(updatedQuestions));
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    if (!newQuestion.text.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال نص السؤال",
        variant: "destructive",
      });
      return;
    }

    const newId = Math.max(...questions.map(q => q.id), 0) + 1;
    const updatedQuestions = [...questions, { ...newQuestion, id: newId }];
    saveQuestions(updatedQuestions);
    setNewQuestion({ text: '', answer: true });
    setIsAdding(false);
    toast({
      title: "تم إضافة السؤال",
      description: "تم إضافة السؤال الجديد بنجاح",
    });
  };

  const handleEditQuestion = (id, newText, newAnswer) => {
    const updatedQuestions = questions.map(q => 
      q.id === id ? { ...q, text: newText, answer: newAnswer } : q
    );
    saveQuestions(updatedQuestions);
    setEditingId(null);
    toast({
      title: "تم تحديث السؤال",
      description: "تم تحديث السؤال بنجاح",
    });
  };

  const handleDeleteQuestion = (id) => {
    const updatedQuestions = questions.filter(q => q.id !== id);
    saveQuestions(updatedQuestions);
    toast({
      title: "تم حذف السؤال",
      description: "تم حذف السؤال بنجاح",
    });
  };

  return (
    <div className="space-y-6">
      {/* Add New Question */}
      {isAdding ? (
        <Card className="border-2 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-600">إضافة سؤال جديد</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="newQuestionText">نص السؤال</Label>
              <Textarea
                id="newQuestionText"
                value={newQuestion.text}
                onChange={(e) => setNewQuestion(prev => ({ ...prev, text: e.target.value }))}
                placeholder="أدخل نص السؤال هنا..."
                className="mt-2 text-right"
              />
            </div>
            <div>
              <Label>الإجابة الصحيحة</Label>
              <Select value={newQuestion.answer.toString()} onValueChange={(value) => setNewQuestion(prev => ({ ...prev, answer: value === 'true' }))}>
                <SelectTrigger className="mt-2 text-right">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">صح</SelectItem>
                  <SelectItem value="false">خطأ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddQuestion} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 ml-1" />
                حفظ السؤال
              </Button>
              <Button variant="outline" onClick={() => {
                setIsAdding(false);
                setNewQuestion({ text: '', answer: true });
              }}>
                <X className="h-4 w-4 ml-1" />
                إلغاء
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button onClick={() => setIsAdding(true)} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 ml-1" />
          إضافة سؤال جديد
        </Button>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            isEditing={editingId === question.id}
            onEdit={() => setEditingId(question.id)}
            onSave={handleEditQuestion}
            onCancel={() => setEditingId(null)}
            onDelete={() => handleDeleteQuestion(question.id)}
          />
        ))}
      </div>
    </div>
  );
};

const QuestionCard = ({ question, isEditing, onEdit, onSave, onCancel, onDelete }) => {
  const [editText, setEditText] = useState(question.text);
  const [editAnswer, setEditAnswer] = useState(question.answer);

  const handleSave = () => {
    if (!editText.trim()) return;
    onSave(question.id, editText, editAnswer);
  };

  if (isEditing) {
    return (
      <Card className="border-2 border-blue-200">
        <CardContent className="p-4 space-y-4">
          <div>
            <Label>نص السؤال</Label>
            <Textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="mt-2 text-right"
            />
          </div>
          <div>
            <Label>الإجابة الصحيحة</Label>
            <Select value={editAnswer.toString()} onValueChange={(value) => setEditAnswer(value === 'true')}>
              <SelectTrigger className="mt-2 text-right">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">صح</SelectItem>
                <SelectItem value="false">خطأ</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 ml-1" />
              حفظ
            </Button>
            <Button variant="outline" size="sm" onClick={onCancel}>
              <X className="h-4 w-4 ml-1" />
              إلغاء
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-l-4 border-blue-500">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="font-semibold mb-2">السؤال {question.id}</p>
            <p className="text-gray-700 mb-2">{question.text}</p>
            <span className={`inline-block px-2 py-1 rounded text-sm ${
              question.answer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              الإجابة: {question.answer ? 'صح' : 'خطأ'}
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={onDelete} className="text-red-600 hover:text-red-700">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionManager;
