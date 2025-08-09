import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, X, DollarSign, Calendar, Target, Users, Eye, UserCheck } from 'lucide-react';

const InvestmentRoundForm = ({ rounds = [], onRoundsChange }) => {
  const addRound = () => {
    const newRound = {
      id: Date.now() + Math.random(),
      round: '',
      amount: '',
      currency: 'CNY',
      deliveryDate: '',
      shareholdingRatio: '',
      hasDirector: '',
      hasObserver: ''
    };
    onRoundsChange([...rounds, newRound]);
  };

  const removeRound = (id) => {
    onRoundsChange(rounds.filter(round => round.id !== id));
  };

  const updateRound = (id, field, value) => {
    onRoundsChange(rounds.map(round => 
      round.id === id ? { ...round, [field]: value } : round
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-gray-700 font-medium flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-gray-500" />
          投资轮次信息
        </Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addRound}
          className="flex items-center gap-2 text-sm"
        >
          <Plus className="h-4 w-4" />
          添加轮次
        </Button>
      </div>

      {rounds.length === 0 && (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-6 text-center">
            <DollarSign className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">暂无投资轮次，点击"添加轮次"开始添加</p>
          </CardContent>
        </Card>
      )}

      {rounds.map((round, index) => (
        <Card key={round.id} className="border border-gray-200 bg-gray-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-800 flex items-center gap-2">
                <Target className="h-4 w-4 text-gray-600" />
                第 {index + 1} 轮投资
              </h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeRound(round.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium text-sm">投资轮次</Label>
                <Input
                  value={round.round}
                  onChange={(e) => updateRound(round.id, 'round', e.target.value)}
                  placeholder="如：A轮、B轮等"
                  className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium text-sm">投资金额</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={round.amount}
                    onChange={(e) => updateRound(round.id, 'amount', e.target.value)}
                    placeholder="投资金额"
                    className="flex-1 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                  />
                  <Select 
                    value={round.currency} 
                    onValueChange={(value) => updateRound(round.id, 'currency', value)}
                  >
                    <SelectTrigger className="w-24 border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CNY">CNY</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium text-sm">交割日期</Label>
                <Input
                  type="date"
                  value={round.deliveryDate}
                  onChange={(e) => updateRound(round.id, 'deliveryDate', e.target.value)}
                  className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium text-sm">目前持股比例</Label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.01"
                    value={round.shareholdingRatio}
                    onChange={(e) => updateRound(round.id, 'shareholdingRatio', e.target.value)}
                    placeholder="如：15.5"
                    className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 pr-8"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">%</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium text-sm">是否有董事</Label>
                <Select 
                  value={round.hasDirector} 
                  onValueChange={(value) => updateRound(round.id, 'hasDirector', value)}
                >
                  <SelectTrigger className="border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                    <SelectValue placeholder="选择" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="是">是</SelectItem>
                    <SelectItem value="否">否</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium text-sm">是否有观察员</Label>
                <Select 
                  value={round.hasObserver} 
                  onValueChange={(value) => updateRound(round.id, 'hasObserver', value)}
                >
                  <SelectTrigger className="border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                    <SelectValue placeholder="选择" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="是">是</SelectItem>
                    <SelectItem value="否">否</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default InvestmentRoundForm;
