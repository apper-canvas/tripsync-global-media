import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Plus, Edit3, Trash2, DollarSign, Calendar, Receipt, TrendingUp } from 'lucide-react';
import { useTripData } from '../../hooks/useTripData';
import { toast } from 'sonner';

const categoryColors = {
  accommodation: '#8884d8',
  food: '#82ca9d',
  transportation: '#ffc658',
  activities: '#ff7c7c',
  shopping: '#8dd1e1'
};

const categoryLabels = {
  accommodation: 'Accommodation',
  food: 'Food & Dining',
  transportation: 'Transportation',
  activities: 'Activities',
  shopping: 'Shopping'
};

const BudgetSection = ({ tripId }) => {
  const { budget, expenses, addExpense, updateExpense, deleteExpense } = useTripData(tripId);
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    description: '',
    date: ''
  });

  const resetForm = () => {
    setFormData({
      category: '',
      amount: '',
      description: '',
      date: ''
    });
    setEditingExpense(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.category || !formData.amount || !formData.description || !formData.date) {
      toast.error('Please fill in all required fields');
      return;
    }

    const expenseData = {
      ...formData,
      amount: parseFloat(formData.amount)
    };

    if (editingExpense) {
      updateExpense(editingExpense.id, expenseData);
      toast.success('Expense updated successfully!');
    } else {
      addExpense(expenseData);
      toast.success('Expense added successfully!');
    }

    resetForm();
    setIsAddingExpense(false);
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setFormData({
      category: expense.category,
      amount: expense.amount.toString(),
      description: expense.description,
      date: expense.date
    });
    setIsAddingExpense(true);
  };

  const handleDelete = (expense) => {
    if (window.confirm(`Are you sure you want to delete "${expense.description}"?`)) {
      deleteExpense(expense.id);
      toast.success('Expense deleted successfully!');
    }
  };

  if (!budget) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Budget & Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">
            Loading budget data...
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalSpent = Object.values(budget.categories).reduce((sum, cat) => sum + cat.spent, 0);
  const remaining = budget.total - totalSpent;

  // Prepare chart data
  const pieData = Object.entries(budget.categories).map(([key, value]) => ({
    name: categoryLabels[key],
    value: value.spent,
    category: key,
    color: categoryColors[key]
  }));

  // Prepare expense data for bar chart (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const dailyExpenses = last7Days.map(date => {
    const dayExpenses = expenses.filter(exp => exp.date === date);
    const total = dayExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    return {
      date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      amount: total
    };
  });

  const chartConfig = {
    accommodation: {
      label: "Accommodation",
      color: categoryColors.accommodation,
    },
    food: {
      label: "Food & Dining",
      color: categoryColors.food,
    },
    transportation: {
      label: "Transportation",
      color: categoryColors.transportation,
    },
    activities: {
      label: "Activities",
      color: categoryColors.activities,
    },
    shopping: {
      label: "Shopping",
      color: categoryColors.shopping,
    },
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            <CardTitle>Budget & Expenses</CardTitle>
          </div>
          <Dialog open={isAddingExpense} onOpenChange={setIsAddingExpense}>
            <DialogTrigger asChild>
              <Button size="sm" onClick={() => resetForm()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {editingExpense ? 'Edit Expense' : 'Add New Expense'}
                </DialogTitle>
                <DialogDescription>
                  {editingExpense ? 'Update the expense details below.' : 'Enter the expense details below.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(categoryLabels).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount ({budget.currency}) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the expense"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingExpense ? 'Update Expense' : 'Add Expense'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsAddingExpense(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <CardDescription>
          Track and visualize your trip expenses
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Budget Overview */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              ${budget.total.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Budget</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-destructive">
              ${totalSpent.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Spent</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${remaining.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Remaining</div>
          </div>
        </div>

        <Separator />

        {/* Expense Breakdown Chart */}
        <div>
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            Expense Breakdown
          </h4>
          <ChartContainer config={chartConfig} className="h-[200px]">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={60}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip 
                content={<ChartTooltipContent />} 
                formatter={(value) => [`$${value}`, 'Amount']}
              />
            </PieChart>
          </ChartContainer>
        </div>

        <Separator />

        {/* Daily Spending Trend */}
        <div>
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Daily Spending (Last 7 Days)
          </h4>
          <ChartContainer config={chartConfig} className="h-[150px]">
            <BarChart data={dailyExpenses}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Bar dataKey="amount" fill="#8884d8" />
              <ChartTooltip 
                content={<ChartTooltipContent />} 
                formatter={(value) => [`$${value}`, 'Amount']}
              />
            </BarChart>
          </ChartContainer>
        </div>

        <Separator />

        {/* Recent Expenses */}
        <div>
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Recent Expenses
          </h4>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {expenses.slice(0, 5).map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">
                      {categoryLabels[expense.category]}
                    </Badge>
                    <span className="text-sm font-medium">
                      ${expense.amount}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {expense.description}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(expense.date).toLocaleDateString()} • {expense.addedByName}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(expense)}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(expense)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {expenses.length === 0 && (
              <div className="text-center text-muted-foreground py-4">
                No expenses recorded yet
              </div>
            )}
            {expenses.length > 5 && (
              <div className="text-center">
                <Button variant="outline" size="sm">
                  View All Expenses ({expenses.length})
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetSection;