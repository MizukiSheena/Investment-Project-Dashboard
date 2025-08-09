import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, FileText } from 'lucide-react';

const DocumentUpload = ({ documents = [], onDocumentsChange }) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (files) => {
    setUploading(true);
    const fileArray = Array.from(files);
    
    try {
      const newDocuments = await Promise.all(
        fileArray.map(async (file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
              const content = e.target.result;
              resolve({
                id: Date.now() + Math.random(),
                name: file.name,
                content: content,
                uploadDate: new Date().toISOString(),
                size: file.size,
                type: file.type
              });
            };
            
            reader.onerror = () => {
              reject(new Error(`读取文件 ${file.name} 失败`));
            };
            
            // 读取文件内容为文本
            reader.readAsText(file, 'UTF-8');
          });
        })
      );

      onDocumentsChange([...documents, ...newDocuments]);
    } catch (error) {
      console.error('文件上传失败:', error);
      alert('文件上传失败，请重试');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const removeDocument = (id) => {
    onDocumentsChange(documents.filter(doc => doc.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-600 mb-2">
          {uploading ? '正在上传文件...' : '拖拽文件到此处或点击上传'}
        </p>
        <p className="text-xs text-gray-500 mb-3">
          支持 .md, .txt, .doc, .docx 格式文件
        </p>
        <Input
          type="file"
          multiple
          accept=".md,.txt,.doc,.docx"
          onChange={(e) => handleFileUpload(e.target.files)}
          className="hidden"
          id="file-upload"
          disabled={uploading}
        />
        <Label htmlFor="file-upload">
          <Button 
            variant="outline" 
            className="cursor-pointer" 
            asChild
            disabled={uploading}
          >
            <span>{uploading ? '上传中...' : '选择文件'}</span>
          </Button>
        </Label>
      </div>

      {documents.length > 0 && (
        <div className="space-y-2">
          <Label>已上传文件 ({documents.length})</Label>
          {documents.map((doc) => (
            <Card key={doc.id} className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <FileText className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium truncate">{doc.name}</span>
                      {doc.size && (
                        <span className="text-xs text-gray-500 flex-shrink-0">
                          ({formatFileSize(doc.size)})
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>
                        {new Date(doc.uploadDate).toLocaleDateString('zh-CN')}
                      </span>
                      <span>•</span>
                      <span>
                        {doc.content ? `${doc.content.length} 字符` : '内容为空'}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDocument(doc.id)}
                  className="flex-shrink-0 ml-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
