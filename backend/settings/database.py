# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

import os

DATABASES = {

    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': os.environ["DB_NAME"] ,
        'USER': os.environ["DB_USER"] ,
        'PASSWORD': os.environ["DB_PASSWORD"] ,
        'PORT': os.environ["DB_PORT"],
        'HOST': 'db',
    }
}

DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'