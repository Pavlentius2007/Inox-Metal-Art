import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from typing import List
from app.core.config import settings
from app.models.application import Application

async def send_application_email(application: Application, file_paths: List[str]):
    """Отправка email уведомления о новой заявке"""
    
    # Создаем сообщение
    msg = MIMEMultipart()
    msg['From'] = settings.SMTP_USER
    msg['To'] = settings.APPLICATIONS_EMAIL
    msg['Subject'] = f"Новая заявка от {application.company}"
    
    # Формируем тело письма
    body = f"""
    <html>
    <body>
        <h2>Новая заявка на сайте</h2>
        <p><strong>Клиент:</strong> {application.name}</p>
        <p><strong>Компания:</strong> {application.company}</p>
        <p><strong>Телефон:</strong> {application.phone}</p>
        <p><strong>Email:</strong> {application.email}</p>
        <p><strong>Тип продукции:</strong> {application.product_type.value}</p>
        <p><strong>Описание потребности:</strong></p>
        <p>{application.description}</p>
        <p><strong>Дата заявки:</strong> {application.created_at.strftime('%d.%m.%Y %H:%M')}</p>
        <p><strong>ID заявки:</strong> {application.id}</p>
    </body>
    </html>
    """
    
    msg.attach(MIMEText(body, 'html'))
    
    # Прикрепляем файлы
    for file_path in file_paths:
        try:
            with open(file_path, "rb") as attachment:
                part = MIMEBase('application', 'octet-stream')
                part.set_payload(attachment.read())
            
            encoders.encode_base64(part)
            part.add_header(
                'Content-Disposition',
                f'attachment; filename= {file_path.split("/")[-1]}'
            )
            msg.attach(part)
        except Exception as e:
            print(f"Ошибка прикрепления файла {file_path}: {e}")
    
    # Отправляем email
    try:
        server = smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT)
        server.starttls()
        server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
        text = msg.as_string()
        server.sendmail(settings.SMTP_USER, settings.APPLICATIONS_EMAIL, text)
        server.quit()
        print(f"Email успешно отправлен для заявки {application.id}")
    except Exception as e:
        print(f"Ошибка отправки email: {e}")
        raise e

