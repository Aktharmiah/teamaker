from os import environ
from sys import path
from django.core.wsgi import get_wsgi_application

path.append( environ["BACKEND_ROOT"] )
application = get_wsgi_application()