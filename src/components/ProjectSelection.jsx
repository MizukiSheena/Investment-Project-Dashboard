import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, Square, Building2, Target } from 'lucide-react';

const ProjectSelection = ({ projects, selectedProjects, onSelectionChange, onSelectAll, onClearAll }) => {
  const [showSelection, setShowSelection] = useState(false);

  const isProjectSelected = (projectId) => {
    return selectedProjects.some(p => p.id === projectId);
  };

  const handleProjectToggle = (project) => {
    if (isProjectSelected(project.id)) {
      onSelectionChange(selectedProjects.filter(p => p.id !== project.id));
    } else {
      onSelectionChange([...selectedProjects, project]);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case '新项目':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case '投后项目':
        return 'bg-green-50 text-green-700 border-green-200';
      case '其他':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getDepartmentColor = (department) => {
    switch (department) {
      case '1':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case '2':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  if (!showSelection) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowSelection(true)}
        className="flex items-center gap-2"
      >
        <CheckSquare className="h-4 w-4" />
        选择项目
      </Button>
    );
  }

  return (
    <Card className="mb-6 border border-gray-200 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-gray-600" />
            项目选择
            {selectedProjects.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                已选择 {selectedProjects.length} 个
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onSelectAll}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              全选
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="text-gray-600 hover:text-gray-700 hover:bg-gray-50"
            >
              清空
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSelection(false)}
              className="text-gray-600 hover:text-gray-700 hover:bg-gray-50"
            >
              收起
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {projects.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            <Square className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm">暂无可选择的项目</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 ${
                  isProjectSelected(project.id)
                    ? 'border-blue-500 bg-blue-50 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
                onClick={() => handleProjectToggle(project)}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={isProjectSelected(project.id)}
                    onChange={() => handleProjectToggle(project)}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm truncate mb-2">
                      {project.name}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      <Badge className={`${getDepartmentColor(project.department)} border text-xs px-1.5 py-0.5`}>
                        <Building2 className="h-2.5 w-2.5 mr-1" />
                        {project.department}
                      </Badge>
                      <Badge className={`${getStatusColor(project.status)} border text-xs px-1.5 py-0.5`}>
                        <Target className="h-2.5 w-2.5 mr-1" />
                        {project.status}
                      </Badge>
                    </div>
                    {project.investmentEntity && (
                      <p className="text-xs text-gray-600 mt-1 truncate">
                        {project.investmentEntity}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectSelection;
