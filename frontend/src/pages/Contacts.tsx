import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin as MapPinIcon,
  Clock as ClockIcon,
  PhoneCall,
  Mail as MailIcon,
  MessageCircle as MessageCircleIcon,
  Factory
} from 'lucide-react';
import Button from '../components/ui/Button';

const Contacts: React.FC = () => {

  const contactInfo = {
    email: 'pavel@inoxmetalart.com',
    phone: '+7 953 862 8581',
    telegram: '@Pavlentius2007',
    whatsapp: '+7 953 862 8581',
    office: {
      address: '61/271-272 Rama 9 Road, HuayKwang, Bangkok 10310 Thailand',
      mapLink: 'https://maps.app.goo.gl/NXYcgoUz6vAMFSN66?g_st=aw'
    },
    factory: {
      address: '7RQ3+783, Nong Chumphon, Khao Yoi District, Phetchaburi 76140, Таиланд',
      mapLink: 'https://maps.app.goo.gl/tXCwNfqSrTMATTvK8'
    },
    workingHours: 'Пн-Пт: 9:00-18:00 (МСК)'
  };



  return (
    <div className="min-h-screen bg-white pt-32">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Свяжитесь с нами
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto"
          >
            Получите консультацию по продукции и технологиям InoxMetalArt
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-blue-200 max-w-3xl mx-auto mt-4"
          >
            Наши специалисты готовы ответить на все ваши вопросы
          </motion.p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Maps Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Наши локации</h2>
              
              {/* Office Map */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPinIcon className="w-6 h-6 text-blue-600 mr-2" />
                  Офис в Таиланде
                </h3>
                <div className="h-64 bg-gray-100 rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=61/271-272+Rama+9+Road,+HuayKwang,+Bangkok+10310+Thailand&zoom=15"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Офис в Таиланде"
                  ></iframe>
                </div>
                <p className="text-gray-600 mt-3">{contactInfo.office.address}</p>
                <a 
                  href={contactInfo.office.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 text-sm mt-2 inline-flex items-center"
                >
                  <MapPinIcon className="w-4 h-4 mr-1" />
                  Открыть в Google Maps
                </a>
              </div>

              {/* Factory Map */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Factory className="w-6 h-6 text-green-600 mr-2" />
                  Завод в Таиланде
                </h3>
                <div className="h-64 bg-gray-100 rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=7RQ3+783,+Nong+Chumphon,+Khao+Yoi+District,+Phetchaburi+76140,+Thailand&zoom=15"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Завод в Таиланде"
                  ></iframe>
                </div>
                <p className="text-gray-600 mt-3">{contactInfo.factory.address}</p>
                <a 
                  href={contactInfo.factory.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 text-sm mt-2 inline-flex items-center"
                >
                  <MapPinIcon className="w-4 h-4 mr-1" />
                  Открыть в Google Maps
                </a>
              </div>
            </motion.div>

            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Контактная информация</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Свяжитесь с нами любым удобным способом. Наши специалисты готовы помочь с выбором продукции и ответить на все вопросы.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MailIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200 text-lg"
                    >
                      {contactInfo.email}
                    </a>
                    <p className="text-gray-600 text-sm mt-1">
                      Ответим в течение 24 часов
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <PhoneCall className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Телефон / WhatsApp</h3>
                    <a 
                      href={`tel:${contactInfo.phone}`}
                      className="text-green-600 hover:text-green-800 transition-colors duration-200 text-lg"
                    >
                      {contactInfo.phone}
                    </a>
                    <p className="text-gray-600 text-sm mt-1">
                      WhatsApp доступен 24/7
                    </p>
                  </div>
                </div>

                {/* Telegram */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircleIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Telegram</h3>
                    <a 
                      href={`https://t.me/${contactInfo.telegram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 transition-colors duration-200 text-lg"
                    >
                      {contactInfo.telegram}
                    </a>
                    <p className="text-gray-600 text-sm mt-1">
                      Быстрые ответы в мессенджере
                    </p>
                  </div>
                </div>

                {/* Office Address */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPinIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Офис в Таиланде</h3>
                    <p className="text-gray-600 text-lg">
                      {contactInfo.office.address}
                    </p>
                    <a 
                      href={contactInfo.office.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 transition-colors duration-200 text-sm mt-1 inline-flex items-center"
                    >
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      Посмотреть на карте
                    </a>
                  </div>
                </div>

                {/* Factory Address */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Factory className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Завод в Таиланде</h3>
                    <p className="text-gray-600 text-lg">
                      {contactInfo.factory.address}
                    </p>
                    <a 
                      href={contactInfo.factory.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 transition-colors duration-200 text-sm mt-1 inline-flex items-center"
                    >
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      Посмотреть на карте
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ClockIcon className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Время работы</h3>
                    <p className="text-gray-600 text-lg">
                      {contactInfo.workingHours}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      WhatsApp доступен круглосуточно
                    </p>
                  </div>
                </div>
              </div>


            </motion.div>


          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Готовы начать проект?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Свяжитесь с нами прямо сейчас и получите профессиональную консультацию 
              по выбору продукции для вашего проекта.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                <PhoneCall className="w-5 h-5 mr-2" />
                Позвонить сейчас
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-900">
                <MessageCircleIcon className="w-5 h-5 mr-2" />
                Написать в WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;

