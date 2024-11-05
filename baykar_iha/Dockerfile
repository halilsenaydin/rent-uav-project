FROM python:3.13
WORKDIR /app
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt
RUN pip install setuptools

COPY . .

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
