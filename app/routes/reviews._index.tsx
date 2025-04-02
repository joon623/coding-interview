import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Review {
  id: string;
  author: {
    name: string;
    position: string;
    company: string;
    avatar: string;
  };
  rating: number;
  content: string;
  date: string;
  tags: string[];
}

const reviews: Review[] = [
  {
    id: "1",
    author: {
      name: "김서연",
      position: "프론트엔드 개발자",
      company: "테크스타트",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    rating: 5,
    content: "면접 준비에 정말 큰 도움이 되었습니다. 실제 면접에서도 여기서 연습한 대로 잘 대답할 수 있었고, 결국 원하는 회사에 합격했습니다!",
    date: "2024-02-15",
    tags: ["프론트엔드", "기술면접", "합격후기"]
  },
  {
    id: "2",
    author: {
      name: "이준호",
      position: "백엔드 개발자",
      company: "클라우드웨이",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    rating: 4,
    content: "다양한 면접 질문들을 미리 접해볼 수 있어서 좋았습니다. 특히 실제 현업 개발자들의 피드백이 큰 도움이 되었어요.",
    date: "2024-02-10",
    tags: ["백엔드", "시스템설계", "데이터베이스"]
  },
  {
    id: "3",
    author: {
      name: "박지민",
      position: "DevOps 엔지니어",
      company: "인프라텍",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    rating: 5,
    content: "DevOps 관련 질문들이 실제 면접과 매우 유사했어요. 특히 컨테이너화와 CI/CD 파이프라인 구축 관련 답변 준비에 도움이 많이 되었습니다.",
    date: "2024-02-08",
    tags: ["DevOps", "인프라", "클라우드"]
  },
  // ... 17개 더 추가
  {
    id: "20",
    author: {
      name: "정다운",
      position: "프로덕트 매니저",
      company: "디지털에이블",
      avatar: "https://i.pravatar.cc/150?img=20",
    },
    rating: 5,
    content: "PM 직무 면접은 찾기 어려웠는데, 여기서 실제 경험 기반의 피드백을 받을 수 있어서 좋았습니다.",
    date: "2024-01-15",
    tags: ["PM", "프로덕트", "기획"]
  },
  {
    id: "4",
    author: {
      name: "한소희",
      position: "풀스택 개발자",
      company: "디지털허브",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    rating: 5,
    content: "풀스택 개발자 면접은 범위가 넓어서 걱정했는데, 체계적으로 준비할 수 있었습니다. 특히 프론트엔드와 백엔드를 모두 다루는 실전 문제들이 도움이 되었어요.",
    date: "2024-02-05",
    tags: ["풀스택", "React", "Node.js"]
  },
  {
    id: "5",
    author: {
      name: "임재현",
      position: "ML 엔지니어",
      company: "AI테크놀로지",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    rating: 4,
    content: "머신러닝 실무 인터뷰 준비에 큰 도움이 되었습니다. 실제 프로젝트 경험을 공유하며 많이 배웠어요.",
    date: "2024-02-03",
    tags: ["머신러닝", "AI", "Python"]
  },
  {
    id: "6",
    author: {
      name: "최유진",
      position: "보안 엔지니어",
      company: "시큐리티원",
      avatar: "https://i.pravatar.cc/150?img=6",
    },
    rating: 5,
    content: "보안 관련 실제 사례 기반의 질문들이 매우 유익했습니다. 침투 테스트와 보안 아키텍처 설계 관련 답변 준비에 많은 도움이 되었어요.",
    date: "2024-02-01",
    tags: ["보안", "네트워크", "침투테스트"]
  },
  {
    id: "7",
    author: {
      name: "박민수",
      position: "모바일 개발자",
      company: "모바일테크",
      avatar: "https://i.pravatar.cc/150?img=7",
    },
    rating: 5,
    content: "iOS 개발자 면접 준비에 완벽했습니다. Swift와 iOS 생태계에 대한 심도 있는 질문들이 실제 면접과 매우 유사했어요.",
    date: "2024-01-30",
    tags: ["iOS", "Swift", "모바일"]
  },
  // ... 계속해서 추가
];

export default function ReviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-indigo-600/90" />
        </div>
        <div className="relative px-4 py-24 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              합격자들의 생생한 후기
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-indigo-100">
              실제 합격자들의 경험담을 통해 성공적인 면접 전략을 세워보세요
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-white py-12"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600">98%</div>
              <div className="mt-2 text-base text-gray-600">합격률</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600">2,400+</div>
              <div className="mt-2 text-base text-gray-600">누적 합격자</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600">4.9</div>
              <div className="mt-2 text-base text-gray-600">평균 평점</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600">50+</div>
              <div className="mt-2 text-base text-gray-600">협력 기업</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Featured Reviews */}
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{
              clickable: true,
              el: '.swiper-pagination',
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            loop={true}
            speed={1000}
            breakpoints={{
              640: { 
                slidesPerView: 2,
                spaceBetween: 20
              },
              1024: { 
                slidesPerView: 3,
                spaceBetween: 30
              },
            }}
            className="relative"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id} className="pb-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="h-full"
                >
                  <div className="h-full bg-white p-8 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={review.author.avatar}
                        alt={review.author.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold">{review.author.name}</h3>
                        <p className="text-sm text-gray-600">
                          {review.author.position} @ {review.author.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    <Quote className="w-8 h-8 text-indigo-200 mb-4" />
                    <p className="text-gray-600 mb-6">{review.content}</p>

                    <div className="flex flex-wrap gap-2">
                      {review.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
            <div className="swiper-pagination" />
          </Swiper>
        </div>
      </div>

      {/* Success Stories */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-white py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">성공 스토리</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {reviews.slice(0, 6).map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.author.avatar}
                    alt={review.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{review.author.name}</h3>
                    <p className="text-sm text-gray-600">{review.author.company}</p>
                  </div>
                </div>
                <p className="text-gray-600">{review.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
} 