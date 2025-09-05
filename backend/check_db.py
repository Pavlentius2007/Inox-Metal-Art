import sqlite3

conn = sqlite3.connect('inoxmetalart.db')
cursor = conn.cursor()
cursor.execute('SELECT id, name, image_path FROM products ORDER BY id DESC LIMIT 5')
products = cursor.fetchall()
print('Последние 5 продуктов:')
for product in products:
    print(f'ID: {product[0]}, Name: {product[1]}, Image: {product[2]}')
conn.close()

