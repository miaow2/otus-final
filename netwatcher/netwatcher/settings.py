import os
from django.core.exceptions import ImproperlyConfigured


# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Import configuration parameters
try:
    from netwatcher import configuration
except ImportError:
    raise ImproperlyConfigured(
        "Configuration file is not present. Please define netwatcher/netwatcher/configuration.py per the documentation."
    )

# Setting required parameters
ALLOWED_HOSTS = getattr(configuration, "ALLOWED_HOSTS")
SECRET_KEY = getattr(configuration, "SECRET_KEY")
DEBUG = getattr(configuration, "DEBUG")
VAULT_ADDR = getattr(configuration, "VAULT_ADDR")
VAULT_TOKEN = getattr(configuration, "VAULT_TOKEN")

# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "django_filters",
    "rest_framework",
    "rest_framework.authtoken",
    "django_celery_results",
    "frontend",
    "jobs",
    "users",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "netwatcher.urls"

TEMPLATES_DIR = BASE_DIR + "/templates"
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [TEMPLATES_DIR],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "netwatcher.wsgi.application"

# Database
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
    }
}


# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
LANGUAGE_CODE = "en-us"

TIME_ZONE = "Europe/Moscow"

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# STATIC_ROOT = os.path.join(BASE_DIR, "/static")
STATIC_ROOT = BASE_DIR + "/static"
STATIC_URL = "/static/"
STATICFILES_DIRS = (os.path.join(BASE_DIR, "project-static"),)

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": (
        # "rest_framework.permissions.IsAuthenticated",
        # "school.permissions.WriteAccessPermission",
    ),
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.TokenAuthentication",
        # "rest_framework.authentication.BasicAuthentication",
    ],
    "DEFAULT_FILTER_BACKENDS": ("django_filters.rest_framework.DjangoFilterBackend",),
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.LimitOffsetPagination",
    "PAGE_SIZE": 50,
}

# This sets the django-celery-results backend
CELERY_RESULT_BACKEND = "django-db"

# Enable CORS headers
CORS_ALLOW_ALL_ORIGINS = True
