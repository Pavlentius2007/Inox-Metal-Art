import React from 'react';
import { motion } from 'framer-motion';
import { Users, Package, TrendingUp, FileText, Award } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Dashboard: React.FC = () => {
  const stats = [
    { title: 'Всего продуктов', value: '156', icon: Package, color: 'blue' },
    { title: 'Заявки сегодня', value: '12', icon: FileText, color: 'green' },
    { title: 'Активные проекты', value: '8', icon: TrendingUp, color: 'purple' },
    { title: 'Сертификаты', value: '23', icon: Award, color: 'orange' }
  ];

  const recentApplications = [
    { id: 1, company: 'ООО "Строитель"', project: 'Ограждения для ЖК', status: 'new', date: '2024-01-15' },
    { id: 2, company: 'Завод Металлург', project: 'Лестничные перила', status: 'processing', date: '2024-01-14' },
    { id: 3, company: 'Дизайн Студия', project: 'Декоративные панели', status: 'completed', date: '2024-01-13' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Новая';
      case 'processing': return 'В работе';
      case 'completed': return 'Завершена';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Applications */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Последние заявки</h2>
          <Button variant="outline" size="sm">
            Показать все
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="pb-3 text-sm font-medium text-gray-600">Компания</th>
                <th className="pb-3 text-sm font-medium text-gray-600">Проект</th>
                <th className="pb-3 text-sm font-medium text-gray-600">Статус</th>
                <th className="pb-3 text-sm font-medium text-gray-600">Дата</th>
                <th className="pb-3 text-sm font-medium text-gray-600">Действия</th>
              </tr>
            </thead>
            <tbody>
              {recentApplications.map((app) => (
                <tr key={app.id} className="border-b border-gray-100">
                  <td className="py-4 text-sm font-medium text-gray-900">{app.company}</td>
                  <td className="py-4 text-sm text-gray-600">{app.project}</td>
                  <td className="py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(app.status)}`}>
                      {getStatusText(app.status)}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-gray-600">{app.date}</td>
                  <td className="py-4">
                    <Button variant="outline" size="sm">
                      Просмотр
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Быстрые действия</h3>
          <div className="space-y-3">
            <Button fullWidth variant="outline">
              <Package className="w-4 h-4 mr-2" />
              Добавить продукт
            </Button>
            <Button fullWidth variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Создать проект
            </Button>
            <Button fullWidth variant="outline">
              <Award className="w-4 h-4 mr-2" />
              Загрузить сертификат
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Система</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Статус сервера:</span>
              <span className="text-green-600 font-medium">Онлайн</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">База данных:</span>
              <span className="text-green-600 font-medium">Подключена</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Последний бэкап:</span>
              <span className="text-gray-900">15.01.2024</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Уведомления</h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">3 новые заявки ожидают обработки</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">Требуется обновление каталога</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;


