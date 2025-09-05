import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle, Mail, Phone, MapPin } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqData: FAQItem[] = [
    {
      question: "Кто такие INOX METAL ART & HWA LIN Stainless Steel?",
      answer: "Основанная в 1991 году в Таиланде для производства устойчивых художественных отделок на листах нержавеющей стали. Мы объединили японские технологии, сырье от Nisshin и низкие производственные издержки в Таиланде. За эти 30 лет мы накопили опыт производства для мега-проектов с самыми высокими требованиями. Мы организовали логистику для быстрой поставки небольших заказов с нашего основного склада. Мы помогали дизайнерам, предлагая наиболее подходящие и доступные отделки для конкретного применения. Наши лучшие качества: качество, надежность и сервис."
    },
    {
      question: "Какие типы продукции из нержавеющей стали вы предлагаете?",
      answer: "Мы специализируемся на производстве декоративных листов из нержавеющей стали. Наша коллекция художественных отделок включает: вибрационные отделки, сатин, хайлайн, N8 зеркало, бисерная обработка, ArtBrush™, художественное травление, Ti(PVD), до 5 различных отделок на одном листе, прессованные пластины, тиснение, нано антиотпечаточное покрытие (NAS™) и другие отделки."
    },
    {
      question: "Что такое нано антибактериальное покрытие (NAS™)?",
      answer: "NAS™ - это покрытие, которое сочетает передовую антибактериальную и антиотпечаточную технологию. Оно устраняет бактерии в течение одного дня, что делает его идеальным для гигиенически критических сред, таких как больницы, аэропорты и кабины лифтов."
    },
    {
      question: "Что такое нано устойчивое к царапинам покрытие (NSR™)?",
      answer: "NSR™ покрытая поверхность в четыре раза тверже обычной нержавеющей стали, обеспечивая постоянную защиту от царапин и эрозии. Идеально подходит для областей, подверженных частому износу, таких как служебные лифты и коммерческие кухни."
    },
    {
      question: "Что такое титановое (PVD) покрытие?",
      answer: "Передовые PVD покрытия обеспечивают яркие, устойчивые к коррозии цвета, которые сохраняют свою яркость в течение десятилетий. Эти отделки идеальны для премиальных архитектурных проектов и обеспечивают долговечную эстетическую привлекательность."
    },
    {
      question: "Как ваши продукты превращают здания в достопримечательности?",
      answer: "Нержавеющая сталь больше не ограничивается серебристой матовой сатиновой или зеркальной хромированной отделкой. Используя процесс физического осаждения из паровой фазы (PVD), на нержавеющей стали создается прочная металлокерамическая пленка богатых цветов. Это УФ- и коррозионно-стойкое покрытие улучшает внешний вид и обеспечивает долговременную защиту без необходимости защитного лака. По частым запросам дизайнеров интерьеров и владельцев недвижимости мы разработали нано антиотпечаточное покрытие (NAS™). В отличие от обычного лака, NAS™ не трескается после изгиба и глубоко прилипает к поверхностным полостям, используя наночастицы. Особенно подходит для внутренних применений, таких как двери и кабины лифтов, где происходит частый контакт с руками."
    },
    {
      question: "Можно ли настроить продукты?",
      answer: "Да, мы предлагаем безграничные возможности настройки, используя различные технологии отделки и обработки. Выберите из широкого спектра отделок, цветов и дизайнов, чтобы соответствовать вашим уникальным требованиям."
    },
    {
      question: "Какие известные проекты INOX METAL ART?",
      answer: "Наша работа включает:\n\n• Кувейт, Grand Avenue – BB, Ti(Light Bronze) + NAS™\n• Eye of Qatar – HL, Ti(Blue) + NAS™\n• Dubai Frame – Metamorphose 3D in N8, Ti(Armani Gold)\n• Petronas Towers (Малайзия) – HL Finish\n• Lusail Marina Twin Towers (Катар) – N8, Ti(Rose Gold)\n• Wat Phra Dhammakaya (Таиланд) – HL, Ti(Gold), Mirror, Ti(Rainbow)\n• Louis Vuitton (Франция) – HL, Ti(Gold)\n• Магазины Gucci (по всему миру) – N8, Zr(Brass) and HL, Zr(Brass)"
    },
    {
      question: "Предоставляете ли вы образцы для индивидуальных проектов?",
      answer: "Да, мы предоставляем образцы для одобрения, чтобы убедиться, что финальный продукт соответствует вашим ожиданиям."
    },
    {
      question: "Экологически ли безопасны продукты HWA LIN?",
      answer: "Да, все наши продукты из нержавеющей стали на 100% перерабатываемы и изготавливаются с использованием экологически чистых процессов для снижения воздействия на окружающую среду."
    },
    {
      question: "Как ваши покрытия способствуют устойчивости?",
      answer: "Наши передовые покрытия, такие как NAS™ и NSR™, снижают необходимость частого обслуживания или замены, продлевая срок службы ваших дизайнов и снижая их воздействие на окружающую среду."
    },
    {
      question: "Как разместить заказ?",
      answer: "Вы можете связаться с нами через наш веб-сайт, электронную почту или телефон. Наша команда проведет вас через процесс и поможет выбрать лучшие варианты для вашего проекта."
    },
    {
      question: "Поддерживаете ли вы международных клиентов?",
      answer: "Да, мы отправляем наши продукты по всему миру и имеем опыт работы с клиентами из различных отраслей по всему миру."
    },
    {
      question: "Каков ваш типичный срок выполнения заказов?",
      answer: "Сроки выполнения зависят от размера, сложности и настройки заказа. Пожалуйста, свяжитесь с нами напрямую для оценки, адаптированной к вашему проекту."
    },
    {
      question: "Могу ли я посетить ваше предприятие в Таиланде?",
      answer: "Да, мы приветствуем клиентов для посещения нашего производственного предприятия, чтобы узнать больше о наших процессах и изучить наш ассортимент отделок из первых рук."
    },
    {
      question: "Как связаться с INOX METAL ART?",
      answer: "Вы можете посетить нашу страницу 'Связаться с нами' для контактной информации или запланировать встречу напрямую через наш веб-сайт."
    },
    {
      question: "Как заказать образцы продукции?",
      answer: "Отправьте заявку через форму на странице контактов или свяжитесь с нами по телефону. Мы отправим образцы бесплатно в течение 2-3 рабочих дней."
    },
    {
      question: "Какие сроки выполнения заказов?",
      answer: "Стандартные заказы выполняются в течение 7-14 дней. Срочные заказы - по договоренности. Всегда уточняем сроки при оформлении."
    },
    {
      question: "Работаете ли вы по всей России?",
      answer: "Да, мы работаем по всей России. Доставляем продукцию в любой регион. Стоимость доставки рассчитывается индивидуально."
    },
    {
      question: "Предоставляете ли техническую поддержку?",
      answer: "Конечно! Наши технологи консультируют по всем вопросам применения продукции, монтажа и ухода за декоративной нержавеющей сталью."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Часто задаваемые вопросы
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ответы на самые популярные вопросы о нашей продукции, технологиях и услугах
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-xl"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {item.question}
                  </h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                {openItems.includes(index) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Не нашли ответ на свой вопрос?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Свяжитесь с нами, и мы с радостью ответим на любые ваши вопросы
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">info@inoxmetalart.com</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Телефон</h3>
                <p className="text-gray-600">+7 (999) 123-45-67</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                                 <h3 className="text-lg font-semibold text-gray-900 mb-2">Офис в Таиланде</h3>
                 <p className="text-gray-600 mb-2">61/271-272 Rama 9 Road, HuayKwang, Bangkok 10310 Thailand</p>
                 <a 
                   href="https://maps.app.goo.gl/NXYcgoUz6vAMFSN66?g_st=aw"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-blue-500 hover:text-blue-700 text-sm transition-colors duration-200"
                 >
                   Посмотреть на карте
                 </a>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Завод в Таиланде</h3>
                <p className="text-gray-600 mb-2">7RQ3+783, Nong Chumphon, Khao Yoi District, Phetchaburi 76140, Таиланд</p>
                <a 
                  href="https://maps.app.goo.gl/tXCwNfqSrTMATTvK8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 text-sm transition-colors duration-200"
                >
                  Посмотреть на карте
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
