import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X, Filter } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const ProjectSearch = ({ filters, onFiltersChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (field, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    onFiltersChange({
      keyword: '',
      department: '',
      investmentEntity: ''
    });
  };

  const hasActiveFilters = filters.keyword || filters.department || filters.investmentEntity;

  return (
    <Card className="shadow-sm border border-gray-200 bg-white">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CardTitle className="flex items-center gap-2 text-gray-700 text-lg">
              <Search className="h-4 w-4" />
              项目名称
            </CardTitle>
            <div className="flex-1 min-w-64">
              <Input
                placeholder="输入项目名称进行搜索..."
                value={filters.keyword}
                onChange={(e) => handleFilterChange('keyword', e.target.value)}
                className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 h-8"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-gray-600 hover:text-gray-700 hover:bg-gray-100 h-8 px-3"
              >
                <X className="h-3 w-3 mr-1" />
                清除筛选
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-600 hover:text-gray-700 hover:bg-gray-100 h-8 px-3"
            >
              <Filter className="h-3 w-3 mr-1" />
              {isExpanded ? '收起' : '展开'}筛选
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Collapsible open={isExpanded}>
          <CollapsibleContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department" className="text-gray-700 font-medium text-sm">所属部门</Label>
                <Select 
                  value={filters.department} 
                  onValueChange={(value) => handleFilterChange('department', value === 'all' ? '' : value)}
                >
                  <SelectTrigger className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 h-8">
                    <SelectValue placeholder="选择部门" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部部门</SelectItem>
                    <SelectItem value="龙珠">龙珠</SelectItem>
                    <SelectItem value="战投">战投</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="investmentEntity" className="text-gray-700 font-medium text-sm">投资主体</Label>
                <Input
                  id="investmentEntity"
                  placeholder="输入投资主体进行搜索..."
                  value={filters.investmentEntity}
                  onChange={(e) => handleFilterChange('investmentEntity', e.target.value)}
                  className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 h-8"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default ProjectSearch;
