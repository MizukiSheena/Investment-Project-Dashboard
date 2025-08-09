import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

const ProjectSort = ({ sortConfig, onSortChange }) => {
  const handleSortFieldChange = (field) => {
    onSortChange({
      field,
      direction: sortConfig.field === field ? sortConfig.direction : 'asc'
    });
  };

  const handleDirectionToggle = () => {
    onSortChange({
      ...sortConfig,
      direction: sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const getSortLabel = (field) => {
    switch (field) {
      case 'name':
        return '项目名称';
      case 'amount':
        return '投资金额';
      case 'deliveryDate':
        return '交割日期';
      default:
        return '项目名称';
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-600">排序：</span>
      <Select value={sortConfig.field} onValueChange={handleSortFieldChange}>
        <SelectTrigger className="w-32 h-8 text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">项目名称</SelectItem>
          <SelectItem value="amount">投资金额</SelectItem>
          <SelectItem value="deliveryDate">交割日期</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDirectionToggle}
        className="h-8 px-2 text-gray-600 hover:text-gray-800"
      >
        {sortConfig.direction === 'asc' ? (
          <ArrowUp className="h-4 w-4" />
        ) : (
          <ArrowDown className="h-4 w-4" />
        )}
      </Button>
      <span className="text-xs text-gray-500">
        {getSortLabel(sortConfig.field)} {sortConfig.direction === 'asc' ? '升序' : '降序'}
      </span>
    </div>
  );
};

export default ProjectSort;
