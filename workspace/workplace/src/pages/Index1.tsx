import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { StatsCard } from '@/components/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockAnalytics, mockItems, mockComments } from '@/lib/mockData';
import { Package, Eye, DollarSign, TrendingUp, MessageSquare, Zap, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [analytics, setAnalytics] = useState(mockAnalytics);
  const [recentItems, setRecentItems] = useState(mockItems.slice(0, 3));
  const [pendingComments, setPendingComments] = useState(
    mockComments.filter(comment => comment.status === 'pending')
  );

  const boostedItems = mockItems.filter(item => item.isBoosted);

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar className="w-64" />
      
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 md:p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here's an overview of your rental business.
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <StatsCard
              title="Total Items"
              value={analytics.totalItems}
              description="All your listings"
              icon={Package}
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard
              title="Active Items"
              value={analytics.activeItems}
              description="Currently available"
              icon={TrendingUp}
              trend={{ value: 8, isPositive: true }}
            />
            <StatsCard
              title="Total Views"
              value={analytics.totalViews.toLocaleString()}
              description="All time views"
              icon={Eye}
              trend={{ value: 23, isPositive: true }}
            />
            <StatsCard
              title="Boost Revenue"
              value={`$${analytics.boostRevenue.toFixed(2)}`}
              description="From boosted ads"
              icon={Zap}
              trend={{ value: 15, isPositive: true }}
            />
            <StatsCard
              title="Commercial Revenue"
              value={`$${analytics.commercialRevenue.toFixed(2)}`}
              description="From commercial ads"
              icon={Megaphone}
              trend={{ value: 25, isPositive: true }}
            />
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Link to="/boost-advertisement">
                  <Button className="w-full h-20 flex-col gap-2" variant="outline">
                    <Zap className="h-6 w-6 text-yellow-500" />
                    <span>Boost Item</span>
                  </Button>
                </Link>
                <Link to="/commercial-ads">
                  <Button className="w-full h-20 flex-col gap-2" variant="outline">
                    <Megaphone className="h-6 w-6 text-blue-500" />
                    <span>Create Commercial Ad</span>
                  </Button>
                </Link>
                <Link to="/add-advertisement">
                  <Button className="w-full h-20 flex-col gap-2" variant="outline">
                    <Package className="h-6 w-6 text-green-500" />
                    <span>Add New Item</span>
                  </Button>
                </Link>
                <Link to="/analytics">
                  <Button className="w-full h-20 flex-col gap-2" variant="outline">
                    <TrendingUp className="h-6 w-6 text-purple-500" />
                    <span>View Analytics</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Most Viewed Items */}
            <Card>
              <CardHeader>
                <CardTitle>Most Viewed Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analytics.mostViewedItems.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                      {index + 1}
                    </div>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.views} views • ${item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
                        {item.status}
                      </Badge>
                      {item.isBoosted && (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Zap className="h-3 w-3 mr-1" />
                          Boosted
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analytics.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                    <p className="text-sm">{activity}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Revenue Overview and Boosted Items */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Zap className="h-8 w-8 text-yellow-500" />
                    <div>
                      <p className="font-semibold">Boost Revenue</p>
                      <p className="text-sm text-muted-foreground">{boostedItems.length} active boosts</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-yellow-600">
                    ${analytics.boostRevenue.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Megaphone className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="font-semibold">Commercial Ads</p>
                      <p className="text-sm text-muted-foreground">2 active campaigns</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">
                    ${analytics.commercialRevenue.toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Pending Comments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingComments.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No pending comments</p>
                ) : (
                  pendingComments.map((comment) => (
                    <div key={comment.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{comment.userName}</p>
                        <Badge variant="outline">Pending</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {comment.message}
                      </p>
                    </div>
                  ))
                )}
                {pendingComments.length > 0 && (
                  <Link to="/comments">
                    <Button variant="outline" size="sm" className="w-full">
                      Manage All Comments
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}