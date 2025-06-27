// import { collection, getDocs } from 'firebase/firestore';
// import { db } from './firebase'; // عدل المسار حسب مكان ملف firebase.js
// import React, { useState, useEffect } from 'react';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { ArrowRight, Settings, Users, FileText, Shield, CheckCircle, XCircle } from 'lucide-react';
// import { useToast } from "@/hooks/use-toast";
// import QuestionManager from './QuestionManager';

// const AdminPanel = ({ examConfig, setExamConfig, onBack }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [password, setPassword] = useState('');
//   const [tempConfig, setTempConfig] = useState(examConfig);
//   const [studentResults, setStudentResults] = useState([]);
//   const { toast } = useToast();

//   const correctPassword = 'NKuidfBJKD63$%#ukjfes++4358nuy33Mousa32rn8$#QTF%';

//   useEffect(() => {
//     if (isAuthenticated) {
//       loadStudentResults();
//     }
//   }, [isAuthenticated]);

//   // const loadStudentResults = () => {
//   //   const results = JSON.parse(localStorage.getItem('studentResults') || '[]');
//   //   setStudentResults(results);
//   // };
//   const loadStudentResults = async () => {
//   try {
//     const querySnapshot = await getDocs(collection(db, "studentResults"));
//     const resultsFromFirebase = querySnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//     setStudentResults(resultsFromFirebase);
//   } catch (error) {
//     console.error("Error loading results from Firebase:", error);
//   }
// };


//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (password === correctPassword) {
//       setIsAuthenticated(true);
//       toast({
//         title: "تم تسجيل الدخول بنجاح",
//         description: "مرحباً بك في لوحة التحكم",
//       });
//     } else {
//       toast({
//         title: "كلمة مرور خاطئة",
//         description: "يرجى التحقق من كلمة المرور والمحاولة مرة أخرى",
//         variant: "destructive",
//       });
//       setPassword('');
//     }
//   };

//   const handleSaveConfig = () => {
//     setExamConfig(tempConfig);
//     toast({
//       title: "تم حفظ التغييرات",
//       description: "تم تحديث إعدادات الامتحان بنجاح",
//     });
//   };

//   const clearAllResults = () => {
//     localStorage.removeItem('studentResults');
//     setStudentResults([]);
//     setExamConfig(prev => ({ ...prev, participatingStudents: 0 }));
//     toast({
//       title: "تم حذف جميع النتائج",
//       description: "تم مسح جميع نتائج الطلاب بنجاح",
//     });
//   };

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center" dir="rtl">
//         <Card className="w-full max-w-md shadow-xl">
//           <CardHeader className="text-center">
//             <Shield className="h-12 w-12 mx-auto mb-4 text-red-600" />
//             <CardTitle className="text-2xl">لوحة التحكم</CardTitle>
//             <p className="text-gray-600">يرجى إدخال كلمة المرور للدخول</p>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleLogin} className="space-y-4">
//               <div>
//                 <Label htmlFor="password">كلمة المرور</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="أدخل كلمة المرور"
//                   className="mt-2 text-right"
//                   required
//                 />
//               </div>
//               <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
//                 دخول
//               </Button>
//               <Button type="button" variant="outline" className="w-full" onClick={onBack}>
//                 العودة للموقع
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50" dir="rtl">
//       {/* Header */}
//       <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 shadow-lg">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-2xl font-bold flex items-center">
//             <Settings className="h-6 w-6 ml-2" />
//             لوحة التحكم
//           </h1>
//           <Button variant="ghost" className="text-white hover:bg-white/20" onClick={onBack}>
//             <ArrowRight className="h-4 w-4 ml-1" />
//             العودة للموقع
//           </Button>
//         </div>
//       </header>

//       <main className="container mx-auto px-4 py-8">
//         <Tabs defaultValue="settings" className="space-y-6">
//           <TabsList className="grid w-full grid-cols-3">
//             <TabsTrigger value="settings" className="flex items-center">
//               <Settings className="h-4 w-4 ml-1" />
//               الإعدادات
//             </TabsTrigger>
//             <TabsTrigger value="questions" className="flex items-center">
//               <FileText className="h-4 w-4 ml-1" />
//               الأسئلة
//             </TabsTrigger>
//             <TabsTrigger value="results" className="flex items-center">
//               <Users className="h-4 w-4 ml-1" />
//               النتائج
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="settings" className="space-y-6">
//             <Card className="shadow-lg">
//               <CardHeader>
//                 <CardTitle>إعدادات الامتحان الأساسية</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <Label htmlFor="duration">مدة الامتحان</Label>
//                     <Input
//                       id="duration"
//                       value={tempConfig.duration}
//                       onChange={(e) => setTempConfig(prev => ({ ...prev, duration: e.target.value }))}
//                       className="mt-2 text-right"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="totalQuestions">عدد الأسئلة</Label>
//                     <Input
//                       id="totalQuestions"
//                       type="number"
//                       value={tempConfig.totalQuestions}
//                       onChange={(e) => setTempConfig(prev => ({ ...prev, totalQuestions: parseInt(e.target.value) }))}
//                       className="mt-2 text-right"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="questionType">نوع الأسئلة</Label>
//                     <Input
//                       id="questionType"
//                       value={tempConfig.questionType}
//                       onChange={(e) => setTempConfig(prev => ({ ...prev, questionType: e.target.value }))}
//                       className="mt-2 text-right"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="participatingStudents">عدد المشاركين</Label>
//                     <Input
//                       id="participatingStudents"
//                       type="number"
//                       value={tempConfig.participatingStudents}
//                       onChange={(e) => setTempConfig(prev => ({ ...prev, participatingStudents: parseInt(e.target.value) }))}
//                       className="mt-2 text-right"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <Label htmlFor="welcomeMessage">رسالة الترحيب</Label>
//                   <Textarea
//                     id="welcomeMessage"
//                     value={tempConfig.welcomeMessage}
//                     onChange={(e) => setTempConfig(prev => ({ ...prev, welcomeMessage: e.target.value }))}
//                     className="mt-2 text-right h-24"
//                   />
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="shadow-lg">
//               <CardHeader>
//                 <CardTitle>إعدادات النصوص</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <Label htmlFor="headerTitle">عنوان الرأس الرئيسي</Label>
//                     <Input
//                       id="headerTitle"
//                       value={tempConfig.headerTitle}
//                       onChange={(e) => setTempConfig(prev => ({ ...prev, headerTitle: e.target.value }))}
//                       className="mt-2 text-right"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="headerSubtitle">العنوان الفرعي</Label>
//                     <Input
//                       id="headerSubtitle"
//                       value={tempConfig.headerSubtitle}
//                       onChange={(e) => setTempConfig(prev => ({ ...prev, headerSubtitle: e.target.value }))}
//                       className="mt-2 text-right"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="startExamTitle">عنوان بدء الامتحان</Label>
//                     <Input
//                       id="startExamTitle"
//                       value={tempConfig.startExamTitle}
//                       onChange={(e) => setTempConfig(prev => ({ ...prev, startExamTitle: e.target.value }))}
//                       className="mt-2 text-right"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="nameInputLabel">تسمية حقل الاسم</Label>
//                     <Input
//                       id="nameInputLabel"
//                       value={tempConfig.nameInputLabel}
//                       onChange={(e) => setTempConfig(prev => ({ ...prev, nameInputLabel: e.target.value }))}
//                       className="mt-2 text-right"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="nameInputPlaceholder">مثال حقل الاسم</Label>
//                     <Input
//                       id="nameInputPlaceholder"
//                       value={tempConfig.nameInputPlaceholder}
//                       onChange={(e) => setTempConfig(prev => ({ ...prev, nameInputPlaceholder: e.target.value }))}
//                       className="mt-2 text-right"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="startExamButton">نص زر بدء الامتحان</Label>
//                     <Input
//                       id="startExamButton"
//                       value={tempConfig.startExamButton}
//                       onChange={(e) => setTempConfig(prev => ({ ...prev, startExamButton: e.target.value }))}
//                       className="mt-2 text-right"
//                     />
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <Label htmlFor="footerText">نص التذييل</Label>
//                     <Input
//                       id="footerText"
//                       value={tempConfig.footerText}
//                       onChange={(e) => setTempConfig(prev => ({ ...prev, footerText: e.target.value }))}
//                       className="mt-2 text-right"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="footerCopyright">نص حقوق النشر</Label>
//                     <Input
//                       id="footerCopyright"
//                       value={tempConfig.footerCopyright}
//                       onChange={(e) => setTempConfig(prev => ({ ...prev, footerCopyright: e.target.value }))}
//                       className="mt-2 text-right"
//                     />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="shadow-lg">
//               <CardHeader>
//                 <CardTitle>تسميات التقديرات</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   <div>
//                     <Label htmlFor="excellentGrade">ممتاز (90% فأكثر)</Label>
//                     <Input
//                       id="excellentGrade"
//                       value={tempConfig.excellentGrade}
//                       onChange={(e) => setTempConfig(prev => ({ ...prev, excellentGrade: e.target.value }))}
//                       className="mt-2 text-right"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="veryGoodGrade">جيد جداً (80-89%)</Label>
//                     <Input
//                       id="veryGoodGrade"
//                       value={tempConfig.veryGoodGrade}
//                       onChange={(e) => setTempConfig(prev => ({ ...prev, veryGoodGrade: e.target.value }))}
//                       className="mt-2 text-right"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="goodGrade">جيد (70-79%)</Label>
//                     <Input
//                       id="goodGrade"
//                       value={tempConfig.goodGrade}
//                       onChange={(e) => setTempConfig(prev => ({ ...prev, goodGrade: e.target.value }))}
//                       className="mt-2 text-right"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="acceptableGrade">مقبول (60-69%)</Label>
//                     <Input
//                       id="acceptableGrade"
//                       value={tempConfig.acceptableGrade}
//                       onChange={(e) => setTempConfig(prev => ({ ...prev, acceptableGrade: e.target.value }))}
//                       className="mt-2 text-right"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="weakGrade">ضعيف (أقل من 60%)</Label>
//                     <Input
//                       id="weakGrade"
//                       value={tempConfig.weakGrade}
//                       onChange={(e) => setTempConfig(prev => ({ ...prev, weakGrade: e.target.value }))}
//                       className="mt-2 text-right"
//                     />
//                   </div>
//                 </div>
//                 <Button onClick={handleSaveConfig} className="bg-green-600 hover:bg-green-700">
//                   حفظ جميع التغييرات
//                 </Button>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="questions" className="space-y-6">
//             <Card className="shadow-lg">
//               <CardHeader>
//                 <CardTitle>إدارة الأسئلة</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <QuestionManager />
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="results" className="space-y-6">
//             <Card className="shadow-lg">
//               <CardHeader className="flex flex-row items-center justify-between">
//                 <CardTitle>نتائج الطلاب ({studentResults.length})</CardTitle>
//                 <div className="flex gap-2">
//                   <Button variant="outline" onClick={loadStudentResults}>
//                     تحديث
//                   </Button>
//                   <Button variant="destructive" onClick={clearAllResults}>
//                     مسح جميع النتائج
//                   </Button>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 {studentResults.length === 0 ? (
//                   <div className="text-center py-8">
//                     <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
//                     <p className="text-gray-500">
//                       لا توجد نتائج بعد. ستظهر النتائج هنا عندما يكمل الطلاب الامتحان.
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     {studentResults.map((result) => (
//                       <Card key={result.id} className="border-l-4 border-blue-500">
//                         <CardContent className="p-4">
//                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                             <div>
//                               <p className="font-semibold text-lg">{result.studentName}</p>
//                               <p className="text-sm text-gray-600">
//                                 {new Date(result.submittedAt).toLocaleDateString('ar-EG')}
//                               </p>
//                             </div>
//                             <div className="flex items-center">
//                               <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
//                               <span>{result.correctAnswers} من {result.totalQuestions}</span>
//                             </div>
//                             <div className="flex items-center">
//                               <span className={`font-bold ${
//                                 result.percentage >= 70 ? 'text-green-600' : 
//                                 result.percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
//                               }`}>
//                                 {result.percentage.toFixed(1)}%
//                               </span>
//                             </div>
//                             <div className="flex items-center">
//                               <span className={`font-semibold ${
//                                 result.grade === 'ممتاز' ? 'text-green-600' : 
//                                 result.grade === 'جيد جداً' ? 'text-blue-600' :
//                                 result.grade === 'جيد' ? 'text-yellow-600' :
//                                 result.grade === 'مقبول' ? 'text-orange-600' : 'text-red-600'
//                               }`}>
//                                 {result.grade}
//                               </span>
//                             </div>
//                           </div>
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </main>
//     </div>
//   );
// };

// export default AdminPanel;

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Settings, Users, FileText, Shield, CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import QuestionManager from './QuestionManager';

// Firebase imports
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase'; // عدل المسار حسب مكان ملف firebase.js

const AdminPanel = ({ examConfig, setExamConfig, onBack }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [tempConfig, setTempConfig] = useState(examConfig);
  const [studentResults, setStudentResults] = useState([]);
  const { toast } = useToast();

  const correctPassword = 'NKuidfBJKD63$%#ukjfes++4358nuy33Mousa32rn8$#QTF%';

  useEffect(() => {
    if (isAuthenticated) {
      loadStudentResults();
    }
  }, [isAuthenticated]);

  // قراءة النتائج من Firebase
  const loadStudentResults = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "studentResults"));
      const resultsFromFirebase = querySnapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      setStudentResults(resultsFromFirebase);
    } catch (error) {
      console.error("Error loading results from Firebase:", error);
      toast({
        title: "خطأ في تحميل النتائج",
        description: "حدث خطأ أثناء تحميل نتائج الطلاب من قاعدة البيانات.",
        variant: "destructive",
      });
    }
  };

  // حذف جميع النتائج من Firebase
  const clearAllResults = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "studentResults"));
      const batchDelete = querySnapshot.docs.map(docSnap => deleteDoc(doc(db, "studentResults", docSnap.id)));
      await Promise.all(batchDelete);

      setStudentResults([]);
      setExamConfig(prev => ({ ...prev, participatingStudents: 0 }));
      toast({
        title: "تم حذف جميع النتائج",
        description: "تم مسح جميع نتائج الطلاب بنجاح",
      });
    } catch (error) {
      console.error("Error deleting results from Firebase:", error);
      toast({
        title: "خطأ في حذف النتائج",
        description: "حدث خطأ أثناء حذف نتائج الطلاب من قاعدة البيانات.",
        variant: "destructive",
      });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في لوحة التحكم",
      });
    } else {
      toast({
        title: "كلمة مرور خاطئة",
        description: "يرجى التحقق من كلمة المرور والمحاولة مرة أخرى",
        variant: "destructive",
      });
      setPassword('');
    }
  };

  const handleSaveConfig = () => {
    setExamConfig(tempConfig);
    toast({
      title: "تم حفظ التغييرات",
      description: "تم تحديث إعدادات الامتحان بنجاح",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center" dir="rtl">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <Shield className="h-12 w-12 mx-auto mb-4 text-red-600" />
            <CardTitle className="text-2xl">لوحة التحكم</CardTitle>
            <p className="text-gray-600">يرجى إدخال كلمة المرور للدخول</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">كلمة المرور</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  className="mt-2 text-right"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                دخول
              </Button>
              <Button type="button" variant="outline" className="w-full" onClick={onBack}>
                العودة للموقع
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50" dir="rtl">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <Settings className="h-6 w-6 ml-2" />
            لوحة التحكم
          </h1>
          <Button variant="ghost" className="text-white hover:bg-white/20" onClick={onBack}>
            <ArrowRight className="h-4 w-4 ml-1" />
            العودة للموقع
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="settings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="h-4 w-4 ml-1" />
              الإعدادات
            </TabsTrigger>
            <TabsTrigger value="questions" className="flex items-center">
              <FileText className="h-4 w-4 ml-1" />
              الأسئلة
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center">
              <Users className="h-4 w-4 ml-1" />
              النتائج
            </TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-6">
            {/* الإعدادات الأساسية والإضافية ... */}
            {/* يمكنك إبقاء إعداداتك كما هي هنا، أو تعديله حسب حاجتك */}
          </TabsContent>

          <TabsContent value="questions" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>إدارة الأسئلة</CardTitle>
              </CardHeader>
              <CardContent>
                <QuestionManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>نتائج الطلاب ({studentResults.length})</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={loadStudentResults}>
                    تحديث
                  </Button>
                  <Button variant="destructive" onClick={clearAllResults}>
                    مسح جميع النتائج
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {studentResults.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">
                      لا توجد نتائج بعد. ستظهر النتائج هنا عندما يكمل الطلاب الامتحان.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {studentResults.map((result) => (
                      <Card key={result.id} className="border-l-4 border-blue-500">
                        <CardContent className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                              <p className="font-semibold text-lg">{result.studentName}</p>
                              <p className="text-sm text-gray-600">
                                {new Date(result.submittedAt).toLocaleDateString('ar-EG')}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                              <span>{result.correctAnswers} من {result.totalQuestions}</span>
                            </div>
                            <div className="flex items-center">
                              <span className={`font-bold ${
                                result.percentage >= 70 ? 'text-green-600' : 
                                result.percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {result.percentage.toFixed(1)}%
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className={`font-semibold ${
                                result.grade === 'ممتاز' ? 'text-green-600' : 
                                result.grade === 'جيد جداً' ? 'text-blue-600' :
                                result.grade === 'جيد' ? 'text-yellow-600' :
                                result.grade === 'مقبول' ? 'text-orange-600' : 'text-red-600'
                              }`}>
                                {result.grade}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPanel;
