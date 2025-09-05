import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Eye,
  Download,
  FileText,
  File,
  FileImage,
  FileSpreadsheet,
  X
} from 'lucide-react';
import Button from '../components/ui/Button';
import '../styles/materials.css';

interface Material {
  id: number;
  name: string;
  category: string;
  description: string;
  file_type: string;
  file_size: string;
  download_url: string;
  tags: string[];
  upload_date: string;
  downloads: number;
}

const Materials: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [isPdfLoading, setIsPdfLoading] = useState(true);

  // Материалы для скачивания (документы, каталоги, сертификаты) - обновлены на основе реальных файлов
  const [materials] = useState<Material[]>([
    // Каталоги продукции
    {
      id: 1,
      name: 'Декоративная нержавеющая сталь',
      description: 'Полный каталог декоративной нержавеющей стали',
      category: 'catalogs',
      file_type: 'pdf',
      file_size: '6.6 MB',
      download_url: 'http://localhost:8000/Catalog/ИноксМеталАрт - Декоративная Нержавейка.pdf',
      tags: ['catalogs', 'PDF'],
      upload_date: '2023-11-25',
      downloads: 234
    },
    {
      id: 2,
      name: 'PressPlates каталог',
      description: 'Каталог пресс-форм и 3D узоров',
      category: 'catalogs',
      file_type: 'pdf',
      file_size: '3.0 MB',
      download_url: 'http://localhost:8000/Catalog/PressPlates™.pdf',
      tags: ['catalogs', 'PDF'],
      upload_date: '2023-11-25',
      downloads: 89
    },
    {
      id: 3,
      name: 'Стеганые листы',
      description: 'Каталог стеганых листов с 3D дизайнами',
      category: 'catalogs',
      file_type: 'pdf',
      file_size: '1.8 MB',
      download_url: 'http://localhost:8000/Catalog/Quilted.pdf',
      tags: ['catalogs', 'PDF'],
      upload_date: '2023-11-25',
      downloads: 67
    },
    {
      id: 4,
      name: 'Знаковая продукция (5 страниц)',
      description: 'Каталог продукции для вывесок и указателей',
      category: 'catalogs',
      file_type: 'pdf',
      file_size: '1.2 MB',
      download_url: 'http://localhost:8000/Catalog/Sign products (5pages).pdf',
      tags: ['catalogs', 'PDF'],
      upload_date: '2023-11-25',
      downloads: 45
    },
    {
      id: 5,
      name: 'Индивидуальные поручни для лифтов',
      description: 'Каталог индивидуальных поручней из нержавеющей стали для лифтов',
      category: 'catalogs',
      file_type: 'pdf',
      file_size: '777 KB',
      download_url: 'http://localhost:8000/Catalog/1 Custom made Handrails for Elevators.pdf',
      tags: ['catalogs', 'PDF'],
      upload_date: '2023-11-25',
      downloads: 35
    },
    {
      id: 6,
      name: 'Декоративная нержавеющая сталь (англ.)',
      description: 'Каталог декоративных решений из нержавеющей стали',
      category: 'catalogs',
      file_type: 'pdf',
      file_size: '2.8 MB',
      download_url: 'http://localhost:8000/Catalog/1 Decorative stainless steel.pdf',
      tags: ['catalogs', 'PDF'],
      upload_date: '2023-11-25',
      downloads: 28
    },
    {
      id: 7,
      name: 'Отделка лифтов нержавеющей сталью',
      description: 'Каталог отделки лифтов декоративной нержавеющей сталью',
      category: 'catalogs',
      file_type: 'pdf',
      file_size: '2.2 MB',
      download_url: 'http://localhost:8000/Catalog/1 Elevator decoration, stainless steel.pdf',
      tags: ['catalogs', 'PDF'],
      upload_date: '2023-11-25',
      downloads: 31
    },
    {
      id: 8,
      name: 'Наши производственные возможности',
      description: 'Каталог производственных возможностей компании',
      category: 'catalogs',
      file_type: 'pdf',
      file_size: '1.3 MB',
      download_url: 'http://localhost:8000/Catalog/Our Fabrication.pdf',
      tags: ['catalogs', 'PDF'],
      upload_date: '2023-11-25',
      downloads: 41
    },
    {
      id: 9,
      name: 'HLS Project References',
      description: 'Справочник проектов HLS',
      category: 'catalogs',
      file_type: 'pdf',
      file_size: '1.5 MB',
      download_url: 'http://localhost:8000/Catalog/1 HLS Project References.pdf',
      tags: ['catalogs', 'PDF'],
      upload_date: '2023-11-25',
      downloads: 22
    },
    {
      id: 10,
      name: 'Interior Applications',
      description: 'Внутренние применения нержавеющей стали',
      category: 'catalogs',
      file_type: 'pdf',
      file_size: '1.1 MB',
      download_url: 'http://localhost:8000/Catalog/1 Interior Applications.pdf',
      tags: ['catalogs', 'PDF'],
      upload_date: '2023-11-25',
      downloads: 18
    },
    {
      id: 11,
      name: 'Exterior application',
      description: 'Внешние применения нержавеющей стали',
      category: 'catalogs',
      file_type: 'pdf',
      file_size: '1.4 MB',
      download_url: 'http://localhost:8000/Catalog/Exterior application.pdf',
      tags: ['catalogs', 'PDF'],
      upload_date: '2023-11-25',
      downloads: 25
    },
    {
      id: 12,
      name: 'Floor Plates (FP)',
      description: 'Каталог напольных плит',
      category: 'catalogs',
      file_type: 'pdf',
      file_size: '800 KB',
      download_url: 'http://localhost:8000/Catalog/Floor Plates (FP).pdf',
      tags: ['catalogs', 'PDF'],
      upload_date: '2023-11-25',
      downloads: 16
    },
    {
      id: 13,
      name: 'Hollow Spheres',
      description: 'Каталог полых сфер',
      category: 'catalogs',
      file_type: 'pdf',
      file_size: '600 KB',
      download_url: 'http://localhost:8000/Catalog/Hollow Spheres.pdf',
      tags: ['catalogs', 'PDF'],
      upload_date: '2023-11-25',
      downloads: 12
    },
    {
      id: 14,
      name: 'Art Etching Designs (preview)',
      description: 'Превью дизайнов художественного травления',
      category: 'catalogs',
      file_type: 'pdf',
      file_size: '900 KB',
      download_url: 'http://localhost:8000/Catalog/Art Etching Designs (preview).pdf',
      tags: ['catalogs', 'PDF'],
      upload_date: '2023-11-25',
      downloads: 20
    },
    {
      id: 15,
      name: 'ArtBrush',
      description: 'Каталог ArtBrush технологий',
      category: 'catalogs',
      file_type: 'pdf',
      file_size: '1.2 MB',
      download_url: 'http://localhost:8000/Catalog/ArtBrush.pdf',
      tags: ['catalogs', 'PDF'],
      upload_date: '2023-11-25',
      downloads: 14
    },
    {
      id: 16,
      name: 'DesignTrims™',
      description: 'Каталог декоративных отделок DesignTrims',
      category: 'catalogs',
      file_type: 'pdf',
      file_size: '1.0 MB',
      download_url: 'http://localhost:8000/Catalog/DesignTrims™.pdf',
      tags: ['catalogs', 'PDF'],
      upload_date: '2023-11-25',
      downloads: 19
    },
    // Сертификаты качества
    {
      id: 17,
      name: 'Material Safety RoHS - NAS coating',
      description: 'Сертификат безопасности материалов RoHS для NAS покрытия',
      category: 'certificates',
      file_type: 'pdf',
      file_size: '238 KB',
      download_url: 'http://localhost:8000/Catalog/Material Safety RoHS - NAS coating.pdf',
      tags: ['certificates', 'PDF'],
      upload_date: '2023-11-25',
      downloads: 58
    },
    {
      id: 18,
      name: 'Material Safety RoHS - Ti(PVD) coating',
      description: 'Сертификат безопасности материалов RoHS для Ti(PVD) покрытия',
      category: 'certificates',
      file_type: 'pdf',
      file_size: '381 KB',
      download_url: 'http://localhost:8000/Catalog/Material Safety RoHS - Ti(PVD) coating (Hwa Lin).pdf',
      tags: ['certificates', 'PDF'],
      upload_date: '2023-11-25',
      downloads: 15
    },
    {
      id: 19,
      name: 'Material Safety RoHS - AISI 304 grade',
      description: 'Сертификат безопасности материалов RoHS для AISI 304',
      category: 'certificates',
      file_type: 'pdf',
      file_size: '320 KB',
      download_url: 'http://localhost:8000/Catalog/Material Safety RoHS - AISI 304 grade (Hwa Lin).pdf',
      tags: ['certificates', 'PDF'],
      upload_date: '2023-11-25',
      downloads: 42
    },
    {
      id: 20,
      name: 'Material Safety RoHS - AISI 316 grade',
      description: 'Сертификат безопасности материалов RoHS для AISI 316',
      category: 'certificates',
      file_type: 'pdf',
      file_size: '310 KB',
      download_url: 'http://localhost:8000/Catalog/Material Safety RoHS - AISI 316 grade.pdf',
      tags: ['certificates', 'PDF'],
      upload_date: '2023-11-25',
      downloads: 38
    },
    {
      id: 21,
      name: 'Material Safety RoHS - AISI 430 grade',
      description: 'Сертификат безопасности материалов RoHS для AISI 430',
      category: 'certificates',
      file_type: 'pdf',
      file_size: '290 KB',
      download_url: 'http://localhost:8000/Catalog/Material Safety RoHS - AISI 430 grade (Hwa Lin).pdf',
      tags: ['certificates', 'PDF'],
      upload_date: '2023-11-25',
      downloads: 21
    },
    {
      id: 22,
      name: 'NAS™ Anti-fingerprint coated SS sheets',
      description: 'Сертификат NAS антипечатного покрытия для нержавеющих листов',
      category: 'certificates',
      file_type: 'pdf',
      file_size: '654 KB',
      download_url: 'http://localhost:8000/Catalog/NAS™ Anti-fingerprint coated SS sheets.pdf',
      tags: ['certificates', 'PDF'],
      upload_date: '2023-11-25',
      downloads: 32
    },
    {
      id: 23,
      name: 'ISO 9001-2015',
      description: 'Сертификат системы менеджмента качества ISO 9001-2015',
      category: 'certificates',
      file_type: 'pdf',
      file_size: '450 KB',
      download_url: 'http://localhost:8000/Catalog/ISO 9001-2015 (Valid 23.08.2020).pdf',
      tags: ['certificates', 'PDF'],
      upload_date: '2023-11-25',
      downloads: 67
    },
    {
      id: 24,
      name: 'Environmental Management (ISO 14001)',
      description: 'Сертификат системы экологического менеджмента ISO 14001',
      category: 'certificates',
      file_type: 'pdf',
      file_size: '380 KB',
      download_url: 'http://localhost:8000/Catalog/Environmental Management (ISO 14001).pdf',
      tags: ['certificates', 'PDF'],
      upload_date: '2023-11-25',
      downloads: 29
    },
    {
      id: 25,
      name: 'LEED Green Building Certificate',
      description: 'Сертификат зеленого строительства LEED',
      category: 'certificates',
      file_type: 'pdf',
      file_size: '520 KB',
      download_url: 'http://localhost:8000/Catalog/LEED Green Building Certificate.pdf',
      tags: ['certificates', 'PDF'],
      upload_date: '2023-11-25',
      downloads: 23
    },
    {
      id: 26,
      name: '1000hrs. Accelerated Salt Spray Test Certificate (PVD coating)',
      description: 'Сертификат ускоренного солевого тумана 1000 часов для PVD покрытия',
      category: 'certificates',
      file_type: 'pdf',
      file_size: '410 KB',
      download_url: 'http://localhost:8000/Catalog/1000hrs. Accelerated Salt Spray Test Certificate (PVD coating).pdf',
      tags: ['certificates', 'PDF'],
      upload_date: '2023-11-25',
      downloads: 18
    },
    // Технические спецификации
    {
      id: 27,
      name: 'N8 Mirror Surface Scan Test',
      description: 'Результаты сканирования поверхности N8 Mirror',
      category: 'specifications',
      file_type: 'jpg',
      file_size: '110 KB',
      download_url: 'http://localhost:8000/Catalog/N8 Mirror Surface Scan Test.jpg',
      tags: ['specifications', 'JPG'],
      upload_date: '2023-11-25',
      downloads: 24
    },
    {
      id: 28,
      name: 'sNAS coating Anti Microbial test',
      description: 'Результаты тестирования антимикробных свойств sNAS покрытия',
      category: 'specifications',
      file_type: 'jpg',
      file_size: '181 KB',
      download_url: 'http://localhost:8000/Catalog/sNAS coating Anti Microbial test.jpg',
      tags: ['specifications', 'JPG'],
      upload_date: '2023-11-25',
      downloads: 19
    }
  ]);

  const handleViewMaterial = (material: Material) => {
    setSelectedMaterial(material);
    setIsPdfLoading(true);
  };

  const handleCloseModal = () => {
    setSelectedMaterial(null);
    setIsPdfLoading(true);
  };

  const handleDownload = async (material: Material) => {
    const downloadButton = document.querySelector(`[data-material-id="${material.id}"]`);
    if (downloadButton) {
      downloadButton.innerHTML = '<Download className="w-4 h-4 mr-2" />Скачивание...';
      downloadButton.setAttribute('disabled', 'true');
    }

    try {
      const response = await fetch(material.download_url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = material.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      // Восстанавливаем кнопку
      if (downloadButton) {
        downloadButton.innerHTML = '<Download className="w-4 h-4 mr-2" />Скачать';
        downloadButton.removeAttribute('disabled');
      }
    } catch (error) {
      console.error('Ошибка скачивания:', error);
      alert(`Ошибка при скачивании файла: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
      
      // Восстанавливаем кнопку
      if (downloadButton) {
        downloadButton.innerHTML = '<Download className="w-4 h-4 mr-2" />Скачать';
        downloadButton.removeAttribute('disabled');
      }
    }
  };

  const filteredMaterials = materials; // Показываем все материалы без фильтрации

  // Группировка материалов по категориям
  const groupedMaterials = filteredMaterials.reduce((groups, material) => {
    const category = material.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(material);
    return groups;
  }, {} as Record<string, Material[]>);

  // Названия категорий на русском языке
  const categoryNames: Record<string, string> = {
    'catalogs': 'Каталоги продукции',
    'certificates': 'Сертификаты качества',
    'specifications': 'Технические спецификации',
    'designs': 'Дизайн-проекты'
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Заголовок страницы */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Материалы
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Документы, каталоги и сертификаты для скачивания
            </p>
          </div>
        </div>
      </section>

      {/* Список материалов */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {Object.entries(groupedMaterials).map(([category, categoryMaterials]) => (
              <div key={category}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {categoryNames[category] || category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryMaterials.map((material) => (
                    <motion.div
                      key={material.id}
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          {material.file_type === 'pdf' && <FileText className="w-5 h-5 text-red-500" />}
                          {material.file_type === 'jpg' && <FileImage className="w-5 h-5 text-blue-500" />}
                          {material.file_type === 'doc' && <File className="w-5 h-5 text-blue-600" />}
                          {material.file_type === 'xls' && <FileSpreadsheet className="w-5 h-5 text-green-500" />}
                        </div>
                        <span className="text-sm text-gray-500">{material.file_size}</span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {material.name}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 text-sm">
                        {material.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {material.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {material.downloads} скачиваний
                        </span>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewMaterial(material)}
                            className="flex items-center"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Просмотр
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleDownload(material)}
                            data-material-id={material.id}
                            className="flex items-center"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Скачать
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Модальное окно для просмотра PDF */}
      {selectedMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedMaterial.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedMaterial.description}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCloseModal}
                className="flex items-center"
              >
                <X className="w-4 h-4 mr-2" />
                Закрыть
              </Button>
            </div>
            
            <div className="flex-1 p-4">
              {isPdfLoading && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Загрузка документа...</p>
                  </div>
                </div>
              )}
              
              <iframe
                src={`${selectedMaterial.download_url}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-full border-0"
                onLoad={() => setIsPdfLoading(false)}
                style={{ display: isPdfLoading ? 'none' : 'block' }}
              />
            </div>
            
            <div className="flex items-center justify-between p-4 border-t bg-gray-50">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>PDF</span>
                <span></span>
                <span>{selectedMaterial.file_size}</span>
                <span></span>
                <span>{selectedMaterial.downloads} скачиваний</span>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleDownload(selectedMaterial)}
                className="flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Скачать PDF
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Materials;
