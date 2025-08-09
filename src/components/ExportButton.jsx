import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Download, FileText, FileJson, FileSpreadsheet, ChevronDown } from 'lucide-react';
import { useExport } from '@/hooks/useExport';

const ExportButton = ({ project, projects, selectedProjects = [], variant = "outline", size = "sm" }) => {
  const [isExporting, setIsExporting] = useState(false);
  const { exportSingleProject, exportMultipleProjects, exportAsJSON, exportAsCSV } = useExport();

  const handleExport = async (exportType, format) => {
    setIsExporting(true);
    
    try {
      switch (exportType) {
        case 'single':
          if (format === 'txt') {
            exportSingleProject(project);
          } else if (format === 'json') {
            exportAsJSON([project], `${project.name || '项目'}_详细信息`);
          }
          break;
          
        case 'selected':
          if (selectedProjects.length === 0) {
            alert('请先选择要导出的项目');
            return;
          }
          if (format === 'txt') {
            exportMultipleProjects(selectedProjects, '选中项目导出');
          } else if (format === 'json') {
            exportAsJSON(selectedProjects, '选中项目数据');
          } else if (format === 'csv') {
            exportAsCSV(selectedProjects, '选中项目数据');
          }
          break;
          
        case 'all':
          if (projects.length === 0) {
            alert('没有可导出的项目');
            return;
          }
          if (format === 'txt') {
            exportMultipleProjects(projects, '全部项目导出');
          } else if (format === 'json') {
            exportAsJSON(projects, '全部项目数据');
          } else if (format === 'csv') {
            exportAsCSV(projects, '全部项目数据');
          }
          break;
      }
    } catch (error) {
      console.error('导出失败:', error);
      alert('导出失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  // 单个项目导出按钮
  if (project) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant={variant} 
            size={size}
            disabled={isExporting}
            className="flex items-center gap-1"
          >
            <Download className="h-3 w-3" />
            {isExporting ? '导出中...' : '导出'}
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => handleExport('single', 'txt')}>
            <FileText className="h-4 w-4 mr-2" />
            导出为文本文件
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport('single', 'json')}>
            <FileJson className="h-4 w-4 mr-2" />
            导出为JSON文件
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // 批量导出按钮
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant} 
          size={size}
          disabled={isExporting}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          {isExporting ? '导出中...' : '批量导出'}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {selectedProjects && selectedProjects.length > 0 && (
          <>
            <div className="px-2 py-1.5 text-xs font-medium text-gray-500">
              选中项目 ({selectedProjects.length}个)
            </div>
            <DropdownMenuItem onClick={() => handleExport('selected', 'txt')}>
              <FileText className="h-4 w-4 mr-2" />
              导出选中项目 (TXT)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('selected', 'json')}>
              <FileJson className="h-4 w-4 mr-2" />
              导出选中项目 (JSON)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('selected', 'csv')}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              导出选中项目 (CSV)
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        
        <div className="px-2 py-1.5 text-xs font-medium text-gray-500">
          全部项目 ({projects?.length || 0}个)
        </div>
        <DropdownMenuItem onClick={() => handleExport('all', 'txt')}>
          <FileText className="h-4 w-4 mr-2" />
          导出全部项目 (TXT)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('all', 'json')}>
          <FileJson className="h-4 w-4 mr-2" />
          导出全部项目 (JSON)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('all', 'csv')}>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          导出全部项目 (CSV)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportButton;
