import { Link } from "@remix-run/react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";

interface JobPosting {
  id: string;
  company: {
    name: string;
    logo: string;
    description: string;
  };
  position: string;
  location: string;
  salary: string;
  skills: string[];
  description: string;
  benefits: string[];
  link: string;
}

const jobPostings: JobPosting[] = [
  {
    id: "1",
    company: {
      name: "네이버",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Naver_Logotype.svg/2560px-Naver_Logotype.svg.png",
      description: "글로벌 ICT 기업",
    },
    position: "프론트엔드 개발자",
    location: "분당구 정자동",
    salary: "5,000 ~ 8,000만원",
    skills: ["React", "TypeScript", "Next.js"],
    description: "네이버 쇼핑 플랫폼 프론트엔드 개발",
    benefits: ["주 35시간 근무", "해외 컨퍼런스 지원", "자기계발비"],
    link: "https://recruit.navercorp.com"
  },
  {
    id: "2",
    company: {
      name: "카카오",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Kakao_CI_yellow.svg/2560px-Kakao_CI_yellow.svg.png",
      description: "모바일 플랫폼 기업",
    },
    position: "백엔드 개발자",
    location: "판교",
    salary: "5,500 ~ 9,000만원",
    skills: ["Spring Boot", "MSA", "AWS"],
    description: "카카오톡 백엔드 서버 개발",
    benefits: ["유연근무제", "원격근무", "교육비 지원"],
    link: "https://careers.kakao.com"
  },
  {
    id: "3",
    company: {
      name: "라인",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Line_New_201907.svg/2560px-Line_New_201907.svg.png",
      description: "글로벌 메신저 플랫폼",
    },
    position: "DevOps 엔지니어",
    location: "서울 송파구",
    salary: "6,000 ~ 9,000만원",
    skills: ["Kubernetes", "Docker", "CI/CD"],
    description: "라인 클라우드 인프라 운영",
    benefits: ["탄력근무제", "연 2회 포상휴가", "복지포인트"],
    link: "https://careers.linecorp.com"
  },
  // ... 더 많은 기업 추가
];

export default function JobList() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              채용 중인 기업
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              최고의 IT 기업에서 여러분의 다음 기회를 찾아보세요
            </p>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {jobPostings.map((job) => (
            <Card key={job.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <img
                    src={job.company.logo}
                    alt={job.company.name}
                    className="h-8 object-contain"
                  />
                  <Badge variant="secondary">{job.location}</Badge>
                </div>

                <h2 className="text-xl font-semibold mb-2">{job.position}</h2>
                <p className="text-sm text-gray-600 mb-4">{job.company.name}</p>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">연봉</p>
                    <p className="text-base font-semibold">{job.salary}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">기술 스택</p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">복리후생</p>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {job.benefits.slice(0, 2).map((benefit) => (
                        <li key={benefit}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button asChild>
                    <Link to={job.link} target="_blank">
                      채용공고 보기
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 