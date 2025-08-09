import { useState, useMemo } from 'react';

export const useProjectSort = (projects) => {
  const [sortConfig, setSortConfig] = useState({
    field: 'name',
    direction: 'asc'
  });

  const sortedProjects = useMemo(() => {
    if (!projects || projects.length === 0) return [];

    return [...projects].sort((a, b) => {
      let aValue = a[sortConfig.field];
      let bValue = b[sortConfig.field];

      // 处理不同字段的排序逻辑
      switch (sortConfig.field) {
        case 'name':
          aValue = (aValue || '').toLowerCase();
          bValue = (bValue || '').toLowerCase();
          break;
        case 'amount':
          aValue = parseFloat(aValue) || 0;
          bValue = parseFloat(bValue) || 0;
          break;
        case 'deliveryDate':
          aValue = aValue ? new Date(aValue).getTime() : 0;
          bValue = bValue ? new Date(bValue).getTime() : 0;
          break;
        default:
          aValue = (aValue || '').toString().toLowerCase();
          bValue = (bValue || '').toString().toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [projects, sortConfig]);

  return {
    sortedProjects,
    sortConfig,
    setSortConfig
  };
};
