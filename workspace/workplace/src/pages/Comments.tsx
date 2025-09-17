import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { mockComments, mockItems, Comment } from '@/lib/mockData';
import { MessageSquare, Star, Check, X, Reply, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const filteredComments = statusFilter === 'all' 
    ? comments 
    : comments.filter(comment => comment.status === statusFilter);

  const handleApprove = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, status: 'approved' as const }
        : comment
    ));
    toast.success('Comment approved');
  };

  const handleReject = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, status: 'rejected' as const }
        : comment
    ));
    toast.success('Comment rejected');
  };

  const handleReply = (commentId: string) => {
    if (!replyText.trim()) return;
    
    // In a real app, this would send a reply
    toast.success('Reply sent successfully');
    setReplyingTo(null);
    setReplyText('');
  };

  const getItemTitle = (itemId: string) => {
    const item = mockItems.find(item => item.id === itemId);
    return item?.title || 'Unknown Item';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar className="w-64" />
      
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 md:p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Comments Management</h1>
              <p className="text-muted-foreground">
                Review and manage comments on your listings
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 flex-wrap">
            <Badge variant="outline" className="px-3 py-1">
              Total: {comments.length}
            </Badge>
            <Badge variant="outline" className="px-3 py-1 bg-yellow-50 text-yellow-700">
              Pending: {comments.filter(c => c.status === 'pending').length}
            </Badge>
            <Badge variant="outline" className="px-3 py-1 bg-green-50 text-green-700">
              Approved: {comments.filter(c => c.status === 'approved').length}
            </Badge>
            <Badge variant="outline" className="px-3 py-1 bg-red-50 text-red-700">
              Rejected: {comments.filter(c => c.status === 'rejected').length}
            </Badge>
          </div>

          {/* Filter */}
          <div className="flex justify-between items-center">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Comments</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {filteredComments.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No comments found</p>
                </CardContent>
              </Card>
            ) : (
              filteredComments.map((comment) => (
                <Card key={comment.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src="" />
                          <AvatarFallback>
                            {comment.userName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{comment.userName}</h4>
                            <Badge className={getStatusColor(comment.status)}>
                              {comment.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            On: {getItemTitle(comment.itemId)}
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {renderStars(comment.rating)}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {comment.rating}/5
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm">{comment.message}</p>
                    
                    {/* Reply Section */}
                    {replyingTo === comment.id ? (
                      <div className="space-y-3 p-4 bg-muted rounded-lg">
                        <Textarea
                          placeholder="Write your reply..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleReply(comment.id)}>
                            Send Reply
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyText('');
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2 flex-wrap">
                        {comment.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleApprove(comment.id)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReject(comment.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setReplyingTo(comment.id)}
                        >
                          <Reply className="h-4 w-4 mr-1" />
                          Reply
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}