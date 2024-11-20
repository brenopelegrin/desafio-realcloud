FROM python:3.10-slim-bullseye
COPY . /app
ENV DATABASE_URL postgres://postgres:password@localhost:5432/hrmanager
ENV AMQP_URL redis://localhost:6379
ENV FRONTEND_URL http://localhost:5173
ENV GUNICORN_WORKERS 3
ENV GUNICORN_THREADS 1
EXPOSE 8080
RUN pip install --no-cache-dir -r /app/requirements.txt
WORKDIR /app
ENTRYPOINT gunicorn --conf /app/gunicorn.conf.py app:app

