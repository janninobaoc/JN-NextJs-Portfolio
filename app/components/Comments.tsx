"use client";

import { useState, useEffect, useRef, useCallback, memo } from 'react';
import Image from "next/image";
// import { createClient } from '@supabase/supabase-js';
import { MessageCircle, UserCircle2, Loader2, AlertCircle, Send, ImagePlus, X, Pin } from 'lucide-react';
import AOS from "aos";
import "aos/dist/aos.css";
import { dummyPinned, dummyComments } from '@/lib/dummyData'
// import { supabase } from '../supabase';

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
}

interface CommentProps {
    comment: CommentData;
    formatDate: (date: string) => string;
    isPinned?: boolean;
}

interface CommentFormProps {
    onSubmit: (data: { newComment: string; userName: string; imageFile: File | null }) => void;
    isSubmitting: boolean;
    error?: string | null;
}

const Comment = memo(({ comment, formatDate, isPinned = false }: CommentProps) => (
    <div
        className={`px-4 pt-4 pb-2 rounded-xl border transition-all group hover:shadow-lg hover:-translate-y-0.5 ${isPinned
                ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/30 hover:bg-gradient-to-r hover:from-indigo-500/15 hover:to-purple-500/15'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
    >
        {isPinned && (
            <div className="flex items-center gap-2 mb-3 text-indigo-400">
                <Pin className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wide">Pinned Comment</span>
            </div>
        )}

        <div className="flex items-start gap-3">

            {/* Avatar */}
            {comment.profile_image ? (
                <Image
                    src={comment.profile_image}
                    alt={`${comment.user_name}'s profile`}
                    width={40}
                    height={40}
                    className={`rounded-full object-cover border-2 flex-shrink-0 ${isPinned ? 'border-indigo-500/50' : 'border-indigo-500/30'
                        }`}
                />
            ) : (
                <div className={`p-2 rounded-full text-indigo-400 group-hover:bg-indigo-500/30 transition-colors ${isPinned ? 'bg-indigo-500/30' : 'bg-indigo-500/20'
                    }`}>
                    <UserCircle2 className="w-5 h-5" />
                </div>
            )}

            {/* Content */}
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

                    <span className="text-xs text-gray-400 whitespace-nowrap">
                        {formatDate(comment.created_at)}
                    </span>
                </div>

                <p className="text-gray-300 text-sm break-words leading-relaxed relative bottom-2">
                    {comment.content}
                </p>
            </div>
        </div>
    </div>
));

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
        (e: React.FormEvent) => {
            e.preventDefault();

            if (!newComment.trim() || !userName.trim()) return;

            onSubmit({ newComment, userName, imageFile });

            setNewComment("");
            setUserName("");
            setImagePreview(null);
            setImageFile(null);

            if (fileInputRef.current) fileInputRef.current.value = "";
            if (textareaRef.current) textareaRef.current.style.height = "auto";
        },
        [newComment, userName, imageFile, onSubmit]
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="space-y-2" data-aos="fade-up" data-aos-duration="1000">
                <label className="block text-sm font-medium text-white">
                    Name <span className="text-red-400">*</span>
                </label>

                <input
                    type="text"
                    value={userName}
                    maxLength={15}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400
                    focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    required
                />
            </div>

            {/* Comment textarea */}
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
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 
                    focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all
                    resize-none min-h-[120px]"
                    required
                />
            </div>

            {/* Profile Image */}
            <div className="space-y-2" data-aos="fade-up" data-aos-duration="1400">
                <label className="block text-sm font-medium text-white">
                    Profile Photo <span className="text-gray-400">(optional)</span>
                </label>

                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                    {imagePreview ? (
                        <div className="flex items-center gap-4">
                            <Image
                                src={imagePreview}
                                alt="Profile preview"
                                width={64}
                                height={64}
                                className="rounded-full object-cover border-2 border-indigo-500/50"
                            />

                            <button
                                type="button"
                                onClick={() => {
                                    setImagePreview(null);
                                    setImageFile(null);
                                    if (fileInputRef.current) fileInputRef.current.value = "";
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 text-red-400 
                                hover:bg-red-500/30 transition-all group"
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
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />

                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 
                                rounded-xl bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-all 
                                border border-dashed border-indigo-500/50 hover:border-indigo-500 group"
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

            {/* Submit */}
            <button
                type="submit"
                disabled={isSubmitting}
                data-aos="fade-up"
                data-aos-duration="1000"
                className="relative w-full h-12 bg-gradient-to-r from-[#6366f1] to-[#a855f7]
                rounded-xl font-medium text-white overflow-hidden group transition-all duration-300
                hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]
                disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
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

const Comments = () => {
    const [pinnedComment, setPinnedComment] = useState<CommentType | null>(null);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        AOS.init({ once: false, duration: 1000 });
    }, []);

    // Load dummy pinned + comments
    useEffect(() => {
        setPinnedComment(dummyPinned);
        setComments(dummyComments);
    }, []);

    const handleCommentSubmit = useCallback(
        async ({ newComment, userName, imageFile }: NewCommentInput) => {
            setError("");
            setIsSubmitting(true);

            await new Promise((res) => setTimeout(res, 800));

            const fakeImg = imageFile ? URL.createObjectURL(imageFile) : null;

            const newEntry = {
                id: Date.now(),
                user_name: userName,
                content: newComment,
                created_at: new Date().toISOString(),
                profile_image: fakeImg,
                is_pinned: false,
            };

            setComments((prev) => [newEntry, ...prev]);
            setIsSubmitting(false);
        },
        []
    );

    const formatDate = useCallback((timestamp: string | number | Date) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    }, []);

    const totalComments = comments.length + (pinnedComment ? 1 : 0);

    return (
        <div
            className="w-full bg-gradient-to-b from-white/10 to-white/5 rounded-2xl backdrop-blur-xl shadow-xl"
            data-aos="fade-up"
        >
            <div className="p-6 border-b border-white/10">
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
                    <div className="flex items-center gap-2 p-4 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl">
                        <AlertCircle className="w-5 h-5" />
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                {/* Comment Form */}
                <CommentForm
                    onSubmit={handleCommentSubmit}
                    isSubmitting={isSubmitting}
                    error={error}
                />

                {/* Comments List */}
                <div className="space-y-4 max-h-[328px] overflow-y-auto custom-scrollbar pr-1">
                    {pinnedComment && (
                        <Comment comment={pinnedComment} isPinned={true} formatDate={formatDate} />
                    )}

                    {comments.length === 0 ? (
                        <div className="text-center py-8">
                            <UserCircle2 className="w-12 h-12 text-indigo-400 mx-auto mb-3 opacity-50" />
                            <p className="text-gray-400">No comments yet. Start the conversation!</p>
                        </div>
                    ) : (
                        comments.map((comment) => (
                            <Comment
                                key={comment.id}
                                comment={comment}
                                formatDate={formatDate}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Comments;
