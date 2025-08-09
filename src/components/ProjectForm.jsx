import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Upload, X, Building2, DollarSign, Calendar, FileText, Scale } from 'lucide-react';
import DocumentUpload from '@/components/DocumentUpload';
import InvestmentRoundForm from '@/components/InvestmentRoundForm';

const ProjectForm = ({ project, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    status: '',
    investmentEntity: '',
    investmentRounds: [],
    currentRound: '',
    lawyer: '',
    lawyerFee: '',
    lawyerFeeCurrency: 'CNY',
    lawyerFeePayment: '',
    companyPayment: '',
    fundPayment: '',
    remarks: '',
    preICDate: '',
    icApprovalDate: '',
    dueDiligenceDate: '',
    icEmailDate: '',
    documents: []
  });

  const [showNewProjectDetails, setShowNewProjectDetails] = useState(false);

  useEffect(() => {
    if (project) {
      // 兼容旧数据格式
      const updatedProject = { ...project };
      if (!updatedProject.investmentRounds && (updatedProject.amount || updatedProject.deliveryDate)) {
        updatedProject.investmentRounds = [{
          id: Date.now(),
          round: updatedProject.currentRound || '',
          amount: updatedProject.amount || '',
          currency: updatedProject.currency || 'CNY',
          deliveryDate: updatedProject.deliveryDate || '',
          shareholdingRatio: '',
          hasDirector: '',
          hasObserver: ''
        }];
      }
      setFormData(updatedProject);
      setShowNewProjectDetails(updatedProject.status === '新项目');
    }
  }, [project]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'status') {
      setShowNewProjectDetails(value === '新项目');
    }
  };

  const handleInvestmentRoundsChange = (rounds) => {
    setFormData(prev => ({
      ...prev,
      investmentRounds: rounds
    }));
  };

  const handleDocumentUpload = (documents) => {
    setFormData(prev => ({
      ...prev,
      documents
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: project?.id || Date.now()
    });
  };

  return (
    <Card className="w-full shadow-lg border border-gray-200 bg-white">
      <CardHeader className="bg-gray-50 border-b border-gray-200">
        <CardTitle className="text-xl font-semibold flex items-center gap-2 text-gray-800">
          <Building2 className="h-5 w-5 text-gray-600" />
          {project ? '编辑项目' : '新增项目'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-medium flex items-center gap-2">
                <Building2 className="h-4 w-4 text-gray-500" />
                项目名称
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department" className="text-gray-700 font-medium flex items-center gap-2">
                <Building2 className="h-4 w-4 text-gray-500" />
                所属部门
              </Label>
              <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                <SelectTrigger className="border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                  <SelectValue placeholder="选择部门" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="龙珠">龙珠</SelectItem>
                  <SelectItem value="战投">战投</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-gray-700 font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                项目状态
              </Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger className="border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="新项目">新项目</SelectItem>
                  <SelectItem value="投后项目">投后项目</SelectItem>
                  <SelectItem value="其他">其他</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="investmentEntity" className="text-gray-700 font-medium flex items-center gap-2">
                <Building2 className="h-4 w-4 text-gray-500" />
                投资主体
              </Label>
              <Input
                id="investmentEntity"
                value={formData.investmentEntity}
                onChange={(e) => handleInputChange('investmentEntity', e.target.value)}
                className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentRound" className="text-gray-700 font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                目前轮次
              </Label>
              <Input
                id="currentRound"
                value={formData.currentRound}
                onChange={(e) => handleInputChange('currentRound', e.target.value)}
                className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lawyer" className="text-gray-700 font-medium flex items-center gap-2">
                <Scale className="h-4 w-4 text-gray-500" />
                律师
              </Label>
              <Input
                id="lawyer"
                value={formData.lawyer}
                onChange={(e) => handleInputChange('lawyer', e.target.value)}
                className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lawyerFee" className="text-gray-700 font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                律师费
              </Label>
              <div className="flex gap-2">
                <Input
                  id="lawyerFee"
                  type="number"
                  value={formData.lawyerFee}
                  onChange={(e) => handleInputChange('lawyerFee', e.target.value)}
                  className="flex-1 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                />
                <Select value={formData.lawyerFeeCurrency} onValueChange={(value) => handleInputChange('lawyerFeeCurrency', value)}>
                  <SelectTrigger className="w-32 border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CNY">人民币</SelectItem>
                    <SelectItem value="USD">美元</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lawyerFeePayment" className="text-gray-700 font-medium flex items-center gap-2">
                <Scale className="h-4 w-4 text-gray-500" />
                律师费承担方式
              </Label>
              <Select value={formData.lawyerFeePayment} onValueChange={(value) => handleInputChange('lawyerFeePayment', value)}>
                <SelectTrigger className="border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                  <SelectValue placeholder="选择承担方式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="公司报销">公司报销</SelectItem>
                  <SelectItem value="基金自己承担">基金自己承担</SelectItem>
                  <SelectItem value="混合方式">混合方式</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {formData.lawyerFeePayment === '混合方式' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="space-y-2">
                <Label htmlFor="companyPayment" className="text-gray-700 font-medium">
                  公司承担金额
                </Label>
                <Input
                  id="companyPayment"
                  type="number"
                  value={formData.companyPayment}
                  onChange={(e) => handleInputChange('companyPayment', e.target.value)}
                  className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fundPayment" className="text-gray-700 font-medium">
                  基金承担金额
                </Label>
                <Input
                  id="fundPayment"
                  type="number"
                  value={formData.fundPayment}
                  onChange={(e) => handleInputChange('fundPayment', e.target.value)}
                  className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 pt-6">
            <InvestmentRoundForm
              rounds={formData.investmentRounds || []}
              onRoundsChange={handleInvestmentRoundsChange}
            />
          </div>

          {showNewProjectDetails && (
            <Collapsible open={showNewProjectDetails}>
              <CollapsibleContent className="space-y-4">
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-600" />
                    新项目详细信息
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="preICDate" className="text-gray-700 font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        Pre-IC时间
                      </Label>
                      <Input
                        id="preICDate"
                        type="date"
                        value={formData.preICDate}
                        onChange={(e) => handleInputChange('preICDate', e.target.value)}
                        className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="icApprovalDate" className="text-gray-700 font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        IC立项通过日
                      </Label>
                      <Input
                        id="icApprovalDate"
                        type="date"
                        value={formData.icApprovalDate}
                        onChange={(e) => handleInputChange('icApprovalDate', e.target.value)}
                        className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dueDiligenceDate" className="text-gray-700 font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        尽调和条款汇报日
                      </Label>
                      <Input
                        id="dueDiligenceDate"
                        type="date"
                        value={formData.dueDiligenceDate}
                        onChange={(e) => handleInputChange('dueDiligenceDate', e.target.value)}
                        className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="icEmailDate" className="text-gray-700 font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        IC邮件报备日
                      </Label>
                      <Input
                        id="icEmailDate"
                        type="date"
                        value={formData.icEmailDate}
                        onChange={(e) => handleInputChange('icEmailDate', e.target.value)}
                        className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                      />
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          <div className="space-y-2">
            <Label className="text-gray-700 font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-500" />
              交易文件核心条款
            </Label>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-2">
                  上传相关的交易文件，支持 Markdown (.md)、文本 (.txt) 和 Word 文档 (.doc, .docx) 格式
                </p>
                <p className="text-xs text-gray-500">
                  已上传 {formData.documents.length} 个文件
                </p>
              </div>
              <DocumentUpload
                documents={formData.documents}
                onDocumentsChange={handleDocumentUpload}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="remarks" className="text-gray-700 font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-500" />
              备注
            </Label>
            <Textarea
              id="remarks"
              value={formData.remarks}
              onChange={(e) => handleInputChange('remarks', e.target.value)}
              rows={4}
              className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              placeholder="请输入项目相关的备注信息..."
            />
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="px-6 py-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 font-medium"
            >
              取消
            </Button>
            <Button 
              type="submit"
              className="px-6 py-2 bg-gray-800 hover:bg-gray-900 text-white font-medium"
            >
              {project ? '更新' : '保存'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;
