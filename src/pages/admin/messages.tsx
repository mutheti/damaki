// src/pages/admin/messages.tsx
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Loader2, MailOpen, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { fetchFromApi } from '@/utils/api';
import type { Message, MessagesResponse } from './types';

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
  const { toast } = useToast();

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetchFromApi<MessagesResponse>(
        `admin/messages?page=${pagination.page}&limit=${pagination.limit}&search=${encodeURIComponent(search)}`
      );
      if (response.success && response.data.data) {
        setMessages(response.data.data.messages);
        setPagination(prev => ({ ...prev, total: response.data.data.total || 0 }));
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load messages', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const updateMessageStatus = async (id: string, read: boolean) => {
    try {
      await fetchFromApi(`admin/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: !read })
      });
      fetchMessages();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update message', variant: 'destructive' });
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    try {
      await fetchFromApi(`admin/messages/${id}`, { method: 'DELETE' });
      toast({ title: 'Success', description: 'Message deleted' });
      fetchMessages();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete message', variant: 'destructive' });
    }
  };

  useEffect(() => { fetchMessages(); }, [pagination.page, search]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">Manage contact form submissions</p>
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, phone, or message..."
            className="pl-8"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPagination(prev => ({ ...prev, page: 1 }));
            }}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Form Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No messages found
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => {
                const isExpanded = expanded === message._id;
                return (
                  <div
                    key={message._id}
                    className={`p-4 rounded-lg border shadow-sm transition ${
                      !message.read ? 'bg-blue-50' : 'bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">
                          {message.firstName} {message.lastName}{' '}
                          {!message.read && (
                            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
                              Unread
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          <a href={`mailto:${message.email}`} className="hover:underline">
                            {message.email}
                          </a>
                          {message.phone && (
                            <span>
                              {' • '}
                              <a href={`tel:${message.phone}`} className="hover:underline">
                                {message.phone}
                              </a>
                            </span>
                          )}
                        </p>
                        {/* Message body */}
                        <p
                          className={`mt-2 text-sm text-foreground ${
                            isExpanded ? '' : 'line-clamp-3'
                          }`}
                        >
                          {message.message}
                        </p>
                        {message.message.length > 200 && (
                          <button
                            onClick={() =>
                              setExpanded(isExpanded ? null : message._id)
                            }
                            className="mt-1 text-xs text-primary hover:underline"
                          >
                            {isExpanded ? 'Show less' : 'Show more'}
                          </button>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                        {format(new Date(message.submittedAt), 'MMM d, yyyy')}
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex justify-end gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className={`${
                          message.read
                            ? 'border-yellow-300 text-yellow-700 hover:bg-yellow-50'
                            : 'border-green-300 text-green-700 hover:bg-green-50'
                        }`}
                        onClick={() => updateMessageStatus(message._id, message.read)}
                      >
                        <MailOpen className="h-4 w-4 mr-2" />
                        {message.read ? 'Mark Unread' : 'Mark Read'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-300 text-red-700 hover:bg-red-50"
                        onClick={() => deleteMessage(message._id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          disabled={pagination.page === 1}
          onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {pagination.page} of {Math.max(1, Math.ceil(pagination.total / pagination.limit))}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={pagination.page * pagination.limit >= pagination.total}
          onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
