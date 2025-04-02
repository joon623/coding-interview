import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import type { InterviewPost } from "~/types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  post: InterviewPost;
  onSubmit: (data: { message: string; phone: string; email: string }) => void;
};

export function InterviewApplyModal({ isOpen, onClose, post, onSubmit }: Props) {
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    onSubmit({ message, phone, email });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>면접 신청하기</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>면접 제목</Label>
            <p className="text-sm text-gray-500">{post.title}</p>
          </div>
          <div className="space-y-2">
            <Label>면접관</Label>
            <p className="text-sm text-gray-500">{post.interviewer.name}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">연락처</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="010-0000-0000"
              type="tel"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">자기소개 및 신청 사유</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="면접관에게 보낼 메시지를 작성해주세요."
              className="h-32"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>취소</Button>
          <Button 
            onClick={handleSubmit}
            disabled={!message || !phone || !email}
          >
            신청하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 