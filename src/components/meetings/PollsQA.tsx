import { useState } from "react";
import { Plus, X, ThumbsUp, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Poll {
  id: string;
  question: string;
  options: { id: string; text: string; votes: number }[];
  isActive: boolean;
}

interface Question {
  id: string;
  text: string;
  author: string;
  upvotes: number;
  answered: boolean;
}

interface PollsQAProps {
  onClose: () => void;
}

export default function PollsQA({ onClose }: PollsQAProps) {
  const [activeView, setActiveView] = useState<"polls" | "qa">("polls");
  const [polls, setPolls] = useState<Poll[]>([]);
  const [questions, setQuestions] = useState<Question[]>([
    { id: "1", text: "When will the next sprint start?", author: "Alex Chen", upvotes: 3, answered: false },
    { id: "2", text: "Can we share the recording?", author: "Jordan Dev", upvotes: 1, answered: false },
  ]);
  const [newQuestion, setNewQuestion] = useState("");
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);

  const createPoll = () => {
    if (!pollQuestion.trim() || pollOptions.filter((o) => o.trim()).length < 2) return;
    setPolls([...polls, {
      id: String(polls.length + 1),
      question: pollQuestion,
      options: pollOptions.filter((o) => o.trim()).map((o, i) => ({ id: String(i), text: o, votes: 0 })),
      isActive: true,
    }]);
    setPollQuestion("");
    setPollOptions(["", ""]);
    setShowCreatePoll(false);
  };

  const votePoll = (pollId: string, optionId: string) => {
    setPolls(polls.map((p) => p.id === pollId ? {
      ...p,
      options: p.options.map((o) => o.id === optionId ? { ...o, votes: o.votes + 1 } : o),
    } : p));
  };

  const submitQuestion = () => {
    if (!newQuestion.trim()) return;
    setQuestions([...questions, { id: String(questions.length + 1), text: newQuestion, author: "You", upvotes: 0, answered: false }]);
    setNewQuestion("");
  };

  const upvoteQuestion = (id: string) => {
    setQuestions(questions.map((q) => q.id === id ? { ...q, upvotes: q.upvotes + 1 } : q));
  };

  return (
    <div className="glass-panel rounded-xl border-cyan-400/30 p-4 max-h-96 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-1">
          <button onClick={() => setActiveView("polls")} className={cn("px-3 py-1 rounded text-xs font-medium transition-all", activeView === "polls" ? "bg-cyan-500/20 text-cyan-300" : "text-muted-foreground")}>Polls</button>
          <button onClick={() => setActiveView("qa")} className={cn("px-3 py-1 rounded text-xs font-medium transition-all", activeView === "qa" ? "bg-cyan-500/20 text-cyan-300" : "text-muted-foreground")}>Q&A</button>
        </div>
        <button onClick={onClose} className="text-xs text-muted-foreground hover:text-foreground">✕</button>
      </div>

      {activeView === "polls" ? (
        <div className="flex-1 overflow-y-auto space-y-3">
          {!showCreatePoll ? (
            <button onClick={() => setShowCreatePoll(true)} className="w-full text-xs px-3 py-2 rounded bg-white/5 border border-dashed border-cyan-400/30 text-cyan-300 hover:bg-white/10 transition-all flex items-center justify-center gap-1">
              <Plus className="w-3 h-3" /> Create Poll
            </button>
          ) : (
            <div className="p-3 rounded-lg bg-white/5 border border-cyan-400/20 space-y-2">
              <input type="text" value={pollQuestion} onChange={(e) => setPollQuestion(e.target.value)} placeholder="Poll question..." className="w-full text-xs px-2 py-1.5 bg-white/5 border border-cyan-400/30 rounded text-foreground placeholder-muted-foreground outline-none" />
              {pollOptions.map((opt, i) => (
                <div key={i} className="flex gap-1">
                  <input type="text" value={opt} onChange={(e) => { const newOpts = [...pollOptions]; newOpts[i] = e.target.value; setPollOptions(newOpts); }} placeholder={`Option ${i + 1}`} className="flex-1 text-xs px-2 py-1.5 bg-white/5 border border-cyan-400/30 rounded text-foreground placeholder-muted-foreground outline-none" />
                  {pollOptions.length > 2 && <button onClick={() => setPollOptions(pollOptions.filter((_, idx) => idx !== i))} className="text-red-400"><X className="w-3 h-3" /></button>}
                </div>
              ))}
              {pollOptions.length < 4 && <button onClick={() => setPollOptions([...pollOptions, ""])} className="text-xs text-cyan-300">+ Add option</button>}
              <div className="flex gap-2">
                <button onClick={createPoll} className="flex-1 text-xs px-2 py-1.5 rounded bg-cyan-500/20 border border-cyan-400/50 text-cyan-300">Create</button>
                <button onClick={() => setShowCreatePoll(false)} className="text-xs px-2 py-1.5 rounded text-muted-foreground">Cancel</button>
              </div>
            </div>
          )}

          {polls.map((poll) => {
            const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);
            return (
              <div key={poll.id} className="p-3 rounded-lg bg-white/5 border border-cyan-400/20">
                <p className="text-xs font-semibold text-foreground mb-2">{poll.question}</p>
                <div className="space-y-1.5">
                  {poll.options.map((opt) => {
                    const pct = totalVotes > 0 ? (opt.votes / totalVotes) * 100 : 0;
                    return (
                      <button key={opt.id} onClick={() => votePoll(poll.id, opt.id)} className="w-full text-left">
                        <div className="relative rounded overflow-hidden bg-white/5 h-7">
                          <div className="absolute inset-y-0 left-0 bg-cyan-500/30" style={{ width: `${pct}%` }} />
                          <div className="relative flex items-center justify-between px-2 h-full">
                            <span className="text-xs text-foreground">{opt.text}</span>
                            <span className="text-xs text-muted-foreground">{opt.votes}</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">{totalVotes} votes</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-2">
          <div className="flex gap-2 mb-2">
            <input type="text" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submitQuestion()} placeholder="Ask a question..." className="flex-1 text-xs px-2 py-1.5 bg-white/5 border border-cyan-400/30 rounded text-foreground placeholder-muted-foreground outline-none" />
            <button onClick={submitQuestion} className="text-xs px-2 py-1.5 rounded bg-cyan-500/20 border border-cyan-400/50 text-cyan-300">Ask</button>
          </div>
          {questions.sort((a, b) => b.upvotes - a.upvotes).map((q) => (
            <div key={q.id} className="flex items-start gap-2 p-2 rounded-lg bg-white/5">
              <button onClick={() => upvoteQuestion(q.id)} className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-cyan-400 transition-all">
                <ThumbsUp className="w-3 h-3" />
                <span className="text-[10px]">{q.upvotes}</span>
              </button>
              <div className="flex-1">
                <p className="text-xs text-foreground">{q.text}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{q.author}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
