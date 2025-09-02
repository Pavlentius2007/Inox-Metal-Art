import requests

# Тестовые данные
test_data = {
    'company_name': 'Test Company',
    'contact_person': 'Test Person',
    'email': 'test@example.com',
    'phone': '+1234567890',
    'country': 'Test Country',
    'city': 'Test City',
    'product_type': 'Test Product',
    'quantity': '100',
    'application': 'Test Application',
    'deadline': '2024-12-31',
    'additional_info': 'Test additional info'
}

# Отправляем POST запрос
response = requests.post(
    'http://localhost:8000/api/v1/applications/',
    data=test_data
)

print(f"Status Code: {response.status_code}")
print(f"Response: {response.text}")

if response.status_code == 200:
    print("✅ Тест успешен!")
else:
    print("❌ Тест не прошел")
