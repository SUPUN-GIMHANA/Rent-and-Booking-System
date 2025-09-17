import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { StatsCard } from '@/components/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockAnalytics, mockItems } from '@/lib/mockData';
import { TrendingUp, Eye, DollarSign, Package, Calendar, MapPin } from 'lucide-react';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('30d');
  const analytics = mockAnalytics;

  // Calculate additional analytics
  const totalRevenue = mockItems
    .filter(item => item.status === 'sold')
    .reduce((sum, item) => sum + item.price, 0);

  const averageViews = Math.round(analytics.totalViews / analytics.totalItems);
  
  const categoryStats = mockItems.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const locationStats = mockItems.reduce((acc, item) => {
    acc[item.location] = (acc[item.location] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const performanceData = mockItems.map(item => ({
    ...item,
    performance: (item.views / Math.max(...mockItems.map(i => i.views))) * 100
  })).sort((a, b) => b.performance - a.performance);

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar className="w-64" />
      
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 md:p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Analytics</h1>
              <p className="text-muted-foreground">
                Track your listing performance and insights
              </p>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Total Views"
              value={analytics.totalViews.toLocaleString()}
              description="All time views"
              icon={Eye}
              trend={{ value: 23, isPositive: true }}
            />
            <StatsCard
              title="Average Views"
              value={averageViews}
              description="Per listing"
              icon={TrendingUp}
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard
              title="Total Revenue"
              value={`$${totalRevenue.toLocaleString()}`}
              description="From sold items"
              icon={DollarSign}
              trend={{ value: 8, isPositive: true }}
            />
            <StatsCard
              title="Active Listings"
              value={analytics.activeItems}
              description={`of ${analytics.totalItems} total`}
              icon={Package}
              trend={{ value: 5, isPositive: true }}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Top Performing Items */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {performanceData.slice(0, 5).map((item, index) => (
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
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Eye className="h-3 w-3" />
                        <span>{item.views} views</span>
                        <span>•</span>
                        <span>{Math.round(item.performance)}% performance</span>
                      </div>
                    </div>
                    <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(categoryStats)
                  .sort(([,a], [,b]) => b - a)
                  .map(([category, count]) => {
                    const percentage = Math.round((count / analytics.totalItems) * 100);
                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{category}</span>
                          <span className="text-sm text-muted-foreground">
                            {count} items ({percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Location Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(locationStats)
                  .sort(([,a], [,b]) => b - a)
                  .map(([location, count]) => {
                    const locationItems = mockItems.filter(item => item.location === location);
                    const totalViews = locationItems.reduce((sum, item) => sum + item.views, 0);
                    const avgViews = Math.round(totalViews / count);
                    
                    return (
                      <div key={location} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{location}</p>
                          <p className="text-sm text-muted-foreground">
                            {count} items • {avgViews} avg views
                          </p>
                        </div>
                        <Badge variant="outline">{totalViews} total views</Badge>
                      </div>
                    );
                  })}
              </CardContent>
            </Card>

            {/* Recent Activity Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analytics.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm">{activity}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(Date.now() - index * 86400000).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Performance Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    {Math.round((analytics.activeItems / analytics.totalItems) * 100)}%
                  </p>
                  <p className="text-sm text-muted-foreground">Active Listings</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.round(analytics.totalViews / 30)}
                  </p>
                  <p className="text-sm text-muted-foreground">Daily Avg Views</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">
                    ${Math.round(analytics.totalEarnings / analytics.totalItems)}
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Price per Item</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}