import os, sys

from django.core.wsgi import get_wsgi_application

sys.path.append( os.environ["APP_ENTRYPOINT"] )

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lmc.settings')

application = get_wsgi_application()