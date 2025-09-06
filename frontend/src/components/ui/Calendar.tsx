import React, { forwardRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CalendarEvent {
  id: string | number;
  title: string;
  date: Date;
  color?: string;
  description?: string;
}

interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  events?: CalendarEvent[];
  variant?: 'default' | 'minimal' | 'bordered';
  size?: 'sm' | 'md' | 'lg';
  showHeader?: boolean;
  showNavigation?: boolean;
  showToday?: boolean;
  showWeekNumbers?: boolean;
  locale?: string;
  className?: string;
  animate?: boolean;
  onDateClick?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
}

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(({
  value: controlledValue,
  defaultValue = new Date(),
  onChange,
  events = [],
  variant = 'default',
  size = 'md',
  showHeader = true,
  showNavigation = true,
  showToday = true,
  showWeekNumbers = false,
  locale = 'ru-RU',
  className,
  animate = false,
  onDateClick,
  onEventClick,
  ...props
}, ref) => {
  const [currentDate, setCurrentDate] = useState(controlledValue || defaultValue);
  const [viewMonth, setViewMonth] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));

  // Размеры
  const sizes = {
    sm: {
      container: 'p-3',
      header: 'text-sm',
      navigation: 'p-1',
      day: 'w-8 h-8 text-xs',
      today: 'text-xs',
      weekNumber: 'w-6 h-8 text-xs'
    },
    md: {
      container: 'p-4',
      header: 'text-base',
      navigation: 'p-1.5',
      day: 'w-10 h-10 text-sm',
      today: 'text-sm',
      weekNumber: 'w-8 h-10 text-sm'
    },
    lg: {
      container: 'p-6',
      header: 'text-lg',
      navigation: 'p-2',
      day: 'w-12 h-12 text-base',
      today: 'text-base',
      weekNumber: 'w-10 h-12 text-base'
    }
  };

  // Варианты стилей
  const variants = {
    default: {
      container: 'bg-white border border-gray-200 rounded-lg shadow-sm',
      header: 'bg-gray-50 border-b border-gray-200',
      day: 'text-gray-700 hover:bg-gray-50',
      daySelected: 'bg-blue-600 text-white hover:bg-blue-700',
      dayToday: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
      dayOtherMonth: 'text-gray-400',
      dayWeekend: 'text-red-600',
      navigation: 'text-gray-600 hover:bg-gray-100'
    },
    minimal: {
      container: 'bg-transparent',
      header: 'bg-gray-50',
      day: 'text-gray-700 hover:bg-gray-100',
      daySelected: 'bg-blue-500 text-white hover:bg-blue-600',
      dayToday: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
      dayOtherMonth: 'text-gray-300',
      dayWeekend: 'text-red-500',
      navigation: 'text-gray-500 hover:bg-gray-100'
    },
    bordered: {
      container: 'bg-white border-2 border-gray-200 rounded-xl shadow-lg',
      header: 'bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200',
      day: 'text-gray-700 hover:bg-gray-50 border border-transparent hover:border-gray-200',
      daySelected: 'bg-blue-600 text-white hover:bg-blue-700 border-blue-600',
      dayToday: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200',
      dayOtherMonth: 'text-gray-400',
      dayWeekend: 'text-red-600',
      navigation: 'text-gray-600 hover:bg-gray-100'
    }
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  const baseClasses = cn(
    'font-sans',
    currentVariant.container,
    className
  );

  const headerClasses = cn(
    'flex items-center justify-between px-4 py-3',
    currentVariant.header
  );

  const navigationClasses = cn(
    'flex items-center justify-center rounded-md transition-colors duration-200',
    currentSize.navigation,
    currentVariant.navigation
  );

  const dayClasses = cn(
    'flex items-center justify-center rounded-md transition-all duration-200 cursor-pointer font-medium',
    currentSize.day,
    currentVariant.day
  );

  const selectedDayClasses = cn(
    dayClasses,
    currentVariant.daySelected
  );

  const todayClasses = cn(
    dayClasses,
    currentVariant.dayToday
  );

  const otherMonthClasses = cn(
    dayClasses,
    currentVariant.dayOtherMonth
  );

  const weekendClasses = cn(
    dayClasses,
    currentVariant.dayWeekend
  );

  const weekNumberClasses = cn(
    'flex items-center justify-center text-gray-500 font-medium',
    currentSize.weekNumber
  );

  // Локализация
  const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  // Обработчики событий
  const handleDateClick = useCallback((date: Date) => {
    if (onChange) {
      onChange(date);
    }
    setCurrentDate(date);
    onDateClick?.(date);
  }, [onChange, onDateClick]);

  const handlePreviousMonth = useCallback(() => {
    setViewMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setViewMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const handleTodayClick = useCallback(() => {
    const today = new Date();
    setViewMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    handleDateClick(today);
  }, [handleDateClick]);

  // Генерация календарной сетки
  const generateCalendarDays = useCallback(() => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - (firstDay.getDay() || 7) + 1);
    
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (7 - (lastDay.getDay() || 7)));
    
    const days = [];
    const current = new Date(startDate);
    
    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  }, [viewMonth]);

  // Проверка статуса дня
  const getDayStatus = useCallback((date: Date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const isSelected = date.toDateString() === currentDate.toDateString();
    const isOtherMonth = date.getMonth() !== viewMonth.getMonth();
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    
    return { isToday, isSelected, isOtherMonth, isWeekend };
  }, [currentDate, viewMonth]);

  // Получение событий для дня
  const getDayEvents = useCallback((date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  }, [events]);

  // Рендер дня
  const renderDay = (date: Date, dayIndex: number) => {
    const { isToday, isSelected, isOtherMonth, isWeekend } = getDayStatus(date);
    const dayEvents = getDayEvents(date);
    
    let dayClass = dayClasses;
    if (isSelected) dayClass = selectedDayClasses;
    else if (isToday) dayClass = todayClasses;
    else if (isOtherMonth) dayClass = otherMonthClasses;
    else if (isWeekend) dayClass = weekendClasses;

    const dayContent = (
      <div
        className={dayClass}
        onClick={() => handleDateClick(date)}
        role="button"
        tabIndex={0}
        aria-label={`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`}
        aria-selected={isSelected}
        aria-current={isToday ? 'date' : undefined}
      >
        <span>{date.getDate()}</span>
        {dayEvents.length > 0 && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex space-x-0.5">
            {dayEvents.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className={cn(
                  'w-1 h-1 rounded-full',
                  event.color || 'bg-blue-500'
                )}
                title={event.title}
                onClick={(e) => {
                  e.stopPropagation();
                  onEventClick?.(event);
                }}
              />
            ))}
            {dayEvents.length > 3 && (
              <div className="w-1 h-1 rounded-full bg-gray-400" title={`Еще ${dayEvents.length - 3} событий`} />
            )}
          </div>
        )}
      </div>
    );

    if (animate) {
      return (
        <motion.div
          key={dayIndex}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.2, 
            delay: dayIndex * 0.01,
            type: "spring",
            stiffness: 200
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {dayContent}
        </motion.div>
      );
    }

    return (
      <div key={dayIndex}>
        {dayContent}
      </div>
    );
  };

  // Рендер недели
  const renderWeek = (weekDays: Date[], weekIndex: number) => (
    <div key={weekIndex} className="flex">
      {showWeekNumbers && (
        <div className={weekNumberClasses}>
          {Math.ceil((weekDays[0].getTime() - new Date(viewMonth.getFullYear(), 0, 1).getTime()) / (1000 * 60 * 60 * 24 * 7))}
        </div>
      )}
      {weekDays.map((date, dayIndex) => renderDay(date, weekIndex * 7 + dayIndex))}
    </div>
  );

  // Рендер календаря
  const renderCalendar = () => {
    const days = generateCalendarDays();
    const weeks = [];
    
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return (
      <div className="grid gap-1">
        {/* Заголовки дней недели */}
        <div className="flex">
          {showWeekNumbers && <div className={weekNumberClasses} />}
          {weekdays.map(day => (
            <div
              key={day}
              className={cn(
                'flex items-center justify-center font-medium text-gray-500',
                currentSize.day
              )}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Дни календаря */}
        {weeks.map((week, weekIndex) => renderWeek(week, weekIndex))}
      </div>
    );
  };

  if (animate) {
    return (
      <motion.div
        ref={ref}
        className={baseClasses}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        {...(props as any)}
      >
        {/* Заголовок */}
        {showHeader && (
          <motion.div
            className={headerClasses}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h2 className={cn('font-semibold', currentSize.header)}>
              {months[viewMonth.getMonth()]} {viewMonth.getFullYear()}
            </h2>
            
            <div className="flex items-center space-x-2">
              {showToday && (
                <button
                  onClick={handleTodayClick}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Сегодня
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Навигация */}
        {showNavigation && (
          <motion.div
            className="flex items-center justify-between px-4 py-2 border-b border-gray-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <button
              onClick={handlePreviousMonth}
              className={navigationClasses}
              aria-label="Предыдущий месяц"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleNextMonth}
              className={navigationClasses}
              aria-label="Следующий месяц"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Календарь */}
        <motion.div
          className={cn('p-4', currentSize.container)}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {renderCalendar()}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={baseClasses} {...props}>
      {/* Заголовок */}
      {showHeader && (
        <div className={headerClasses}>
          <h2 className={cn('font-semibold', currentSize.header)}>
            {months[viewMonth.getMonth()]} {viewMonth.getFullYear()}
          </h2>
          
          <div className="flex items-center space-x-2">
            {showToday && (
              <button
                onClick={handleTodayClick}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Сегодня
              </button>
            )}
          </div>
        </div>
      )}

      {/* Навигация */}
      {showNavigation && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
          <button
            onClick={handlePreviousMonth}
            className={navigationClasses}
            aria-label="Предыдущий месяц"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleNextMonth}
            className={navigationClasses}
            aria-label="Следующий месяц"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Календарь */}
      <div className={cn('p-4', currentSize.container)}>
        {renderCalendar()}
      </div>
    </div>
  );
});

Calendar.displayName = 'Calendar';

export default Calendar;
