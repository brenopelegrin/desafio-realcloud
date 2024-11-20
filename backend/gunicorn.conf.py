import os
bind = '[::]:8080'
accesslog = 'gunicorn.log'
errorlog = 'gunicorn.error.log'
loglevel='info'
workers = int(os.getenv('GUNICORN_WORKERS', 1))
threads = int(os.getenv('GUNICORN_THREADS', 1))
