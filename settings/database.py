# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

import os

DATABASES = {

    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': os.environ["POSTGRES_DB"] ,
        'USER': os.environ["POSTGRES_USER"] ,
        'PASSWORD': os.environ["POSTGRES_PASSWORD"] ,
        'PORT': os.environ["PGPORT"],
        'HOST': 'db',
    }
}

DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'