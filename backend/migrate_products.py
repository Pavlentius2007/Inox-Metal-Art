import sqlite3

def migrate_products_table():
    """Добавляет колонку videos в таблицу products"""
    conn = sqlite3.connect('inoxmetalart.db')
    cursor = conn.cursor()
    
    try:
        # Проверяем, существует ли колонка videos
        cursor.execute("PRAGMA table_info(products)")
        columns = [column[1] for column in cursor.fetchall()]
        
        if 'videos' not in columns:
            # Добавляем колонку videos
            cursor.execute('ALTER TABLE products ADD COLUMN videos TEXT')
            conn.commit()
            print('✅ Колонка videos успешно добавлена в таблицу products')
        else:
            print('ℹ️ Колонка videos уже существует в таблице products')
            
    except sqlite3.OperationalError as e:
        print(f'❌ Ошибка при добавлении колонки: {e}')
    finally:
        conn.close()

if __name__ == "__main__":
    migrate_products_table()