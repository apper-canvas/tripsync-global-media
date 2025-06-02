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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Checkbox } from '../ui/checkbox';
import { CreditCard, Plus, Receipt, Users, ArrowRightLeft, DollarSign, Check, Clock, AlertCircle } from 'lucide-react';
import { useTripData } from '../../hooks/useTripData';
import { paymentMethods, paymentStatuses } from '../../constants/appConfig';
import { toast } from 'sonner';

const PaymentSection = ({ tripId }) => {
  const { participants, payments, paymentBalances, splitExpense, recordPayment, getPaymentSummary } = useTripData(tripId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('split');
  
  // Split expense form state
  const [splitForm, setSplitForm] = useState({
    amount: '',
    description: '',
    category: '',
    date: '',
    paidBy: '',
    splitType: 'equal',
    participants: [],
    customAmounts: {}
  });

  // Record payment form state
  const [paymentForm, setPaymentForm] = useState({
    payerId: '',
    receiverId: '',
    amount: '',
    description: '',
    method: '',
    date: ''
  });

  const resetForms = () => {
    setSplitForm({
      amount: '',
      description: '',
      category: '',
      date: '',
      paidBy: '',
      splitType: 'equal',
      participants: [],
      customAmounts: {}
    });
    setPaymentForm({
      payerId: '',
      receiverId: '',
      amount: '',
      description: '',
      method: '',
      date: ''
    });
  };

  const handleSplitExpense = (e) => {
    e.preventDefault();
    
    if (!splitForm.amount || !splitForm.description || !splitForm.category || !splitForm.date || !splitForm.paidBy) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (splitForm.participants.length === 0) {
      toast.error('Please select at least one participant to split with');
      return;
    }

    if (splitForm.splitType === 'custom') {
      const totalCustom = Object.values(splitForm.customAmounts).reduce((sum, amount) => sum + parseFloat(amount || 0), 0);
      if (Math.abs(totalCustom - parseFloat(splitForm.amount)) > 0.01) {
        toast.error('Custom amounts must add up to the total expense amount');
        return;
      }
    }

    const expenseData = {
      ...splitForm,
      amount: parseFloat(splitForm.amount),
      participants: [...splitForm.participants, splitForm.paidBy] // Include payer in split
    };

    splitExpense(expenseData);
    toast.success('Expense split successfully!');
    resetForms();
    setIsDialogOpen(false);
  };

  const handleRecordPayment = (e) => {
    e.preventDefault();
    
    if (!paymentForm.payerId || !paymentForm.receiverId || !paymentForm.amount || !paymentForm.method || !paymentForm.date) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (paymentForm.payerId === paymentForm.receiverId) {
      toast.error('Payer and receiver cannot be the same person');
      return;
    }

    const payer = participants.find(p => p.id === paymentForm.payerId);
    const receiver = participants.find(p => p.id === paymentForm.receiverId);

    const paymentData = {
      ...paymentForm,
      amount: parseFloat(paymentForm.amount),
      payerName: payer?.name || '',
      receiverName: receiver?.name || ''
    };

    recordPayment(paymentData);
    toast.success('Payment recorded successfully!');
    resetForms();
    setIsDialogOpen(false);
  };

  const handleParticipantToggle = (participantId, checked) => {
    setSplitForm(prev => ({
      ...prev,
      participants: checked 
        ? [...prev.participants, participantId]
        : prev.participants.filter(id => id !== participantId)
    }));
  };

  const handleCustomAmountChange = (participantId, amount) => {
    setSplitForm(prev => ({
      ...prev,
      customAmounts: {
        ...prev.customAmounts,
        [participantId]: amount
      }
    }));
  };

  const paymentSummary = getPaymentSummary();
  const totalOwed = paymentSummary.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            <CardTitle>Payments & Splits</CardTitle>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" onClick={() => resetForms()}>
                <Plus className="h-4 w-4 mr-2" />
                New Payment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Payment Management</DialogTitle>
                <DialogDescription>
                  Split expenses or record payments between team members
                </DialogDescription>
              </DialogHeader>
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="split">Split Expense</TabsTrigger>
                  <TabsTrigger value="payment">Record Payment</TabsTrigger>
                </TabsList>
                
                <TabsContent value="split" className="space-y-4">
                  <form onSubmit={handleSplitExpense} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="split-amount">Amount *</Label>
                        <Input
                          id="split-amount"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={splitForm.amount}
                          onChange={(e) => setSplitForm(prev => ({ ...prev, amount: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="split-category">Category *</Label>
                        <Select
                          value={splitForm.category}
                          onValueChange={(value) => setSplitForm(prev => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="accommodation">Accommodation</SelectItem>
                            <SelectItem value="food">Food & Dining</SelectItem>
                            <SelectItem value="transportation">Transportation</SelectItem>
                            <SelectItem value="activities">Activities</SelectItem>
                            <SelectItem value="shopping">Shopping</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="split-description">Description *</Label>
                      <Textarea
                        id="split-description"
                        placeholder="What was this expense for?"
                        value={splitForm.description}
                        onChange={(e) => setSplitForm(prev => ({ ...prev, description: e.target.value }))}
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="split-date">Date *</Label>
                        <Input
                          id="split-date"
                          type="date"
                          value={splitForm.date}
                          onChange={(e) => setSplitForm(prev => ({ ...prev, date: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="paid-by">Paid By *</Label>
                        <Select
                          value={splitForm.paidBy}
                          onValueChange={(value) => setSplitForm(prev => ({ ...prev, paidBy: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Who paid?" />
                          </SelectTrigger>
                          <SelectContent>
                            {participants.map((participant) => (
                              <SelectItem key={participant.id} value={participant.id}>
                                {participant.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Split Type</Label>
                      <Select
                        value={splitForm.splitType}
                        onValueChange={(value) => setSplitForm(prev => ({ ...prev, splitType: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="equal">Split Equally</SelectItem>
                          <SelectItem value="custom">Custom Amounts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Split With</Label>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {participants.filter(p => p.id !== splitForm.paidBy).map((participant) => (
                          <div key={participant.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`participant-${participant.id}`}
                                checked={splitForm.participants.includes(participant.id)}
                                onCheckedChange={(checked) => handleParticipantToggle(participant.id, checked)}
                              />
                              <Label htmlFor={`participant-${participant.id}`}>
                                {participant.name}
                              </Label>
                            </div>
                            {splitForm.splitType === 'custom' && splitForm.participants.includes(participant.id) && (
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="w-20"
                                value={splitForm.customAmounts[participant.id] || ''}
                                onChange={(e) => handleCustomAmountChange(participant.id, e.target.value)}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button type="submit" className="flex-1">
                        Split Expense
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="payment" className="space-y-4">
                  <form onSubmit={handleRecordPayment} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="payer">From *</Label>
                        <Select
                          value={paymentForm.payerId}
                          onValueChange={(value) => setPaymentForm(prev => ({ ...prev, payerId: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Who paid?" />
                          </SelectTrigger>
                          <SelectContent>
                            {participants.map((participant) => (
                              <SelectItem key={participant.id} value={participant.id}>
                                {participant.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="receiver">To *</Label>
                        <Select
                          value={paymentForm.receiverId}
                          onValueChange={(value) => setPaymentForm(prev => ({ ...prev, receiverId: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Who received?" />
                          </SelectTrigger>
                          <SelectContent>
                            {participants.map((participant) => (
                              <SelectItem key={participant.id} value={participant.id}>
                                {participant.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="payment-amount">Amount *</Label>
                        <Input
                          id="payment-amount"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={paymentForm.amount}
                          onChange={(e) => setPaymentForm(prev => ({ ...prev, amount: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="payment-method">Method *</Label>
                        <Select
                          value={paymentForm.method}
                          onValueChange={(value) => setPaymentForm(prev => ({ ...prev, method: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="How was it paid?" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(paymentMethods).map(([key, method]) => (
                              <SelectItem key={key} value={key}>
                                {method.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="payment-date">Date *</Label>
                      <Input
                        id="payment-date"
                        type="date"
                        value={paymentForm.date}
                        onChange={(e) => setPaymentForm(prev => ({ ...prev, date: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="payment-description">Description</Label>
                      <Textarea
                        id="payment-description"
                        placeholder="Optional note about this payment"
                        value={paymentForm.description}
                        onChange={(e) => setPaymentForm(prev => ({ ...prev, description: e.target.value }))}
                        rows={2}
                      />
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button type="submit" className="flex-1">
                        Record Payment
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
        <CardDescription>
          Manage shared expenses and track payments between team members
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Payment Summary */}
        <div>
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Payment Summary
          </h4>
          {paymentSummary.length > 0 ? (
            <div className="space-y-3">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  ${totalOwed.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">Total Outstanding</div>
              </div>
              <div className="space-y-2">
                {paymentSummary.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">
                          {item.payer} → {item.receiver}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Owes ${item.amount.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setPaymentForm(prev => ({
                          ...prev,
                          payerId: item.payerId,
                          receiverId: item.receiverId,
                          amount: item.amount.toString()
                        }));
                        setActiveTab('payment');
                        setIsDialogOpen(true);
                      }}
                    >
                      Settle
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-6">
              <DollarSign className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <div>All settled up!</div>
              <div className="text-sm">No outstanding payments</div>
            </div>
          )}
        </div>

        <Separator />

        {/* Recent Payments */}
        <div>
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            Recent Payments
          </h4>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {payments.slice(0, 5).map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-green-100">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">
                      {payment.payerName} → {payment.receiverName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ${payment.amount} • {paymentMethods[payment.method]?.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(payment.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="text-green-600">
                  <Check className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              </div>
            ))}
            {payments.length === 0 && (
              <div className="text-center text-muted-foreground py-6">
                <Receipt className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <div>No payments recorded yet</div>
                <div className="text-sm">Start by splitting an expense or recording a payment</div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentSection;