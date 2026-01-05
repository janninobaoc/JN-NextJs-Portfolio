"use client";

import { useState, useEffect, useRef, useCallback, memo } from 'react';
import Image from "next/image";
import { createClient } from '@supabase/supabase-js';
import { MessageCircle, UserCircle2, Loader2, AlertCircle, Send, ImagePlus, X, Pin } from 'lucide-react';
import AOS from "aos";
import "aos/dist/aos.css";
import { createPortal } from "react-dom";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

type CommentType = {
    id: number;
    user_name: string;
    content: string;
    created_at: string;
    profile_image: string | null;
    is_pinned: boolean;
};

type NewCommentInput = {
    newComment: string;
    userName: string;
    imageFile: File | null;
};

interface CommentData {
    id: number;
    user_name: string;
    content: string;
    created_at: string;
    profile_image?: string | null;
    is_pinned?: boolean;
}

interface CommentProps {
    comment: CommentData;
    formatDate: (date: string) => string;
    index: number;
    isPinned?: boolean;
}

interface CommentFormProps {
    onSubmit: (data: { newComment: string; userName: string; imageFile: File | null }) => void;
    isSubmitting: boolean;
    error?: string | null;
}

interface ReplyModalProps {
    open: boolean;
    onClose: () => void;
    comment: CommentType;
    onSubmitReply: (user_name: string, content: string) => void;
    isSubmitting: boolean;
}

const Comment = memo(({ comment, formatDate, index, isPinned = false }: CommentProps) => {
    const [replyOpen, setReplyOpen] = useState(false);
    const [activeComment, setActiveComment] = useState<CommentType | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <div className={`px-4 pt-4 pb-2 rounded-xl border transition-all group hover:shadow-lg hover:-translate-y-0.5 ${isPinned
            ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/30'
            : 'bg-white/5 border-white/10'
            }`}>
            {isPinned && (
                <div className="flex items-center gap-2 mb-3 text-indigo-400">
                    <Pin className="w-4 h-4" />
                    <span className="text-xs font-medium uppercase tracking-wide">Pinned Comment</span>
                </div>
            )}
            <div className="flex items-start gap-3">
                {comment.profile_image ? (
                    <img
                        src={comment.profile_image}
                        alt={`${comment.user_name}'s profile`}
                        className={`w-10 h-10 rounded-full object-cover border-2 flex-shrink-0  ${isPinned ? 'border-indigo-500/50' : 'border-indigo-500/30'
                            }`}
                        loading="lazy"
                    />
                ) : (
                    <div className={`p-2 rounded-full text-indigo-400 group-hover:bg-indigo-500/30 transition-colors ${isPinned ? 'bg-indigo-500/30' : 'bg-indigo-500/20'
                        }`}>
                        <UserCircle2 className="w-5 h-5" />
                    </div>
                )}
                <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-2">
                        <div className="flex items-center gap-2">
                            <h4 className={`font-medium truncate ${isPinned ? 'text-indigo-200' : 'text-white'
                                }`}>
                                {comment.user_name}
                            </h4>
                            {isPinned && (
                                <span className="px-2 py-0.5 text-xs bg-indigo-500/20 text-indigo-300 rounded-full">
                                    Admin
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col items-center gap-3 whitespace-nowrap">
                            <span className="text-xs text-gray-400">
                                {formatDate(comment.created_at)}
                            </span>

                            {!isPinned && (
                                <button className='text-indigo-400' onClick={() => {
                                    setActiveComment({
                                        ...comment,
                                        is_pinned: comment.is_pinned ?? false,
                                        profile_image: comment.profile_image ?? null,
                                    });

                                    setReplyOpen(true);
                                }}>
                                    Replies
                                </button>
                            )}
                        </div>
                    </div>
                    <p className="text-gray-300 text-sm break-words leading-relaxed relative bottom-2">
                        {comment.content}
                    </p>
                </div>
            </div>
            {activeComment && (
                <ReplyModal
                    open={replyOpen}
                    comment={activeComment}
                    isSubmitting={isSubmitting}
                    onClose={() => setReplyOpen(false)}
                    onSubmitReply={async (userName: string, replyContent: string) => {
                        setIsSubmitting(true);
                        try {
                            const { error } = await supabase
                                .from('comment-replies')
                                .insert([{
                                    comment_id: activeComment.id,
                                    user_name: userName,
                                    content: replyContent,
                                    created_at: new Date().toISOString()
                                }]);
                            if (error) throw error;
                        } catch (error) {
                            console.error('Error adding reply: ', error);
                        } finally {
                            setIsSubmitting(false);
                            setReplyOpen(false);
                        }
                    }}
                />
            )}

        </div>
    );
});

const CommentForm = memo(({ onSubmit, isSubmitting, error }: CommentFormProps) => {
    const [newComment, setNewComment] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    /** Image upload + validation */
    const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            alert("File size must be less than 5MB.");
            e.target.value = "";
            return;
        }

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image file.");
            e.target.value = "";
            return;
        }

        setImageFile(file);

        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);
    }, []);

    /** Auto-grow textarea */
    const handleTextareaChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(e.target.value);

        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, []);

    /** Submit handler */
    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();

            if (!userName.trim()) {
                toast.error("Please enter your name.");
                return;
            }

            if (!newComment.trim()) {
                toast.error("Please write a comment.");
                return;
            }

            try {
                await onSubmit({ newComment, userName, imageFile });

                toast.success("Comment posted successfully!");

                setNewComment("");
                setUserName("");
                setImagePreview(null);
                setImageFile(null);

                if (fileInputRef.current) fileInputRef.current.value = "";
                if (textareaRef.current) textareaRef.current.style.height = "auto";
            } catch (err) {
                console.error(err);
                toast.error("Failed to post comment. Please try again.");
            }
        },
        [newComment, userName, imageFile, onSubmit]
    );


    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2" data-aos="fade-up" data-aos-duration="1000">
                <label className="block text-sm font-medium text-white">
                    Name <span className="text-red-400">*</span>
                </label>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    maxLength={15}
                    placeholder="Enter your name"
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    required
                />
            </div>

            <div className="space-y-2" data-aos="fade-up" data-aos-duration="1200">
                <label className="block text-sm font-medium text-white">
                    Message <span className="text-red-400">*</span>
                </label>
                <textarea
                    ref={textareaRef}
                    value={newComment}
                    maxLength={200}

                    onChange={handleTextareaChange}
                    placeholder="Write your message here..."
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none min-h-[120px]"
                    required
                />
            </div>

            <div className="space-y-2" data-aos="fade-up" data-aos-duration="1400">
                <label className="block text-sm font-medium text-white">
                    Profile Photo <span className="text-gray-400">(optional)</span>
                </label>
                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                    {imagePreview ? (
                        <div className="flex items-center gap-4">
                            <img
                                src={imagePreview}
                                alt="Profile preview"
                                className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500/50"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setImagePreview(null);
                                    setImageFile(null);
                                    if (fileInputRef.current) fileInputRef.current.value = '';
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all group"
                            >
                                <X className="w-4 h-4" />
                                <span>Remove Photo</span>
                            </button>
                        </div>
                    ) : (
                        <div className="w-full">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-all border border-dashed border-indigo-500/50 hover:border-indigo-500 group"
                            >
                                <ImagePlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span>Choose Profile Photo</span>
                            </button>
                            <p className="text-center text-gray-400 text-sm mt-2">
                                Max file size: 5MB
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                data-aos="fade-up" data-aos-duration="1000"
                className="relative w-full h-12 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl font-medium text-white overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
                <div className="absolute inset-0 bg-white/20 translate-y-12 group-hover:translate-y-0 transition-transform duration-300" />
                <div className="relative flex items-center justify-center gap-2">
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Posting...</span>
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            <span>Post Comment</span>
                        </>
                    )}
                </div>
            </button>
        </form>
    );
});

export const ReplyModal = memo(
    ({ open,
        onClose,
        comment,
        onSubmitReply,
        isSubmitting
    }: ReplyModalProps) => {
        const [reply, setReply] = useState("");
        const [username, setUsername] = useState("");
        const [replies, setReplies] = useState<any[]>([]); // replace 'any' with ReplyType if typed
        const [loading, setLoading] = useState(false);

        useEffect(() => {
            if (!open || !comment) return;

            const fetchReplies = async () => {
                setLoading(true);
                const { data, error } = await supabase
                    .from("comment-replies")
                    .select("*")
                    .eq("comment_id", comment.id)
                    .order("created_at", { ascending: true });

                if (error) {
                    console.error("Failed to fetch replies:", error.message);
                } else {
                    setReplies(data);
                }
                setLoading(false);
            };

            fetchReplies();
        }, [open, comment]);


        if (!open) return null;
        return createPortal(
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl w-full max-w-lg p-6 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <h2 className="text-xl font-semibold text-white mb-4">Reply to {comment?.user_name}</h2>
                    <div className="space-y-4 max-h-64 overflow-y-auto mb-4">
                        {loading ? (
                            <div className="text-center text-gray-400">Loading replies...</div>
                        ) : replies.length === 0 ? (
                            <div className="text-center text-gray-400">No replies yet.</div>
                        ) : (
                            replies.map((reply) => (
                                <div key={reply.id} className="flex gap-3 p-3 bg-white/10 rounded-lg">
                                    {/* Profile image / placeholder */}
                                    {/* <div className="flex-shrink-0">
                                        <img
                                            src={reply.profile_image ?? "/avatar.png"}
                                            alt={`${reply.user_name}'s profile`}
                                            className="w-8 h-8 rounded-full object-cover border border-white/20"
                                        />
                                    </div> */}

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h1 className="text-sm font-medium text-indigo-400">{reply.user_name}</h1>
                                            <span className="text-xs text-gray-400">
                                                {new Date(reply.created_at).toLocaleString()}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-300 mt-1">{reply.content}</p>
                                    </div>
                                </div>

                            ))
                        )}
                    </div>
                    {/* Username Field */}
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Your name..."
                        className="w-full mb-3 p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />

                    {/* Reply Textarea */}
                    <textarea
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        placeholder="Write your reply..."
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none min-h-[80px]"
                    />
                    <button
                        onClick={async () => {
                            if (!username.trim() || !reply.trim()) {
                                toast.error("Please enter your name and reply.");
                                return;
                            }

                            try {
                                await onSubmitReply(username, reply);
                                toast.success("Reply posted successfully!");
                                setUsername("");
                                setReply("");
                            } catch (err) {
                                console.error(err);
                                toast.error("Failed to post reply. Please try again.");
                            }
                        }}
                        disabled={isSubmitting || reply.trim() === ""}
                        className="mt-4 w-full h-12 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl font-medium text-white overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-12 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                        <div className="relative flex items-center justify-center gap-2">
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Posting...</span>
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" />
                                    <span>Post Reply</span>
                                </>
                            )}
                        </div>
                    </button>
                </div>
            </div>,
            document.body
        );
    });

const Comments = () => {
    const [pinnedComment, setPinnedComment] = useState<CommentType | null>(null);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        AOS.init({ once: false, duration: 1000 });
    }, []);

    // Fetch pinned comment
    useEffect(() => {
        const fetchPinnedComment = async () => {
            try {
                const { data, error } = await supabase
                    .from('comments')
                    .select('*')
                    .eq('is_pinned', true)
                    .single();

                if (error && error.code !== 'PGRST116') {
                    console.error('Error fetching pinned comment:', error);
                    return;
                }

                if (data) {
                    setPinnedComment(data);
                }
            } catch (error) {
                console.error('Error fetching pinned comment:', error);
            }
        };

        fetchPinnedComment();
    }, []);

    // Fetch regular comments (excluding pinned) and set up real-time subscription
    useEffect(() => {
        const fetchComments = async () => {
            const { data, error } = await supabase
                .from('comments')
                .select('*')
                .eq('is_pinned', false)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching comments:', error);
                return;
            }

            setComments(data || []);
        };

        fetchComments();

        // Set up real-time subscription
        const subscription = supabase
            .channel('comments')
            .on('postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'comments',
                    // filter: 'is_pinned=eq.false'
                },
                () => {
                    fetchComments(); // Refresh comments when changes occur
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const uploadImage = useCallback(async (imageFile: any) => {
        if (!imageFile) return null;

        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('profile_images')
            .upload(filePath, imageFile);

        if (uploadError) {
            throw uploadError;
        }

        const { data } = supabase.storage
            .from('profile_images')
            .getPublicUrl(filePath);

        return data.publicUrl;
    }, []);

    const handleCommentSubmit = useCallback(async ({ newComment, userName, imageFile }: NewCommentInput) => {
        setError('');
        setIsSubmitting(true);

        try {
            const profileImageUrl = await uploadImage(imageFile);

            const { error } = await supabase
                .from('comments')
                .insert([
                    {
                        content: newComment,
                        user_name: userName,
                        profile_image: profileImageUrl,
                        is_pinned: false,
                        created_at: new Date().toISOString()
                    }
                ]).select();

            if (error) {
                throw error;
            }
        } catch (error) {
            setError('Failed to post comment. Please try again.');
            console.error('Error adding comment: ', error);
        } finally {
            setIsSubmitting(false);
        }
    }, [uploadImage]);

    const formatDate = useCallback((timestamp: string | number | Date) => {
        if (!timestamp) return '';

        const date = new Date(timestamp);
        const now = new Date();

        const diffMs = now.getTime() - date.getTime(); // FIX HERE
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMinutes < 1) return 'Just now';
        if (diffMinutes < 60) return `${diffMinutes}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;

        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }).format(date);
    }, []);

    const totalComments = comments.length + (pinnedComment ? 1 : 0);

    return (
        <div className="w-full bg-gradient-to-b from-white/10 to-white/5 rounded-2xl  backdrop-blur-xl shadow-xl" data-aos="fade-up" data-aos-duration="1000">
            <div className="p-6 border-b border-white/10" data-aos="fade-down" data-aos-duration="800">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-indigo-500/20">
                        <MessageCircle className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                        Comments <span className="text-indigo-400">({totalComments})</span>
                    </h3>
                </div>
            </div>
            <div className="p-6 space-y-6">
                {error && (
                    <div className="flex items-center gap-2 p-4 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl" data-aos="fade-in">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                <div>
                    <CommentForm onSubmit={handleCommentSubmit} isSubmitting={isSubmitting} error={error} />
                </div>

                <div className="space-y-4 h-[328px] overflow-y-auto overflow-x-hidden custom-scrollbar pt-1 pr-1 " data-aos="fade-up" data-aos-delay="200">
                    {/* Pinned Comment */}
                    {pinnedComment && (
                        <div data-aos="fade-down" data-aos-duration="800">
                            <Comment
                                comment={pinnedComment}
                                formatDate={formatDate}
                                index={0}
                                isPinned={true}
                            />
                        </div>
                    )}

                    {/* Regular Comments */}
                    {comments.length === 0 && !pinnedComment ? (
                        <div className="text-center py-8" data-aos="fade-in">
                            <UserCircle2 className="w-12 h-12 text-indigo-400 mx-auto mb-3 opacity-50" />
                            <p className="text-gray-400">No comments yet. Start the conversation!</p>
                        </div>
                    ) : (
                        comments.map((comment, index) => (
                            <Comment
                                key={comment.id}
                                comment={comment}
                                formatDate={formatDate}
                                index={index + (pinnedComment ? 1 : 0)}
                                isPinned={false}
                            />
                        ))
                    )}
                </div>
            </div>
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(99, 102, 241, 0.5);
                    border-radius: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(99, 102, 241, 0.7);
                }
            `}</style>
        </div>
    );
};

export default Comments;
