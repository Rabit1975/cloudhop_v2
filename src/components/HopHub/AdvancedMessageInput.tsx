import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { MessageType, MessagePriority, MessageSchedule, MediaAttachment, FileUploadStatus } from '../../types/hophub';

interface AdvancedMessageInputProps {
  onSendMessage: (message: {
    text: string;
    type: MessageType;
    mediaAttachments?: MediaAttachment[];
    priority?: MessagePriority;
    scheduleInfo?: MessageSchedule;
    replyToId?: string;
    selfDestructAfter?: number;
  }) => void;
  onFileUpload: (files: File[]) => void;
  onVoiceRecord: (audioBlob: Blob) => void;
  onLocationShare?: (location: { latitude: number; longitude: number; address?: string }) => void;
  onPollCreate?: (poll: { question: string; options: string[]; isAnonymous: boolean; multipleChoice: boolean }) => void;
  
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  maxFileSize?: number;
  supportedFileTypes?: string[];
  
  // Reply context
  replyToMessage?: {
    id: string;
    text: string;
    senderName: string;
  };
  onCancelReply?: () => void;
  
  // UI state
  showEmojiPicker?: boolean;
  showGifPicker?: boolean;
  showStickerPicker?: boolean;
  showBotCommands?: boolean;
  
  className?: string;
}

export default function AdvancedMessageInput({
  onSendMessage,
  onFileUpload,
  onVoiceRecord,
  onLocationShare,
  onPollCreate,
  placeholder = "Type a message...",
  disabled = false,
  maxLength = 4096,
  maxFileSize = 100 * 1024 * 1024, // 100MB default
  supportedFileTypes = ['image/*', 'video/*', 'audio/*', 'application/pdf', '.doc,.docx,.txt'],
  replyToMessage,
  onCancelReply,
  showEmojiPicker = false,
  showGifPicker = false,
  showStickerPicker = false,
  showBotCommands = false,
  className,
}: AdvancedMessageInputProps) {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showSelfDestructDialog, setShowSelfDestructDialog] = useState(false);
  const [showPriorityDialog, setShowPriorityDialog] = useState(false);
  const [showPollDialog, setShowPollDialog] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  // Handle text input
  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
    }
  }, [maxLength]);

  // Handle send message
  const handleSend = useCallback(() => {
    if (!text.trim() && selectedFiles.length === 0) return;
    
    const messageData: any = {
      text: text.trim(),
      type: selectedFiles.length > 0 ? 'MEDIA' : 'TEXT',
      replyToId: replyToMessage?.id,
    };

    // Handle file attachments
    if (selectedFiles.length > 0) {
      onFileUpload(selectedFiles);
      setSelectedFiles([]);
    }

    onSendMessage(messageData);
    setText('');
    onCancelReply?.();
  }, [text, selectedFiles, replyToMessage, onSendMessage, onFileUpload, onCancelReply]);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Allow new line with Shift+Enter
        return;
      } else {
        e.preventDefault();
        handleSend();
      }
    } else if (e.key === 'Escape') {
      onCancelReply?.();
      setSelectedFiles([]);
    }
  }, [handleSend, onCancelReply]);

  // Handle file selection
  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return;
    
    const validFiles = Array.from(files).filter(file => {
      if (file.size > maxFileSize) {
        alert(`File ${file.name} is too large. Maximum size is ${maxFileSize / 1024 / 1024}MB`);
        return false;
      }
      return true;
    });
    
    setSelectedFiles(prev => [...prev, ...validFiles]);
  }, [maxFileSize]);

  // Handle drag and drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  // Voice recording
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        onVoiceRecord(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Failed to start recording:', error);
      alert('Failed to access microphone');
    }
  }, [onVoiceRecord]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setRecordingTime(0);
      
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    }
  }, [isRecording]);

  // Location sharing
  const handleLocationShare = useCallback(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        onLocationShare?.(location);
      },
      (error) => {
        console.error('Failed to get location:', error);
        alert('Failed to get your location');
      }
    );
  }, [onLocationShare]);

  // Remove selected file
  const removeFile = useCallback((index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const formatRecordingTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return (
    <div className={cn("relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4", className)}>
      {/* Reply to message */}
      <AnimatePresence>
        {replyToMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-3 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-xs text-cyan-400 font-medium">Replying to {replyToMessage.senderName}</div>
                <div className="text-sm text-gray-300 truncate">{replyToMessage.text}</div>
              </div>
              <button
                onClick={onCancelReply}
                className="ml-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected files preview */}
      <AnimatePresence>
        {selectedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-3 space-y-2"
          >
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-white/10 rounded-lg">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white truncate">{file.name}</div>
                  <div className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main input area */}
      <div
        className={cn(
          "flex items-end gap-3 p-3 bg-white/5 rounded-xl border transition-all",
          isDragging ? "border-cyan-400 bg-cyan-400/10" : "border-white/10",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Attachment button */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={supportedFileTypes.join(',')}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
        
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="p-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>

        {/* Text input */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="flex-1 bg-transparent text-white placeholder-gray-400 resize-none outline-none text-sm"
          style={{ minHeight: '24px', maxHeight: '120px' }}
        />

        {/* Voice recording or send button */}
        {isRecording ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs text-red-400">{formatRecordingTime(recordingTime)}</span>
            </div>
            <button
              onClick={stopRecording}
              className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
            </button>
          </div>
        ) : (
          <>
            {/* Advanced options */}
            <button
              onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>

            {/* Send button */}
            <button
              onClick={handleSend}
              disabled={disabled || (!text.trim() && selectedFiles.length === 0)}
              className="p-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Advanced options dropdown */}
      <AnimatePresence>
        {showAdvancedOptions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute bottom-full left-0 right-0 mb-2 p-3 bg-black/95 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl z-50"
          >
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  setShowSelfDestructDialog(true);
                  setShowAdvancedOptions(false);
                }}
                className="flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs text-gray-400">Self-Destruct</span>
              </button>

              <button
                onClick={() => {
                  setShowSelfDestructDialog(true);
                  setShowAdvancedOptions(false);
                }}
                className="flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="text-xs text-gray-400">Self-Destruct</span>
              </button>

              <button
                onClick={() => {
                  setShowPriorityDialog(true);
                  setShowAdvancedOptions(false);
                }}
                className="flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-xs text-gray-400">Priority</span>
              </button>

              <button
                onClick={() => {
                  setShowPollDialog(true);
                  setShowAdvancedOptions(false);
                }}
                className="flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="text-xs text-gray-400">Poll</span>
              </button>

              <button
                onClick={handleLocationShare}
                className="flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-xs text-gray-400">Location</span>
              </button>

              <button
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                onTouchStart={startRecording}
                onTouchEnd={stopRecording}
                className="flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <span className="text-xs text-gray-400">Voice</span>
              </button>

              <button
                className="flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs text-gray-400">Emoji</span>
              </button>

              <button
                className="flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4" />
                </svg>
                <span className="text-xs text-gray-400">Sticker</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Self-Destruct Dialog */}
      <SelfDestructDialog
        open={showSelfDestructDialog}
        onClose={() => setShowSelfDestructDialog(false)}
        onSetTime={(seconds) => {
          onSendMessage({ text: text.trim(), type: 'TEXT', selfDestructAfter: seconds });
          setText('');
          setShowSelfDestructDialog(false);
        }}
      />

      {/* Priority Dialog */}
      <PriorityDialog
        open={showPriorityDialog}
        onClose={() => setShowPriorityDialog(false)}
        onSetPriority={(priority) => {
          onSendMessage({ text: text.trim(), type: 'TEXT', priority });
          setText('');
          setShowPriorityDialog(false);
        }}
      />

      {/* Poll Dialog */}
      <PollDialog
        open={showPollDialog}
        onClose={() => setShowPollDialog(false)}
        onCreatePoll={(poll) => {
          onPollCreate?.(poll);
          setShowPollDialog(false);
        }}
      />
    </div>
  );
}

// Schedule functionality handled by RabbitAI - no manual dialog needed

function SelfDestructDialog({ open, onClose, onSetTime }: any) {
  const options = [
    { label: '5 seconds', value: 5 },
    { label: '30 seconds', value: 30 },
    { label: '1 minute', value: 60 },
    { label: '5 minutes', value: 300 },
    { label: '1 hour', value: 3600 },
    { label: '1 day', value: 86400 },
    { label: '1 week', value: 604800 },
  ];
  
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-[#0E1430] border border-white/10 p-6 rounded-2xl max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-white mb-4">Self-Destruct Timer</h3>
            <div className="space-y-2">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onSetTime(option.value)}
                  className="w-full p-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-left"
                >
                  {option.label}
                </button>
              ))}
            </div>
            <button
              onClick={onClose}
              className="w-full mt-4 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PriorityDialog({ open, onClose, onSetPriority }: any) {
  const priorities = [
    { label: 'Normal', value: 'NORMAL', color: 'bg-gray-500' },
    { label: 'Urgent', value: 'URGENT', color: 'bg-red-500' },
    { label: 'Silent', value: 'SILENT', color: 'bg-blue-500' },
  ];
  
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-[#0E1430] border border-white/10 p-6 rounded-2xl max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-white mb-4">Message Priority</h3>
            <div className="space-y-2">
              {priorities.map((priority) => (
                <button
                  key={priority.value}
                  onClick={() => onSetPriority(priority.value)}
                  className="w-full p-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-left flex items-center gap-3"
                >
                  <div className={`w-3 h-3 rounded-full ${priority.color}`} />
                  {priority.label}
                </button>
              ))}
            </div>
            <button
              onClick={onClose}
              className="w-full mt-4 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PollDialog({ open, onClose, onCreatePoll }: any) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [multipleChoice, setMultipleChoice] = useState(false);
  
  const addOption = () => setOptions([...options, '']);
  const removeOption = (index: number) => setOptions(options.filter((_, i) => i !== index));
  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-[#0E1430] border border-white/10 p-6 rounded-2xl max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-white mb-4">Create Poll</h3>
            
            <input
              type="text"
              placeholder="Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white mb-4"
            />
            
            <div className="space-y-2 mb-4">
              {options.map((option, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    className="flex-1 p-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                  {options.length > 2 && (
                    <button
                      onClick={() => removeOption(index)}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            {options.length < 10 && (
              <button
                onClick={addOption}
                className="w-full p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors mb-4"
              >
                Add Option
              </button>
            )}
            
            <div className="space-y-2 mb-4">
              <label className="flex items-center gap-2 text-white">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded"
                />
                Anonymous voting
              </label>
              
              <label className="flex items-center gap-2 text-white">
                <input
                  type="checkbox"
                  checked={multipleChoice}
                  onChange={(e) => setMultipleChoice(e.target.checked)}
                  className="rounded"
                />
                Multiple choice
              </label>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => onCreatePoll({
                  question,
                  options: options.filter(o => o.trim()),
                  isAnonymous,
                  multipleChoice,
                })}
                disabled={!question.trim() || options.filter(o => o.trim()).length < 2}
                className="flex-1 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50"
              >
                Create
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
