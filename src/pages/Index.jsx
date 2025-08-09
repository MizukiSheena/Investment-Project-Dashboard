import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectForm from '@/components/ProjectForm';
import ProjectList from '@/components/ProjectList';
import ProjectSearch from '@/components/ProjectSearch';
import ProjectSort from '@/components/ProjectSort';
import ProjectSelection from '@/components/ProjectSelection';
import ExportButton from '@/components/ExportButton';
import { useProjects } from '@/hooks/useProjects';
import { useProjectSort } from '@/hooks/useProjectSort';

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    keyword: '',
    department: '',
    investmentEntity: ''
  });
  const { projects, addProject, updateProject, deleteProject } = useProjects();

  const handleAddProject = (projectData) => {
    addProject(projectData);
    setShowForm(false);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleUpdateProject = (projectData) => {
    updateProject(editingProject.id, projectData);
    setEditingProject(null);
    setShowForm(false);
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setShowForm(false);
  };

  const handleSelectAll = () => {
    setSelectedProjects([...filteredProjects]);
  };

  const handleClearAll = () => {
    setSelectedProjects([]);
  };

  const filteredProjects = projects.filter(project => {
    const matchesKeyword = !searchFilters.keyword || 
      project.name.toLowerCase().includes(searchFilters.keyword.toLowerCase());
    
    const matchesDepartment = !searchFilters.department || 
      project.department === searchFilters.department;
    
    const matchesInvestmentEntity = !searchFilters.investmentEntity || 
      project.investmentEntity.toLowerCase().includes(searchFilters.investmentEntity.toLowerCase());

    return matchesKeyword && matchesDepartment && matchesInvestmentEntity;
  });

  const { sortedProjects, sortConfig, setSortConfig } = useProjectSort(filteredProjects);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              投资交易项目管理面板
            </h1>
            <p className="text-gray-600 mt-2 text-lg">记录和跟踪投资项目的进展和基本信息</p>
          </div>
          <div className="flex items-center gap-3">
            <ExportButton 
              projects={sortedProjects}
              selectedProjects={selectedProjects}
              variant="outline"
              size="default"
            />
            <Button 
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white shadow-sm hover:shadow-md transition-all duration-200"
            >
              <Plus className="h-4 w-4" />
              新增项目
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <ProjectSearch 
            filters={searchFilters}
            onFiltersChange={setSearchFilters}
          />
        </div>

        <div className="mb-6">
          <ProjectSelection
            projects={sortedProjects}
            selectedProjects={selectedProjects}
            onSelectionChange={setSelectedProjects}
            onSelectAll={handleSelectAll}
            onClearAll={handleClearAll}
          />
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            共找到 <span className="font-semibold text-gray-800">{sortedProjects.length}</span> 个项目
            {selectedProjects.length > 0 && (
              <span className="ml-2 text-blue-600">
                (已选择 <span className="font-semibold">{selectedProjects.length}</span> 个)
              </span>
            )}
          </div>
          <ProjectSort 
            sortConfig={sortConfig}
            onSortChange={setSortConfig}
          />
        </div>

        {showForm && (
          <div className="mb-8">
            <ProjectForm
              project={editingProject}
              onSubmit={editingProject ? handleUpdateProject : handleAddProject}
              onCancel={handleCancelEdit}
            />
          </div>
        )}

        <ProjectList
          projects={sortedProjects}
          onEdit={handleEditProject}
          onDelete={deleteProject}
        />
      </div>
    </div>
  );
};

export default Index;
