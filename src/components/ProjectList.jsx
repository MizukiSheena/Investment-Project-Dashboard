import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, FileText, Building2, DollarSign, Calendar, Target, Clock, Scale, Users, Eye, UserCheck, Percent } from 'lucide-react';
import DocumentViewer from '@/components/DocumentViewer';
import ExportButton from '@/components/ExportButton';

const ProjectList = ({ projects, onEdit, onDelete }) => {
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

  const getCardStyle = (index) => {
    const styles = [
      'bg-white border-gray-200',
      'bg-slate-50 border-slate-200',
      'bg-gray-50 border-gray-200'
    ];
    return styles[index % styles.length];
  };

  const formatCurrency = (amount, currency) => {
    if (!amount) return '-';
    return `${amount} ${currency === 'CNY' ? '人民币' : '美元'}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('zh-CN');
  };

  const formatLawyerFeePayment = (payment, companyPayment, fundPayment, currency) => {
    if (!payment) return '-';
    if (payment === '混合方式') {
      const companyCurrency = currency === 'CNY' ? '人民币' : '美元';
      const fundCurrency = currency === 'CNY' ? '人民币' : '美元';
      return `混合方式 (公司: ${companyPayment || 0} ${companyCurrency}, 基金: ${fundPayment || 0} ${fundCurrency})`;
    }
    return payment;
  };

  const renderInvestmentRounds = (rounds) => {
    if (!rounds || rounds.length === 0) return null;

    return (
      <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <DollarSign className="h-4 w-4 text-gray-500" />
          <h4 className="font-medium text-gray-800">投资轮次信息</h4>
        </div>
        <div className="space-y-3">
          {rounds.map((round, index) => (
            <div key={round.id || index} className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-gray-600 font-medium">轮次：</span>
                  <p className="text-gray-800 font-semibold">{round.round || '-'}</p>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">金额：</span>
                  <p className="text-gray-800 font-semibold">{formatCurrency(round.amount, round.currency)}</p>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">交割日期：</span>
                  <p className="text-gray-800 font-semibold">{formatDate(round.deliveryDate)}</p>
                </div>
                <div>
                  <span className="text-gray-600 font-medium flex items-center gap-1">
                    <Percent className="h-3 w-3" />
                    持股比例：
                  </span>
                  <p className="text-gray-800 font-semibold">
                    {round.shareholdingRatio ? `${round.shareholdingRatio}%` : '-'}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600 font-medium flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    董事：
                  </span>
                  <p className={`font-semibold ${round.hasDirector === '是' ? 'text-green-700' : 'text-gray-800'}`}>
                    {round.hasDirector || '-'}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600 font-medium flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    观察员：
                  </span>
                  <p className={`font-semibold ${round.hasObserver === '是' ? 'text-green-700' : 'text-gray-800'}`}>
                    {round.hasObserver || '-'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (projects.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <FileText className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">暂无匹配的项目</h3>
        <p className="text-gray-500 text-lg">尝试调整搜索条件或点击"新增项目"按钮开始添加您的第一个投资项目</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <Card key={project.id} className={`hover:shadow-lg transition-all duration-200 ${getCardStyle(index)} border`}>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold text-gray-800 mb-3">{project.name}</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge className={`${getDepartmentColor(project.department)} border font-medium px-2 py-1 text-xs`}>
                    <Building2 className="h-3 w-3 mr-1" />
                    {project.department}
                  </Badge>
                  <Badge className={`${getStatusColor(project.status)} border font-medium px-2 py-1 text-xs`}>
                    <Target className="h-3 w-3 mr-1" />
                    {project.status}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-1 ml-2">
                <ExportButton 
                  project={project}
                  variant="ghost"
                  size="sm"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(project)}
                  className="hover:bg-gray-100 hover:text-gray-700 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(project.id)}
                  className="hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600 font-medium">投资主体</span>
                </div>
                <p className="font-semibold text-gray-800">{project.investmentEntity || '-'}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600 font-medium">目前轮次</span>
                </div>
                <p className="font-semibold text-gray-800">{project.currentRound || '-'}</p>
              </div>

              {/* 显示投资轮次信息 */}
              {renderInvestmentRounds(project.investmentRounds)}

              {/* 兼容旧数据格式 */}
              {!project.investmentRounds && (project.amount || project.deliveryDate) && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600 font-medium text-xs">投资金额</span>
                    </div>
                    <p className="font-semibold text-gray-800 text-sm">{formatCurrency(project.amount, project.currency)}</p>
                  </div>
                  {project.deliveryDate && (
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600 font-medium text-xs">交割日期</span>
                      </div>
                      <p className="font-semibold text-gray-800 text-sm">{formatDate(project.deliveryDate)}</p>
                    </div>
                  )}
                </div>
              )}

              {(project.lawyer || project.lawyerFee || project.lawyerFeePayment) && (
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Scale className="h-4 w-4 text-gray-500" />
                    <h4 className="font-medium text-gray-800">律师信息</h4>
                  </div>
                  <div className="space-y-2 text-xs">
                    {project.lawyer && (
                      <div>
                        <span className="text-gray-600">律师：</span>
                        <span className="font-semibold text-gray-800">{project.lawyer}</span>
                      </div>
                    )}
                    {project.lawyerFee && (
                      <div>
                        <span className="text-gray-600">律师费：</span>
                        <span className="font-semibold text-gray-800">{formatCurrency(project.lawyerFee, project.lawyerFeeCurrency)}</span>
                      </div>
                    )}
                    {project.lawyerFeePayment && (
                      <div>
                        <span className="text-gray-600">承担方式：</span>
                        <span className="font-semibold text-gray-800">
                          {formatLawyerFeePayment(project.lawyerFeePayment, project.companyPayment, project.fundPayment, project.lawyerFeeCurrency)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {project.status === '新项目' && (
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <h4 className="font-medium text-gray-800">项目时间线</h4>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white rounded p-2 border border-gray-200">
                    <span className="text-gray-600 font-medium">Pre-IC:</span>
                    <p className="text-gray-800 font-semibold">{formatDate(project.preICDate)}</p>
                  </div>
                  <div className="bg-white rounded p-2 border border-gray-200">
                    <span className="text-gray-600 font-medium">IC立项:</span>
                    <p className="text-gray-800 font-semibold">{formatDate(project.icApprovalDate)}</p>
                  </div>
                  <div className="bg-white rounded p-2 border border-gray-200">
                    <span className="text-gray-600 font-medium">尽调汇报:</span>
                    <p className="text-gray-800 font-semibold">{formatDate(project.dueDiligenceDate)}</p>
                  </div>
                  <div className="bg-white rounded p-2 border border-gray-200">
                    <span className="text-gray-600 font-medium">IC邮件:</span>
                    <p className="text-gray-800 font-semibold">{formatDate(project.icEmailDate)}</p>
                  </div>
                </div>
              </div>
            )}

            {project.documents && project.documents.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <h4 className="font-medium text-gray-800">交易文件</h4>
                </div>
                <DocumentViewer documents={project.documents} />
              </div>
            )}

            {project.remarks && (
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <span className="text-gray-600 font-medium text-sm flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  备注
                </span>
                <p className="text-sm text-gray-700 leading-relaxed">{project.remarks}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProjectList;
