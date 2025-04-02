import { useState } from "react";
import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { InterviewPost } from "~/types";
import { InterviewApplyModal } from "~/components/interview-apply-modal";
import { supabase } from "~/lib/supabase";

export async function loader({ request }: LoaderFunctionArgs) {
  const { data: interviews, error } = await supabase
    .from('interviews')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  const posts: InterviewPost[] = interviews.map(interview => ({
    id: interview.id,
    title: interview.title,
    description: interview.description || "",
    interviewer: {
      id: "unknown",
      name: "면접관", 
      email: "interviewer@example.com",
      role: "INTERVIEWER",
      skills: [],
      experience: 0
    },
    requiredSkills: interview.required_skills,
    experienceLevel: interview.experience_level as "JUNIOR" | "MIDLEVEL" | "SENIOR",
    dateRange: {
      start: interview.date_range.replace(/[\[\]]/g, '').split(',')[0],
      end: interview.date_range.replace(/[\[\]]/g, '').split(',')[1]
    },
    status: interview.status as "OPEN" | "CLOSED",
    createdAt: new Date(interview.created_at).toISOString()
  }));

  return json({ posts });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const postId = formData.get("postId") as string;
  const message = formData.get("message") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;

  if (!postId || !message || !phone || !email) {
    return json(
      { error: "모든 필드를 입력해주세요." },
      { status: 400 }
    );
  }

  const { error: notificationError } = await supabase
    .from('notifications')
    .insert({
      user_id: postId, // 면접 공고 ID를 user_id로 사용
      title: '면접 신청',
      content: message,
      phone,
      email,
    });

  if (notificationError) {
    return json(
      { error: "신청 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }

  return json({ success: true });
}

export default function InterviewList() {
  const { posts } = useLoaderData<typeof loader>();
  const [selectedPost, setSelectedPost] = useState<InterviewPost | null>(null);
  const fetcher = useFetcher();
  

  const handleApply = (data: { message: string; phone: string; email: string }) => {
    if (!selectedPost) return;

    fetcher.submit(
      {
        postId: selectedPost.id,
        message: data.message,
        phone: data.phone,
        email: data.email,
      },
      { method: "post" }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">면접 공고 목록</h1>
          <Button variant="outline">필터</Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <Badge variant={post.status === 'OPEN' ? 'default' : 'secondary'}>
                    {post.status === 'OPEN' ? '모집중' : '마감'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-gray-500 mb-4">{post.description}</p>
                <div className="space-y-2">
                  <div className="flex gap-2 flex-wrap">
                    {post.requiredSkills.map((skill) => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                  <p className="text-sm">
                    면접관: {post.interviewer.name} ({post.interviewer.experience}년차)
                  </p>
                  <p className="text-sm">
                    희망 경력: {experienceLevelToKorean(post.experienceLevel)}
                  </p>
                  <p className="text-sm">
                    면접 가능 기간: {formatDateRange(post.dateRange)}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => setSelectedPost(post)}
                  disabled={post.status !== 'OPEN'}
                >
                  {post.status === 'OPEN' ? '신청하기' : '마감됨'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {selectedPost && (
        <InterviewApplyModal
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          post={selectedPost}
          onSubmit={handleApply}
        />
      )}
    </div>
  );
}

function experienceLevelToKorean(level: InterviewPost['experienceLevel']) {
  const map = {
    JUNIOR: '주니어 (0-3년)',
    MIDLEVEL: '미드레벨 (3-7년)',
    SENIOR: '시니어 (7년 이상)'
  };
  return map[level];
}

function formatDateRange(dateRange: { start: string | Date; end: string | Date }) {
  const start = new Date(dateRange.start);
  const end = new Date(dateRange.end);
  return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
} 