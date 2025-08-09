import { saveAs } from 'file-saver';

export const useExport = () => {
  const formatProjectData = (project) => {
    const formatDate = (dateString) => {
      if (!dateString) return '';
      return new Date(dateString).toLocaleDateString('zh-CN');
    };

    const formatCurrency = (amount, currency) => {
      if (!amount) return '';
      return `${amount} ${currency === 'CNY' ? '人民币' : '美元'}`;
    };

    const formatInvestmentRounds = (rounds) => {
      if (!rounds || rounds.length === 0) return '';
      
      return rounds.map((round, index) => {
        return `第${index + 1}轮投资：
  - 投资轮次：${round.round || ''}
  - 投资金额：${formatCurrency(round.amount, round.currency)}
  - 交割日期：${formatDate(round.deliveryDate)}
  - 持股比例：${round.shareholdingRatio ? `${round.shareholdingRatio}%` : ''}
  - 是否有董事：${round.hasDirector || ''}
  - 是否有观察员：${round.hasObserver || ''}`;
      }).join('\n\n');
    };

    const formatDocuments = (documents) => {
      if (!documents || documents.length === 0) return '';
      
      return documents.map((doc, index) => {
        return `文档${index + 1}：${doc.name}
上传时间：${formatDate(doc.uploadDate)}
文件大小：${doc.size ? formatFileSize(doc.size) : ''}
内容预览：${doc.content ? doc.content.substring(0, 200) + (doc.content.length > 200 ? '...' : '') : '无内容'}`;
      }).join('\n\n');
    };

    const formatFileSize = (bytes) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatLawyerFeePayment = (payment, companyPayment, fundPayment, currency) => {
      if (!payment) return '';
      if (payment === '混合方式') {
        const companyCurrency = currency === 'CNY' ? '人民币' : '美元';
        const fundCurrency = currency === 'CNY' ? '人民币' : '美元';
        return `混合方式 (公司: ${companyPayment || 0} ${companyCurrency}, 基金: ${fundPayment || 0} ${fundCurrency})`;
      }
      return payment;
    };

    let content = `项目名称：${project.name || ''}
所属部门：${project.department || ''}
项目状态：${project.status || ''}
投资主体：${project.investmentEntity || ''}
目前轮次：${project.currentRound || ''}

律师信息：
- 律师：${project.lawyer || ''}
- 律师费：${formatCurrency(project.lawyerFee, project.lawyerFeeCurrency)}
- 律师费承担方式：${formatLawyerFeePayment(project.lawyerFeePayment, project.companyPayment, project.fundPayment, project.lawyerFeeCurrency)}

投资轮次信息：
${formatInvestmentRounds(project.investmentRounds)}`;

    // 兼容旧数据格式
    if (!project.investmentRounds && (project.amount || project.deliveryDate)) {
      content += `\n\n历史投资信息（兼容旧格式）：
- 投资金额：${formatCurrency(project.amount, project.currency)}
- 交割日期：${formatDate(project.deliveryDate)}`;
    }

    // 新项目详细信息
    if (project.status === '新项目') {
      content += `\n\n新项目时间线：
- Pre-IC时间：${formatDate(project.preICDate)}
- IC立项通过日：${formatDate(project.icApprovalDate)}
- 尽调和条款汇报日：${formatDate(project.dueDiligenceDate)}
- IC邮件报备日：${formatDate(project.icEmailDate)}`;
    }

    // 交易文件
    if (project.documents && project.documents.length > 0) {
      content += `\n\n交易文件核心条款：
${formatDocuments(project.documents)}`;
    }

    // 备注
    if (project.remarks) {
      content += `\n\n备注：
${project.remarks}`;
    }

    content += `\n\n导出时间：${new Date().toLocaleString('zh-CN')}`;

    return content;
  };

  const exportSingleProject = (project) => {
    const content = formatProjectData(project);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const fileName = `${project.name || '未命名项目'}_${new Date().toISOString().split('T')[0]}.txt`;
    saveAs(blob, fileName);
  };

  const exportMultipleProjects = (projects, fileName = '投资项目导出') => {
    if (!projects || projects.length === 0) {
      alert('没有可导出的项目');
      return;
    }

    let content = `投资交易项目管理系统 - 批量导出报告
导出时间：${new Date().toLocaleString('zh-CN')}
导出项目数量：${projects.length}个

${'='.repeat(80)}

`;

    projects.forEach((project, index) => {
      content += `项目 ${index + 1}/${projects.length}
${'='.repeat(50)}

${formatProjectData(project)}

${'='.repeat(80)}

`;
    });

    // 添加统计信息
    const stats = generateStatistics(projects);
    content += `统计信息
${'='.repeat(50)}

${stats}`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const exportFileName = `${fileName}_${new Date().toISOString().split('T')[0]}.txt`;
    saveAs(blob, exportFileName);
  };

  const exportAsJSON = (projects, fileName = '投资项目数据') => {
    if (!projects || projects.length === 0) {
      alert('没有可导出的项目');
      return;
    }

    const exportData = {
      exportTime: new Date().toISOString(),
      projectCount: projects.length,
      projects: projects.map(project => ({
        ...project,
        exportNote: '此数据由投资交易项目管理系统导出'
      }))
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: 'application/json;charset=utf-8' 
    });
    const exportFileName = `${fileName}_${new Date().toISOString().split('T')[0]}.json`;
    saveAs(blob, exportFileName);
  };

  const exportAsCSV = (projects, fileName = '投资项目数据') => {
    if (!projects || projects.length === 0) {
      alert('没有可导出的项目');
      return;
    }

    const headers = [
      '项目名称',
      '所属部门',
      '项目状态',
      '投资主体',
      '目前轮次',
      '律师',
      '律师费',
      '律师费币种',
      '律师费承担方式',
      '投资轮次数量',
      '总投资金额',
      '最新交割日期',
      '备注',
      '导出时间'
    ];

    const csvContent = [
      headers.join(','),
      ...projects.map(project => {
        const totalAmount = project.investmentRounds?.reduce((sum, round) => {
          return sum + (parseFloat(round.amount) || 0);
        }, 0) || parseFloat(project.amount) || 0;

        const latestDeliveryDate = project.investmentRounds?.reduce((latest, round) => {
          if (!round.deliveryDate) return latest;
          if (!latest) return round.deliveryDate;
          return new Date(round.deliveryDate) > new Date(latest) ? round.deliveryDate : latest;
        }, null) || project.deliveryDate || '';

        return [
          `"${project.name || ''}"`,
          `"${project.department || ''}"`,
          `"${project.status || ''}"`,
          `"${project.investmentEntity || ''}"`,
          `"${project.currentRound || ''}"`,
          `"${project.lawyer || ''}"`,
          `"${project.lawyerFee || ''}"`,
          `"${project.lawyerFeeCurrency || ''}"`,
          `"${project.lawyerFeePayment || ''}"`,
          `"${project.investmentRounds?.length || 0}"`,
          `"${totalAmount}"`,
          `"${latestDeliveryDate ? new Date(latestDeliveryDate).toLocaleDateString('zh-CN') : ''}"`,
          `"${(project.remarks || '').replace(/"/g, '""')}"`,
          `"${new Date().toLocaleString('zh-CN')}"`
        ].join(',');
      })
    ].join('\n');

    // 添加BOM以支持中文
    const blob = new Blob(['\ufeff' + csvContent], { 
      type: 'text/csv;charset=utf-8' 
    });
    const exportFileName = `${fileName}_${new Date().toISOString().split('T')[0]}.csv`;
    saveAs(blob, exportFileName);
  };

  const generateStatistics = (projects) => {
    const totalProjects = projects.length;
    const departmentStats = {};
    const statusStats = {};
    let totalInvestment = 0;
    let totalLawyerFees = 0;

    projects.forEach(project => {
      // 部门统计
      if (project.department) {
        departmentStats[project.department] = (departmentStats[project.department] || 0) + 1;
      }

      // 状态统计
      if (project.status) {
        statusStats[project.status] = (statusStats[project.status] || 0) + 1;
      }

      // 投资金额统计
      if (project.investmentRounds && project.investmentRounds.length > 0) {
        project.investmentRounds.forEach(round => {
          if (round.amount) {
            totalInvestment += parseFloat(round.amount) || 0;
          }
        });
      } else if (project.amount) {
        totalInvestment += parseFloat(project.amount) || 0;
      }

      // 律师费统计
      if (project.lawyerFee) {
        totalLawyerFees += parseFloat(project.lawyerFee) || 0;
      }
    });

    let stats = `总项目数：${totalProjects}个\n\n`;

    stats += `部门分布：\n`;
    Object.entries(departmentStats).forEach(([dept, count]) => {
      stats += `- ${dept}：${count}个 (${(count/totalProjects*100).toFixed(1)}%)\n`;
    });

    stats += `\n项目状态分布：\n`;
    Object.entries(statusStats).forEach(([status, count]) => {
      stats += `- ${status}：${count}个 (${(count/totalProjects*100).toFixed(1)}%)\n`;
    });

    stats += `\n财务统计：\n`;
    stats += `- 总投资金额：${totalInvestment.toLocaleString()} (注：不同币种未换算)\n`;
    stats += `- 总律师费：${totalLawyerFees.toLocaleString()} (注：不同币种未换算)\n`;

    return stats;
  };

  return {
    exportSingleProject,
    exportMultipleProjects,
    exportAsJSON,
    exportAsCSV,
    generateStatistics
  };
};
