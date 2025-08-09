import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Eye, AlertCircle, Search, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const DocumentViewer = ({ documents }) => {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const truncateContent = (content, maxLines = 3) => {
    if (!content || content.trim() === '') {
      return '文件内容为空';
    }
    
    const lines = content.split('\n');
    if (lines.length <= maxLines) return content;
    return lines.slice(0, maxLines).join('\n') + '\n...';
  };

  const getFileExtension = (filename) => {
    return filename.split('.').pop()?.toLowerCase() || '';
  };

  const isMarkdownFile = (filename) => {
    const ext = getFileExtension(filename);
    return ext === 'md' || ext === 'markdown';
  };

  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm || !text) return text;
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
  };

  const filterContent = (content, searchTerm) => {
    if (!searchTerm || !content) return content;
    
    const lines = content.split('\n');
    const filteredLines = lines.filter(line => 
      line.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (filteredLines.length === 0) {
      return `未找到包含 "${searchTerm}" 的内容`;
    }
    
    return filteredLines.join('\n');
  };

  const renderContent = (content, isPreview = false, searchTerm = '') => {
    if (!content || content.trim() === '') {
      return (
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>文件内容为空或无法读取</span>
        </div>
      );
    }

    let displayContent = isPreview ? truncateContent(content) : content;
    
    if (searchTerm && !isPreview) {
      displayContent = filterContent(displayContent, searchTerm);
    }
    
    return (
      <div className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-h1:text-2xl prose-h1:font-bold prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-2 prose-h1:mb-4 prose-h2:text-xl prose-h2:font-semibold prose-h2:text-gray-800 prose-h2:mt-6 prose-h2:mb-3 prose-h3:text-lg prose-h3:font-medium prose-h3:text-gray-700 prose-h3:mt-4 prose-h3:mb-2 prose-h4:text-base prose-h4:font-medium prose-h4:text-gray-600 prose-h4:mt-3 prose-h4:mb-2 prose-h5:text-sm prose-h5:font-medium prose-h5:text-gray-600 prose-h5:mt-2 prose-h5:mb-1 prose-h6:text-sm prose-h6:font-normal prose-h6:text-gray-500 prose-h6:mt-2 prose-h6:mb-1 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700 prose-blockquote:border-l-4 prose-blockquote:border-blue-200 prose-blockquote:bg-blue-50 prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:text-blue-800 prose-code:bg-gray-100 prose-code:text-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-100 prose-pre:border prose-pre:border-gray-200">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-300 pb-3 mb-6 mt-8 first:mt-0">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 pb-2 border-b border-gray-200">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3 bg-gray-50 px-3 py-2 rounded-md border-l-4 border-blue-400">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-base font-medium text-gray-600 mt-5 mb-2 pl-3 border-l-2 border-gray-300">
                {children}
              </h4>
            ),
            h5: ({ children }) => (
              <h5 className="text-sm font-medium text-gray-600 mt-4 mb-2 bg-gray-100 px-2 py-1 rounded">
                {children}
              </h5>
            ),
            h6: ({ children }) => (
              <h6 className="text-sm font-normal text-gray-500 mt-3 mb-1 italic">
                {children}
              </h6>
            ),
            p: ({ children }) => (
              <p 
                className="text-gray-700 leading-relaxed mb-4"
                dangerouslySetInnerHTML={
                  searchTerm && !isPreview 
                    ? { __html: highlightSearchTerm(String(children), searchTerm) }
                    : undefined
                }
              >
                {searchTerm && !isPreview ? undefined : children}
              </p>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-gray-900 bg-yellow-100 px-1 rounded">
                {children}
              </strong>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4 ml-4">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside text-gray-700 space-y-1 mb-4 ml-4">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-gray-700 leading-relaxed">
                {children}
              </li>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-blue-400 bg-blue-50 pl-4 py-3 my-4 rounded-r-md">
                <div className="text-blue-800 italic">
                  {children}
                </div>
              </blockquote>
            ),
            code: ({ children, className }) => {
              const isInline = !className;
              if (isInline) {
                return (
                  <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">
                    {children}
                  </code>
                );
              }
              return (
                <pre className="bg-gray-100 border border-gray-200 rounded-md p-4 overflow-x-auto my-4">
                  <code className="text-gray-800 text-sm font-mono">
                    {children}
                  </code>
                </pre>
              );
            }
          }}
        >
          {displayContent}
        </ReactMarkdown>
      </div>
    );
  };

  const formatFileSize = (size) => {
    if (!size) return '';
    if (size === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!documents || documents.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
        <p className="text-sm">暂无上传的文件</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <Card key={doc.id} className="p-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <FileText className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium truncate">{doc.name}</span>
                    {isMarkdownFile(doc.name) && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                        MD
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{new Date(doc.uploadDate).toLocaleDateString('zh-CN')}</span>
                    {doc.size && (
                      <>
                        <span>•</span>
                        <span>{formatFileSize(doc.size)}</span>
                      </>
                    )}
                    {doc.content && (
                      <>
                        <span>•</span>
                        <span>{doc.content.length} 字符</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex-shrink-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[85vh] overflow-hidden flex flex-col">
                  <DialogHeader className="flex-shrink-0">
                    <DialogTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      {doc.name}
                    </DialogTitle>
                    {isMarkdownFile(doc.name) && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="搜索文档内容..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-10 h-9 text-sm"
                          />
                          {searchTerm && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSearchTerm('')}
                              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                        {searchTerm && (
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            搜索: "{searchTerm}"
                          </span>
                        )}
                      </div>
                    )}
                  </DialogHeader>
                  <div className="flex-1 overflow-y-auto mt-4 pr-2">
                    {renderContent(doc.content, false, searchTerm)}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded border border-gray-100">
              {renderContent(doc.content, true)}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DocumentViewer;
