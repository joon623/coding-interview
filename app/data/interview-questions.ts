import type { InterviewQuestion } from "~/types";

export const questions: InterviewQuestion[] = [
  {
    id: "fe-1",
    category: "FE",
    subCategory: "JavaScript",
    question: "이벤트 버블링과 캡처링에 대해 설명해주세요.",
    answer: `DOM 이벤트 전파 방식에는 두 가지가 있습니다:

1. 이벤트 버블링 (Event Bubbling)
- 이벤트가 가장 깊은 요소에서 시작하여 상위로 전파
- 기본적인 이벤트 전파 방식
- event.stopPropagation()으로 중단 가능

2. 이벤트 캡처링 (Event Capturing)
- 이벤트가 최상위 요소에서 시작하여 하위로 전파
- addEventListener의 세 번째 인자로 true 설정 시 사용
- 실제로는 거의 사용되지 않음

예시:
document.addEventListener('click', function(e) {
  console.log('캡처링 단계:', e.target);
}, true);`,
    difficulty: "Intermediate",
    tags: ["JavaScript", "DOM", "Event"],
    likes: 120,
    views: 1500
  },
  {
    id: "fe-2",
    category: "FE",
    subCategory: "React",
    question: "React의 메모이제이션 기법들에 대해 설명해주세요.",
    answer: `React의 주요 메모이제이션 기법들:

1. useMemo
- 계산 비용이 큰 값의 재사용
- 의존성 배열이 변경될 때만 재계산
예시:
const memoizedValue = useMemo(() => computeExpensive(a, b), [a, b]);

2. useCallback
- 함수 인스턴스의 재사용
- 자식 컴포넌트의 불필요한 리렌더링 방지
예시:
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);

3. React.memo
- 컴포넌트 자체의 메모이제이션
- props가 변경될 때만 리렌더링
예시:
const MemoizedComponent = React.memo(MyComponent);

사용 시 주의사항:
1. 과도한 메모이제이션은 오히려 성능 저하
2. 의존성 배열 관리 중요
3. 실제 성능 측정 후 적용 권장`,
    difficulty: "Advanced",
    tags: ["React", "Performance", "Hooks"],
    likes: 180,
    views: 2200
  },
  {
    id: "fe-3",
    category: "FE",
    subCategory: "CSS",
    question: "CSS Grid와 Flexbox의 차이점과 각각의 사용 사례를 설명해주세요.",
    answer: `CSS Grid와 Flexbox는 각각 다른 목적을 가진 레이아웃 시스템입니다:

Flexbox:
1. 1차원 레이아웃 시스템
2. 행 또는 열 중 하나의 방향으로 요소 배치
3. 내용물 크기에 따라 유연하게 조절

사용 사례:
- 네비게이션 메뉴
- 카드 리스트
- 헤더/푸터 내부 요소 배치

Grid:
1. 2차원 레이아웃 시스템
2. 행과 열 모두 고려한 배치
3. 전체적인 레이아웃 구성에 적합

사용 사례:
- 전체 페이지 레이아웃
- 갤러리/대시보드
- 복잡한 그리드 시스템

실제 사용 예시:
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}`,
    difficulty: "Intermediate",
    tags: ["CSS", "Layout", "Responsive"],
    likes: 150,
    views: 1800
  },
  {
    id: "be-1",
    category: "BE",
    subCategory: "Database",
    question: "데이터베이스 인덱싱의 작동 방식과 장단점을 설명해주세요.",
    answer: `인덱싱은 데이터베이스 검색 속도를 향상시키는 데이터 구조입니다.

작동 방식:
1. B-Tree 또는 Hash 인덱스 구조 사용
2. 정렬된 데이터 포인터 유지
3. 이진 검색으로 빠른 데이터 접근

장점:
1. 검색 속도 향상
2. ORDER BY 최적화
3. 중복 제거 효율화

단점:
1. 추가 저장 공간 필요
2. INSERT/UPDATE/DELETE 성능 저하
3. 인덱스 관리 오버헤드`,
    difficulty: "Advanced",
    tags: ["Database", "Indexing", "Performance"],
    likes: 200,
    views: 2500
  },
  {
    id: "devops-1",
    category: "DevOps",
    subCategory: "Container",
    question: "Docker와 가상머신의 차이점은 무엇인가요?",
    answer: `Docker와 가상머신의 주요 차이점:

Docker:
1. 호스트 OS 커널 공유
2. 더 가벼운 리소스 사용
3. 빠른 시작 시간
4. 이미지 레이어 활용

가상머신:
1. 완전한 OS 가상화
2. 더 강력한 격리
3. 더 많은 리소스 필요
4. 더 긴 부팅 시간

사용 시나리오:
- Docker: 마이크로서비스, CI/CD, 개발 환경
- VM: 완전한 격리 필요, 다른 OS 필요 시`,
    difficulty: "Intermediate",
    tags: ["Docker", "Virtualization", "Containers"],
    likes: 150,
    views: 1800
  },
  {
    id: "fe-4",
    category: "FE",
    subCategory: "TypeScript",
    question: "TypeScript의 제네릭과 타입 추론에 대해 설명해주세요.",
    answer: `TypeScript의 제네릭과 타입 추론:

1. 제네릭 (Generics)
- 재사용 가능한 컴포넌트 생성
- 타입 안정성 보장
예시:
function identity<T>(arg: T): T {
  return arg;
}

2. 타입 추론 (Type Inference)
- 컴파일러가 자동으로 타입 추론
- 명시적 타입 선언 생략 가능
예시:
let x = 3; // number로 추론
let arr = [1, 2, 3]; // number[]로 추론

3. 제네릭 제약조건
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}`,
    difficulty: "Intermediate",
    tags: ["TypeScript", "Generics", "Type System"],
    likes: 130,
    views: 1600
  },
  {
    id: "fe-5",
    category: "FE",
    subCategory: "Browser",
    question: "브라우저 렌더링 과정에 대해 설명해주세요.",
    answer: `브라우저 렌더링 과정:

1. HTML 파싱
- HTML 문서를 DOM 트리로 변환
- CSS 파일과 스타일 태그 파싱

2. CSSOM 생성
- CSS를 CSSOM(CSS Object Model)으로 변환
- 스타일 규칙 적용

3. 렌더 트리 생성
- DOM과 CSSOM 결합
- 화면에 표시될 요소만 포함

4. 레이아웃 (리플로우)
- 요소의 크기와 위치 계산
- 뷰포트 크기에 따른 배치

5. 페인트
- 실제 화면에 요소 그리기
- 레이어 순서에 따른 렌더링

성능 최적화:
- CSS 애니메이션은 transform 사용
- JavaScript 애니메이션은 requestAnimationFrame 사용
- 불필요한 리플로우/리페인트 최소화`,
    difficulty: "Advanced",
    tags: ["Browser", "Rendering", "Performance"],
    likes: 170,
    views: 2000
  },
  {
    id: "be-2",
    category: "BE",
    subCategory: "API",
    question: "REST API와 GraphQL의 차이점을 설명해주세요.",
    answer: `REST API와 GraphQL 비교:

REST API:
1. 엔드포인트 기반
2. 과다/과소 데이터 전송
3. 버전 관리 필요
4. 캐싱 용이

GraphQL:
1. 단일 엔드포인트
2. 필요한 데이터만 요청
3. 스키마 기반
4. 실시간 데이터 처리

사용 사례:
REST API:
- 단순한 CRUD 작업
- 캐싱이 중요한 경우
- 마이크로서비스 간 통신

GraphQL:
- 복잡한 데이터 요구사항
- 모바일 앱 백엔드
- 실시간 데이터 업데이트

예시:
// REST API
GET /api/users/1
GET /api/users/1/posts

// GraphQL
query {
  user(id: 1) {
    name
    posts {
      title
    }
  }
}`,
    difficulty: "Advanced",
    tags: ["API", "GraphQL", "REST"],
    likes: 160,
    views: 1900
  },
  {
    id: "be-3",
    category: "BE",
    subCategory: "Security",
    question: "웹 보안의 주요 위협과 대응 방안을 설명해주세요.",
    answer: `주요 웹 보안 위협과 대응:

1. XSS (Cross-Site Scripting)
- 대응: 입력값 검증, 이스케이프 처리
- Content-Security-Policy 헤더 사용

2. CSRF (Cross-Site Request Forgery)
- 대응: CSRF 토큰 사용
- SameSite 쿠키 속성 설정

3. SQL Injection
- 대응: Prepared Statements 사용
- ORM 사용

4. 인증/인가 취약점
- 대응: JWT 사용, 세션 관리
- OAuth 2.0 구현

5. 보안 헤더 설정
- HTTPS 강제
- HSTS 설정
- X-Frame-Options 설정

예시 코드:
// XSS 방지
const sanitizeInput = (input) => {
  return input.replace(/[<>]/g, '');
};

// CSRF 토큰
app.use(csrf({ cookie: true }));

// SQL Injection 방지
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId]);`,
    difficulty: "Advanced",
    tags: ["Security", "Web", "Authentication"],
    likes: 190,
    views: 2300
  },
  {
    id: "devops-2",
    category: "DevOps",
    subCategory: "CI/CD",
    question: "CI/CD 파이프라인의 구성 요소와 각 단계를 설명해주세요.",
    answer: `CI/CD 파이프라인 구성:

1. Continuous Integration (CI)
- 코드 통합
- 자동화된 테스트
- 정적 코드 분석
- 빌드 자동화

2. Continuous Delivery (CD)
- 자동화된 배포
- 환경 구성 관리
- 롤백 전략
- 모니터링

주요 도구:
- Jenkins
- GitHub Actions
- GitLab CI
- CircleCI

파이프라인 예시:
1. 코드 커밋
2. 자동화된 테스트 실행
3. 코드 품질 검사
4. 빌드 생성
5. 스테이징 환경 배포
6. 자동화된 테스트
7. 프로덕션 배포

모니터링:
- 로그 관리
- 성능 모니터링
- 알림 설정
- 메트릭 수집`,
    difficulty: "Intermediate",
    tags: ["CI/CD", "DevOps", "Automation"],
    likes: 140,
    views: 1700
  },
  {
    id: "fe-6",
    category: "FE",
    subCategory: "Web Speech API",
    question: "Web Speech API를 사용한 음성 인식 기능 구현 방법을 설명해주세요.",
    answer: `Web Speech API를 활용한 음성 인식 구현:

1. SpeechRecognition API
- 브라우저 내장 음성 인식 기능
- 실시간 음성-텍스트 변환
- 다국어 지원

2. 기본 구현 방법
const recognition = new SpeechRecognition();
recognition.lang = 'ko-KR'; // 한국어 설정
recognition.continuous = true; // 연속 인식
recognition.interimResults = true; // 중간 결과 표시

recognition.onresult = (event) => {
  const transcript = event.results[event.results.length - 1][0].transcript;
  console.log('인식된 텍스트:', transcript);
};

3. 주요 이벤트
- onstart: 인식 시작
- onend: 인식 종료
- onerror: 오류 발생
- onresult: 결과 반환

4. 사용 예시
function startRecording() {
  recognition.start();
}

function stopRecording() {
  recognition.stop();
}

5. 고려사항
- HTTPS 환경 필요
- 브라우저 호환성 확인
- 오프라인 지원 불가
- 백그라운드 노이즈 처리`,
    difficulty: "Intermediate",
    tags: ["Web Speech API", "Voice Recognition", "Browser API"],
    likes: 110,
    views: 1400
  }
]; 