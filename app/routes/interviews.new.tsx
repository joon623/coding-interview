import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { Form, json, useActionData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { supabase } from "~/lib/supabase";

function generateUUID() {
  return crypto.randomUUID();
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  
  try {
    const title = formData.get("title");
    const description = formData.get("description");
    const requiredSkills = formData.get("requiredSkills");
    const experienceLevel = formData.get("experienceLevel");
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");

    if (!title || !description || !requiredSkills || !experienceLevel || !startDate || !endDate) {
      return json({ error: "모든 필드를 입력해주세요." }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('interviews')
      .insert({
        title: title as string,
        description: description as string,
        required_skills: (requiredSkills as string).split(",").map(skill => skill.trim()),
        experience_level: experienceLevel as "JUNIOR" | "MIDLEVEL" | "SENIOR",
        date_range: `[${new Date(startDate as string).toISOString()},${new Date(endDate as string).toISOString()})`,
        status: "OPEN"
      })
      .select()
      .single();

    if (error) throw error;

    return redirect("/interviews");
  } catch (error) {
    console.error(error);
    return json({ error: "면접 공고 등록 중 오류가 발생했습니다." }, { status: 500 });
  }
}

export default function NewInterview() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">면접 공고 등록</h1>
        
        <Form method="post" className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              name="title"
              placeholder="면접 제목을 입력하세요"
              required
            />
            </div>

          <div className="space-y-2">
            <Label htmlFor="description">상세 설명</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="면접에 대한 상세 설명을 입력하세요"
              className="h-32"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requiredSkills">필요 기술 (쉼표로 구분)</Label>
            <Input
              id="requiredSkills"
              name="requiredSkills"
              placeholder="예: React, TypeScript, Node.js"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experienceLevel">희망 경력</Label>
            <Select name="experienceLevel" defaultValue="JUNIOR">
              <SelectTrigger>
                <SelectValue placeholder="경력 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="JUNIOR">주니어 (0-3년)</SelectItem>
                <SelectItem value="MIDLEVEL">미드레벨 (3-7년)</SelectItem>
                <SelectItem value="SENIOR">시니어 (7년 이상)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">면접 시작 가능일</Label>
              <Input
                type="date"
                id="startDate"
                name="startDate"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">면접 종료일</Label>
              <Input
                type="date"
                id="endDate"
                name="endDate"
                required
              />
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full">
              공고 등록하기
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
} 