import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Server, Cog, ChevronDown } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import type { InterviewQuestion } from "~/types";
import { questions } from "~/data/interview-questions";

export default function QuestionList() {
  const [selectedCategory, setSelectedCategory] = useState<string>("FE");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredQuestions = questions.filter((q: InterviewQuestion) => 
    q.category === selectedCategory &&
    (searchTerm === "" || 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (selectedDifficulty.length === 0 || selectedDifficulty.includes(q.difficulty))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-indigo-600 text-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              기술 면접 질문 모음
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-indigo-100">
              200+ 실제 기술 면접 질문과 모범 답안을 제공합니다
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                className="pl-10"
                placeholder="질문 또는 키워드 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs defaultValue="FE" className="w-full sm:w-auto" onValueChange={setSelectedCategory}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="FE" className="flex items-center gap-2">
                  <BookOpen size={16} />
                  Frontend
                </TabsTrigger>
                <TabsTrigger value="BE" className="flex items-center gap-2">
                  <Server size={16} />
                  Backend
                </TabsTrigger>
                <TabsTrigger value="DevOps" className="flex items-center gap-2">
                  <Cog size={16} />
                  DevOps
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {filteredQuestions.map((question: InterviewQuestion) => (
            <motion.div
              key={question.id}
              layout
              className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <div 
                className="p-6 cursor-pointer"
                onClick={() => setExpandedId(expandedId === question.id ? null : question.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant={
                        question.difficulty === 'Basic' ? 'default' :
                        question.difficulty === 'Intermediate' ? 'secondary' : 'destructive'
                      }>
                        {question.difficulty}
                      </Badge>
                      <span className="text-sm text-gray-500">{question.subCategory}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {question.question}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {question.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline" className="bg-indigo-50">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <ChevronDown
                    className={`flex-shrink-0 transition-transform ${
                      expandedId === question.id ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {expandedId === question.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t"
                    >
                      <div className="prose prose-indigo max-w-none">
                        <p className="text-gray-600 whitespace-pre-line">
                          {question.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">검색 결과가 없습니다</h3>
            <p className="mt-2 text-sm text-gray-500">다른 검색어로 시도해보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
} 