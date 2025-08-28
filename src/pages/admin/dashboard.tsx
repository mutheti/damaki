import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutDashboard, FolderKanban, MessageSquare, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { fetchFromApi } from '@/utils/api';

interface Message {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
  isRead: boolean;
  submittedAt: string;
  __v?: number;
}

interface StatsResponse {
  stats: {
    users: number;
    projects: number;
    messages: number;
    activeUsers: number;
  };
}

interface MessagesResponse {
  messages: Message[];
  total?: number;
  totalPages?: number;
}

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<{
    stats: StatsResponse['stats'];
    recentMessages: Array<
      Omit<Message, 'isRead'> & { read: boolean }
    >;
  } | null>(null);

  const { toast } = useToast();

  const updateMessageReadStatus = async (messageId: string, currentStatus: boolean) => {
    try {
      const response = await fetchFromApi(`admin/messages/${messageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ read: !currentStatus })
      });

      if (response.success && stats) {
        setStats({
          ...stats,
          recentMessages: stats.recentMessages.map(msg =>
            msg._id === messageId ? { ...msg, read: !currentStatus } : msg
          )
        });
      }
    } catch (error) {
      console.error('Error updating message status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update message status',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsResponse, messagesResponse] = await Promise.all([
          fetchFromApi<StatsResponse>('admin/stats'),
          fetchFromApi<MessagesResponse>('admin/messages?limit=5&sort=-createdAt')
        ]);

        if (statsResponse.success && statsResponse.data) {
          setStats({
            stats: statsResponse.data.data.stats,
            recentMessages:
              messagesResponse.success && messagesResponse.data?.data?.messages
                ? messagesResponse.data.data.messages.map(msg => ({
                    ...msg,
                    read: msg.isRead,
                  }))
                : [],
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load dashboard data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/20 p-8">
        <div className="animate-pulse space-y-8">
          {/* Header Shimmer */}
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>

          {/* Stats Grid Shimmer */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-card rounded-lg border shadow-sm">
                <div className="p-6">
                  <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                  <div className="h-8 bg-muted rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Messages Shimmer */}
          <div className="space-y-4">
            <div className="h-6 bg-muted rounded w-1/4 mb-6"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-card rounded-lg border shadow-sm">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="h-5 bg-muted rounded w-1/4"></div>
                    <div className="h-3 bg-muted rounded w-16"></div>
                  </div>
                  <div className="h-4 bg-muted rounded w-1/2 mt-3"></div>
                  <div className="h-3 bg-muted rounded w-3/4 mt-4"></div>
                  <div className="h-3 bg-muted rounded w-5/6 mt-2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your portfolio.
          </p>
        </header>

        {!stats ? (
          <div className="flex items-center justify-center p-8">
            <p className="text-muted-foreground">No data available</p>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                  <FolderKanban className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.stats.projects}</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Messages</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.stats.messages}</div>
                  <p className="text-xs text-muted-foreground">+19% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.stats.users}</div>
                  <p className="text-xs text-muted-foreground">+201 since last hour</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                  <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+{stats.stats.activeUsers}</div>
                  <p className="text-xs text-muted-foreground">Active users in last 24h</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Messages */}
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      Recent Messages
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {stats.recentMessages.map((message) => (
                      <div
                        key={message._id}
                        className={`p-4 transition-colors border-b last:border-0 cursor-pointer ${
                          message.read
                            ? 'bg-white'
                            : 'bg-blue-50 hover:bg-blue-100'
                        }`}
                        onClick={() =>
                          updateMessageReadStatus(message._id, message.read)
                        }
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-foreground truncate">
                                {message.firstName} {message.lastName}
                              </h3>
                              {!message.read ? (
                                <span className="flex-shrink-0 px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500">
                                  New
                                </span>
                              ) : (
                                <span className="flex-shrink-0 px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500">
                                  Read
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-1.5 mt-1 text-sm text-muted-foreground">
                              <a
                                href={`mailto:${message.email}`}
                                className="hover:text-primary hover:underline"
                              >
                                {message.email}
                              </a>
                              {message.phone && (
                                <>
                                  <span>•</span>
                                  <a
                                    href={`tel:${message.phone}`}
                                    className="hover:text-primary hover:underline"
                                  >
                                    {message.phone}
                                  </a>
                                </>
                              )}
                            </div>
                            <p className="mt-2 text-foreground text-sm">
                              {message.message}
                            </p>
                          </div>
                          <div className="text-xs text-muted-foreground whitespace-nowrap">
                            {new Date(message.submittedAt).toLocaleDateString(
                              'en-US',
                              {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              }
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {(!stats.recentMessages ||
                      stats.recentMessages.length === 0) && (
                      <div className="p-6 text-center text-muted-foreground">
                        <p>No messages found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
