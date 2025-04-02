import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Share2 } from "lucide-react";

interface Question {
  id: number;
  text: string;
  character: string;
  category: "work" | "communication" | "problem" | "growth";
  options: {
    text: string;
    score: {
      frontend: number;
      backend: number;
      devops: number;
      fullstack: number;
    };
  }[];
}

const characters = {
  question1: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Technologist.png",
  question2: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Woman%20Technologist.png",
  question3: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Keyboard.png",
  question4: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Laptop.png",
  question5: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Star-Struck.png"
};

const questions: Question[] = [
  {
    id: 1,
    text: "새로운 프로젝트를 시작할 때 당신은?",
    character: "question1",
    category: "work",
    options: [
      {
        text: "사용자 경험과 디자인을 먼저 고민한다",
        score: { frontend: 2, backend: 0, devops: 0, fullstack: 1 }
      },
      {
        text: "시스템 아키텍처와 데이터 구조를 먼저 설계한다",
        score: { frontend: 0, backend: 2, devops: 1, fullstack: 1 }
      }
    ]
  },
  {
    id: 2,
    text: "문제가 발생했을 때 당신의 접근 방식은?",
    character: "question2",
    category: "problem",
    options: [
      {
        text: "직관적으로 해결책을 떠올리고 빠르게 시도해본다",
        score: { frontend: 2, backend: 0, devops: 1, fullstack: 1 }
      },
      {
        text: "체계적으로 문제를 분석하고 단계별로 접근한다",
        score: { frontend: 0, backend: 2, devops: 2, fullstack: 1 }
      }
    ]
  },
  {
    id: 3,
    text: "팀 협업 시 당신의 스타일은?",
    character: "question3",
    category: "communication",
    options: [
      {
        text: "활발한 소통과 빠른 피드백을 선호한다",
        score: { frontend: 2, backend: 0, devops: 1, fullstack: 2 }
      },
      {
        text: "문서화와 비동기 커뮤니케이션을 선호한다",
        score: { frontend: 0, backend: 2, devops: 2, fullstack: 1 }
      }
    ]
  },
  {
    id: 4,
    text: "새로운 기술 학습에 대한 당신의 태도는?",
    character: "question4",
    category: "growth",
    options: [
      {
        text: "트렌드를 따라가며 다양한 기술을 익힌다",
        score: { frontend: 2, backend: 0, devops: 1, fullstack: 2 }
      },
      {
        text: "깊이 있는 전문성을 쌓는 것을 선호한다",
        score: { frontend: 0, backend: 2, devops: 2, fullstack: 1 }
      }
    ]
  },
  {
    id: 5,
    text: "당신이 추구하는 개발자의 모습은?",
    character: "question5",
    category: "growth",
    options: [
      {
        text: "사용자에게 가치를 전달하는 창의적인 개발자",
        score: { frontend: 2, backend: 0, devops: 0, fullstack: 1 }
      },
      {
        text: "안정적이고 효율적인 시스템을 만드는 개발자",
        score: { frontend: 0, backend: 2, devops: 2, fullstack: 1 }
      }
    ]
  }
];

interface Result {
  type: string;
  description: string;
  recommendedRoles: string[];
  recommendedCompanies: string[];
  strengthPoints: string[];
}

const results: { [key: string]: Result } = {
  "FRONTEND": {
    type: "창의적인 프론트엔드 개발자",
    description: "사용자 경험을 중요시하며 시각적 완성도를 추구하는 개발자입니다. 새로운 기술에 대한 호기심이 많고, UI/UX에 대한 깊은 이해를 가지고 있습니다.",
    recommendedRoles: ["UI/UX 개발자", "웹 프론트엔드", "모바일 앱 개발자", "크로스플랫폼 개발자"],
    recommendedCompanies: ["디자인 중심 스타트업", "IT 서비스 기업", "디지털 에이전시"],
    strengthPoints: ["뛰어난 UI/UX 감각", "빠른 프로토타이핑", "최신 트렌드 캐치", "사용자 중심 사고"]
  },
  "BACKEND": {
    type: "논리적인 백엔드 개발자",
    description: "안정적이고 확장 가능한 시스템 설계를 추구하는 개발자입니다. 복잡한 비즈니스 로직을 효율적으로 구현하는 것을 좋아합니다.",
    recommendedRoles: ["백엔드 개발자", "서버 개발자", "API 개발자", "데이터베이스 전문가"],
    recommendedCompanies: ["대규모 IT 기업", "핀테크 기업", "보안 회사"],
    strengthPoints: ["시스템 설계 능력", "문제 해결력", "데이터 모델링", "성능 최적화"]
  },
  "DEVOPS": {
    type: "안정적인 데브옵스 엔지니어",
    description: "시스템의 안정성과 효율성을 추구하는 개발자입니다. 자동화와 모니터링을 통해 서비스의 품질을 향상시키는 것을 좋아합니다.",
    recommendedRoles: ["데브옵스 엔지니어", "SRE", "클라우드 엔지니어", "인프라 엔지니어"],
    recommendedCompanies: ["클라우드 서비스 기업", "대규모 서비스 기업", "IT 인프라 기업"],
    strengthPoints: ["인프라 설계", "자동화", "모니터링", "문제 해결력"]
  },
  "FULLSTACK": {
    type: "다재다능한 풀스택 개발자",
    description: "프론트엔드부터 백엔드까지 전체적인 개발 프로세스를 이해하고 구현하는 것을 좋아하는 개발자입니다.",
    recommendedRoles: ["풀스택 개발자", "프로젝트 리더", "기술 책임자", "스타트업 개발자"],
    recommendedCompanies: ["초기 스타트업", "소규모 개발팀", "에이전시"],
    strengthPoints: ["폭넓은 기술 이해", "빠른 학습력", "유연한 문제 해결", "커뮤니케이션"]
  }
};

export default function DeveloperMBTI() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({
    frontend: 0,
    backend: 0,
    devops: 0,
    fullstack: 0
  });
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (score: typeof scores) => {
    const newScores = {
      frontend: scores.frontend + score.frontend,
      backend: scores.backend + score.backend,
      devops: scores.devops + score.devops,
      fullstack: scores.fullstack + score.fullstack
    };

    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    const maxScore = Math.max(
      scores.frontend,
      scores.backend,
      scores.devops,
      scores.fullstack
    );
    
    if (scores.frontend === maxScore) return results.FRONTEND;
    if (scores.backend === maxScore) return results.BACKEND;
    if (scores.devops === maxScore) return results.DEVOPS;
    if (scores.fullstack === maxScore) return results.FULLSTACK;
    
    // 기본값
    return results.FULLSTACK;
  };

  const handleShare = async () => {
    const result = getResult();
    const shareText = `나의 개발자 유형은 "${result?.type}"입니다!\n${window.location.origin}/mbti?type=${encodeURIComponent(result?.type || '')}`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: '개발자 성향 테스트 결과',
          text: shareText,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        alert('결과가 클립보드에 복사되었습니다!');
      }
    } catch (error) {
      console.error('공유 중 오류 발생:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-12">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            개발자 성향 테스트
          </h1>
          <p className="text-lg text-gray-600">
            당신에게 가장 잘 맞는 개발 직무를 찾아보세요
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="p-6">
                <img 
                  src={characters[questions[currentQuestion].character as keyof typeof characters]}
                  alt="개발자 캐릭터"
                  className="w-32 h-32 mx-auto mb-6 object-contain"
                />
                <div className="mb-6">
                  <Progress value={(currentQuestion + 1) / questions.length * 100} />
                  <p className="text-sm text-gray-500 mt-2">
                    {currentQuestion + 1} / {questions.length}
                  </p>
                </div>

                <h2 className="text-xl font-semibold mb-6">
                  {questions[currentQuestion].text}
                </h2>

                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left h-auto p-4 whitespace-normal"
                      onClick={() => handleAnswer(option.score)}
                    >
                      {option.text}
                    </Button>
                  ))}
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">
                    {getResult()?.type}
                  </h2>
                  <p className="text-gray-600">
                    {getResult()?.description}
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold mb-3">추천 직무</h3>
                    <ul className="list-disc list-inside space-y-2">
                      {getResult()?.recommendedRoles.map(role => (
                        <li key={role}>{role}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">강점</h3>
                    <ul className="list-disc list-inside space-y-2">
                      {getResult()?.strengthPoints.map(point => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      setCurrentQuestion(0);
                      setScores({
                        frontend: 0,
                        backend: 0,
                        devops: 0,
                        fullstack: 0
                      });
                      setShowResult(false);
                    }}
                  >
                    다시 테스트하기
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleShare}
                    className="flex items-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    공유하기
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 