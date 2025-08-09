import { useState, useEffect } from 'react';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  // 从localStorage加载数据
  useEffect(() => {
    const savedProjects = localStorage.getItem('investment-projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  // 保存数据到localStorage
  useEffect(() => {
    localStorage.setItem('investment-projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (project) => {
    setProjects(prev => [...prev, { ...project, id: Date.now() }]);
  };

  const updateProject = (id, updatedProject) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === id ? { ...updatedProject, id } : project
      )
    );
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  return {
    projects,
    addProject,
    updateProject,
    deleteProject
  };
};
