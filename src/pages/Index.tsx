import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, TrendingUp, Clock, AlertTriangle, Users, Zap, MessageSquare, FileText, CreditCard, BarChart3, Settings, Menu, X } from 'lucide-react';

// Sample data - hardcoded for MVP
const sampleData = {
  business: {
    name: 'Acme Marketing Agency',
    currency: 'USD',
    role: 'owner'
  },
  revenueMetrics: {
    totalInvoiced: 50000,
    totalPaid: 37500,
    outstanding: 12500,
    overdue: 6800,
    paymentRate: 75
  },
  actionPlan: [
    {
      id: 1,
      priority: 1,
      action: 'Contact Sarah Chen - $4,500 opportunity',
      reason: 'Hot lead - proposal sent 2 days ago, no response',
      type: 'follow-up',
      value: 4500,
      urgency: 'high'
    },
    {
      id: 2,
      priority: 2,
      action: 'Follow up with ABC Ltd - pending proposal',
      reason: 'Deal stuck in proposal stage for 5 days',
      type: 'opportunity',
      value: 8200,
      urgency: 'high'
    },
    {
      id: 3,
      priority: 3,
      action: 'Send payment reminder to XYZ Corp - $2,800 overdue',
      reason: 'Invoice 30 days overdue, highest priority',
      type: 'payment',
      value: 2800,
      urgency: 'critical'
    },
    {
      id: 4,
      priority: 4,
      action: 'Reactivate John Smith - previous customer',
      reason: 'Last purchase 92 days ago (normal cycle: 60 days)',
      type: 'retention',
      value: 3200,
      urgency: 'medium'
    },
    {
      id: 5,
      priority: 5,
      action: 'Contact 3 hot leads - lead scores 80+',
      reason: 'New leads with high purchase intent',
      type: 'lead',
      value: 12000,
      urgency: 'high'
    }
  ],
  followUpsNeeded: [
    { id: 1, name: 'Sarah Chen', company: 'TechStart Inc', status: 'Proposal Sent', daysAgo: 2, value: 4500 },
    { id: 2, name: 'Mike Johnson', company: 'BuildCo', status: 'Qualified', daysAgo: 4, value: 3200 },
    { id: 3, name: 'Lisa Rodriguez', company: 'Digital Plus', status: 'Engaged', daysAgo: 3, value: 2800 },
    { id: 4, name: 'James Park', company: 'Growth Labs', status: 'Contacted', daysAgo: 6, value: 5600 },
    { id: 5, name: 'Emma Wilson', company: 'Creative Hub', status: 'Qualified', daysAgo: 1, value: 2200 },
    { id: 6, name: 'David Brown', company: 'NextGen', status: 'Engaged', daysAgo: 5, value: 3800 },
    { id: 7, name: 'Rachel Green', company: 'Startup Zone', status: 'Contacted', daysAgo: 7, value: 1900 },
    { id: 8, name: 'Tom Martinez', company: 'Tech Forward', status: 'Proposal Sent', daysAgo: 3, value: 6200 },
  ],
  overdueInvoices: [
    { id: 'INV-001', customer: 'XYZ Corp', amount: 2800, daysOverdue: 30, lastReminder: '5 days ago' },
    { id: 'INV-003', customer: 'Global Services', amount: 1900, daysOverdue: 15, lastReminder: '2 days ago' },
    { id: 'INV-007', customer: 'Premier Ltd', amount: 1500, daysOverdue: 8, lastReminder: '1 day ago' },
  ],
  reactivationOpportunities: [
    { id: 1, name: 'John Smith', lastPurchase: 92, normalCycle: 60, totalValue: 12500, nextExpected: 'Now' },
    { id: 2, name: 'ABC Industries', lastPurchase: 75, normalCycle: 60, totalValue: 8900, nextExpected: 'Now' },
    { id: 3, name: 'Tech Solutions', lastPurchase: 120, normalCycle: 90, totalValue: 15600, nextExpected: 'Now' },
    { id: 4, name: 'Business Group', lastPurchase: 88, normalCycle: 60, totalValue: 6200, nextExpected: 'Now' },
    { id: 5, name: 'Innovation Co', lastPurchase: 105, normalCycle: 90, totalValue: 9800, nextExpected: 'Soon' },
    { id: 6, name: 'Premier Partners', lastPurchase: 200, normalCycle: 150, totalValue: 5400, nextExpected: 'Soon' },
    { id: 7, name: 'Growth Systems', lastPurchase: 72, normalCycle: 60, totalValue: 11200, nextExpected: 'Now' },
  ],
  hotLeads: [
    { id: 1, name: 'Sarah Chen', score: 87, reason: 'Requested pricing, responded twice, asked about delivery' },
    { id: 2, name: 'Mike Johnson', score: 84, reason: 'Requested demo, high engagement, enterprise prospect' },
    { id: 3, name: 'Lisa Rodriguez', score: 82, reason: 'Multiple interactions, asked about custom features' },
  ]
};

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<number | null>(null);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'follow-up': return <MessageSquare className="w-4 h-4" />;
      case 'opportunity': return <TrendingUp className="w-4 h-4" />;
      case 'payment': return <AlertTriangle className="w-4 h-4" />;
      case 'retention': return <Users className="w-4 h-4" />;
      case 'lead': return <Zap className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <h1 className="text-xl font-bold text-foreground">RevenueCycle AI</h1>
              <p className="text-xs text-muted-foreground">{sampleData.business.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-64 border-r border-border bg-card min-h-screen p-4 fixed md:relative z-30 md:z-0`}>
          <nav className="space-y-2">
            {[
              { icon: <BarChart3 className="w-4 h-4" />, label: 'Dashboard', active: true },
              { icon: <Zap className="w-4 h-4" />, label: 'Leads' },
              { icon: <Clock className="w-4 h-4" />, label: 'Follow-Ups' },
              { icon: <TrendingUp className="w-4 h-4" />, label: 'Sales Pipeline' },
              { icon: <Users className="w-4 h-4" />, label: 'Customers' },
              { icon: <FileText className="w-4 h-4" />, label: 'Invoices' },
              { icon: <CreditCard className="w-4 h-4" />, label: 'Payments' },
              { icon: <MessageSquare className="w-4 h-4" />, label: 'AI Assistant' },
            ].map((item, i) => (
              <button
                key={i}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {/* Revenue Metrics Overview */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            <Card className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Total Invoiced</p>
              <p className="text-2xl font-bold text-foreground">${(sampleData.revenueMetrics.totalInvoiced / 1000).toFixed(0)}K</p>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Paid</p>
              <p className="text-2xl font-bold text-foreground">${(sampleData.revenueMetrics.totalPaid / 1000).toFixed(0)}K</p>
              <p className="text-xs text-green-600 mt-1">{sampleData.revenueMetrics.paymentRate}%</p>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Outstanding</p>
              <p className="text-2xl font-bold text-foreground">${(sampleData.revenueMetrics.outstanding / 1000).toFixed(0)}K</p>
            </Card>
            <Card className="p-4 border-destructive/30 bg-destructive/5">
              <p className="text-xs text-muted-foreground mb-1">Overdue</p>
              <p className="text-2xl font-bold text-destructive">${(sampleData.revenueMetrics.overdue / 1000).toFixed(0)}K</p>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Leads Need Follow-Up</p>
              <p className="text-2xl font-bold text-foreground">{sampleData.followUpsNeeded.length}</p>
            </Card>
          </div>

          {/* AI Revenue Action Plan - HERO SECTION */}
          <Card className="mb-6 border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
            <div className="border-b border-primary/20 bg-primary/10 px-6 py-4">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">AI Revenue Action Plan</h2>
              </div>
              <p className="text-sm text-muted-foreground">Your top 5 revenue opportunities today</p>
            </div>
            <div className="p-6 space-y-3">
              {sampleData.actionPlan.map((action) => (
                <div
                  key={action.id}
                  onClick={() => setSelectedAction(action.id)}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    selectedAction === action.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1 text-primary">
                      {getTypeIcon(action.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-foreground text-sm">{action.priority}. {action.action}</p>
                        <Badge className={`flex-shrink-0 ${getUrgencyColor(action.urgency)}`}>
                          {action.urgency}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{action.reason}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-primary">${action.value.toLocaleString()}</span>
                        <Button size="sm" variant="outline" className="text-xs">
                          Take Action
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Follow-Ups Needed */}
            <Card>
              <div className="border-b border-border px-6 py-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-foreground">Follow-Ups Needed ({sampleData.followUpsNeeded.length})</h3>
                </div>
              </div>
              <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
                {sampleData.followUpsNeeded.slice(0, 5).map((lead) => (
                  <div key={lead.id} className="flex items-start justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-foreground">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">{lead.company}</p>
                      <p className="text-xs text-muted-foreground mt-1">{lead.status} • {lead.daysAgo}d ago</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-sm text-primary">${lead.value.toLocaleString()}</p>
                      <Button size="sm" variant="ghost" className="mt-1 h-7 text-xs">
                        Follow up
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-border px-6 py-3 bg-muted/30">
                <Button variant="outline" size="sm" className="w-full">View All {sampleData.followUpsNeeded.length} Follow-Ups</Button>
              </div>
            </Card>

            {/* Overdue Invoices */}
            <Card>
              <div className="border-b border-border px-6 py-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <h3 className="font-bold text-foreground">Overdue Invoices</h3>
                  <Badge variant="destructive">${sampleData.revenueMetrics.overdue.toLocaleString()}</Badge>
                </div>
              </div>
              <div className="p-6 space-y-3">
                {sampleData.overdueInvoices.map((invoice) => (
                  <div key={invoice.id} className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-sm text-foreground">{invoice.customer}</p>
                        <p className="text-xs text-muted-foreground">{invoice.id}</p>
                      </div>
                      <Badge variant="destructive" className="text-xs">{invoice.daysOverdue}d overdue</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-destructive">${invoice.amount.toLocaleString()}</p>
                      <Button size="sm" variant="outline" className="text-xs">Send Reminder</Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-border px-6 py-3 bg-muted/30">
                <Button variant="outline" size="sm" className="w-full">View All Invoices</Button>
              </div>
            </Card>
          </div>

          {/* Reactivation Opportunities */}
          <Card className="mb-6">
            <div className="border-b border-border px-6 py-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-foreground">Reactivation Opportunities ({sampleData.reactivationOpportunities.length})</h3>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Customers ready for repeat purchase</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-48 overflow-y-auto">
                {sampleData.reactivationOpportunities.map((opp) => (
                  <div key={opp.id} className="p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/50 transition-colors">
                    <p className="font-semibold text-sm text-foreground">{opp.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">Last purchase: {opp.lastPurchase}d ago</p>
                    <p className="text-xs text-muted-foreground">Normal cycle: {opp.normalCycle}d</p>
                    <p className="text-xs font-bold text-primary mt-2">Total value: ${opp.totalValue.toLocaleString()}</p>
                    <Button size="sm" variant="outline" className="w-full mt-2 text-xs">Reactivate</Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Hot Leads & Placeholder Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hot Leads */}
            <Card>
              <div className="border-b border-border px-6 py-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-foreground">Hot Leads</h3>
                </div>
              </div>
              <div className="p-6 space-y-3">
                {sampleData.hotLeads.map((lead) => (
                  <div key={lead.id} className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-semibold text-sm text-foreground">{lead.name}</p>
                      <Badge className="bg-primary text-primary-foreground">{lead.score}/100</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{lead.reason}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* What's Next - Placeholder */}
            <Card className="opacity-75">
              <div className="border-b border-border px-6 py-4">
                <h3 className="font-bold text-foreground">Coming Soon</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground mb-4">
                    Additional features being prepared for your business:
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-2 text-left">
                    <li>✓ Advanced Sales Pipeline Visualization</li>
                    <li>✓ Custom Automation Workflows</li>
                    <li>✓ Multi-channel Communication (Email, SMS, WhatsApp)</li>
                    <li>✓ Payment Processor Integrations</li>
                    <li>✓ Advanced Analytics & Reporting</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
