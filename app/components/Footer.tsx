import { Link } from "@remix-run/react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 서비스 정보 */}
          <div>
            <h3 className="text-lg font-bold mb-4">인터뷰 마스터</h3>
            <p className="text-gray-300 text-sm">
              개발자 인터뷰 준비를 위한 최고의 플랫폼
            </p>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h3 className="text-lg font-bold mb-4">빠른 링크</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white text-sm">
                  홈
                </Link>
              </li>
              <li>
                <Link to="/questions" className="text-gray-300 hover:text-white text-sm">
                  질문 목록
                </Link>
              </li>
              <li>
                <Link to="/practice" className="text-gray-300 hover:text-white text-sm">
                  연습하기
                </Link>
              </li>
            </ul>
          </div>

          {/* 카테고리 */}
          <div>
            <h3 className="text-lg font-bold mb-4">카테고리</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/fe" className="text-gray-300 hover:text-white text-sm">
                  프론트엔드
                </Link>
              </li>
              <li>
                <Link to="/category/be" className="text-gray-300 hover:text-white text-sm">
                  백엔드
                </Link>
              </li>
              <li>
                <Link to="/category/devops" className="text-gray-300 hover:text-white text-sm">
                  DevOps
                </Link>
              </li>
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="text-lg font-bold mb-4">연락처</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>이메일: contact@interviewmaster.com</li>
              <li>GitHub: github.com/interviewmaster</li>
              <li>문의하기: support@interviewmaster.com</li>
            </ul>
          </div>
        </div>

        {/* 저작권 */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300 text-sm">
          <p>© 2024 인터뷰 마스터. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 