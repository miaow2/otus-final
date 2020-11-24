import logging
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
LOGGING = getattr(configuration, "LOGGING", {})

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

# Authentication backends
AUTHENTICATION_BACKENDS = ["django.contrib.auth.backends.ModelBackend"]

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

#
# LDAP authentication (optional)
#

try:
    from netwatcher import ldap_config as LDAP_CONFIG
except ImportError:
    LDAP_CONFIG = None

if LDAP_CONFIG is not None:

    # Check that django_auth_ldap is installed
    try:
        import django_auth_ldap
        import ldap
    except ModuleNotFoundError as e:
        if getattr(e, "name") == "django_auth_ldap":
            raise ImproperlyConfigured(
                "LDAP authentication has been configured, but django-auth-ldap is not installed."
            )
        raise e

    # Required configuration parameters
    try:
        AUTH_LDAP_SERVER_URI = getattr(LDAP_CONFIG, "AUTH_LDAP_SERVER_URI")
    except AttributeError:
        raise ImproperlyConfigured(
            "Required parameter AUTH_LDAP_SERVER_URI is missing from ldap_config.py."
        )

    # Optional configuration parameters
    AUTH_LDAP_ALWAYS_UPDATE_USER = getattr(
        LDAP_CONFIG, "AUTH_LDAP_ALWAYS_UPDATE_USER", True
    )
    AUTH_LDAP_AUTHORIZE_ALL_USERS = getattr(
        LDAP_CONFIG, "AUTH_LDAP_AUTHORIZE_ALL_USERS", False
    )
    AUTH_LDAP_BIND_AS_AUTHENTICATING_USER = getattr(
        LDAP_CONFIG, "AUTH_LDAP_BIND_AS_AUTHENTICATING_USER", False
    )
    AUTH_LDAP_BIND_DN = getattr(LDAP_CONFIG, "AUTH_LDAP_BIND_DN", "")
    AUTH_LDAP_BIND_PASSWORD = getattr(LDAP_CONFIG, "AUTH_LDAP_BIND_PASSWORD", "")
    AUTH_LDAP_CACHE_TIMEOUT = getattr(LDAP_CONFIG, "AUTH_LDAP_CACHE_TIMEOUT", 0)
    AUTH_LDAP_CONNECTION_OPTIONS = getattr(
        LDAP_CONFIG, "AUTH_LDAP_CONNECTION_OPTIONS", {}
    )
    AUTH_LDAP_DENY_GROUP = getattr(LDAP_CONFIG, "AUTH_LDAP_DENY_GROUP", None)
    AUTH_LDAP_FIND_GROUP_PERMS = getattr(
        LDAP_CONFIG, "AUTH_LDAP_FIND_GROUP_PERMS", False
    )
    AUTH_LDAP_GLOBAL_OPTIONS = getattr(LDAP_CONFIG, "AUTH_LDAP_GLOBAL_OPTIONS", {})
    AUTH_LDAP_GROUP_SEARCH = getattr(LDAP_CONFIG, "AUTH_LDAP_GROUP_SEARCH", None)
    AUTH_LDAP_GROUP_TYPE = getattr(LDAP_CONFIG, "AUTH_LDAP_GROUP_TYPE", None)
    AUTH_LDAP_MIRROR_GROUPS = getattr(LDAP_CONFIG, "AUTH_LDAP_MIRROR_GROUPS", None)
    AUTH_LDAP_MIRROR_GROUPS_EXCEPT = getattr(
        LDAP_CONFIG, "AUTH_LDAP_MIRROR_GROUPS_EXCEPT", None
    )
    AUTH_LDAP_PERMIT_EMPTY_PASSWORD = getattr(
        LDAP_CONFIG, "AUTH_LDAP_PERMIT_EMPTY_PASSWORD", False
    )
    AUTH_LDAP_REQUIRE_GROUP = getattr(LDAP_CONFIG, "AUTH_LDAP_REQUIRE_GROUP", None)
    AUTH_LDAP_NO_NEW_USERS = getattr(LDAP_CONFIG, "AUTH_LDAP_NO_NEW_USERS", False)
    AUTH_LDAP_START_TLS = getattr(LDAP_CONFIG, "AUTH_LDAP_START_TLS", False)
    AUTH_LDAP_USER_QUERY_FIELD = getattr(
        LDAP_CONFIG, "AUTH_LDAP_USER_QUERY_FIELD", None
    )
    AUTH_LDAP_USER_ATTRLIST = getattr(LDAP_CONFIG, "AUTH_LDAP_USER_ATTRLIST", None)
    AUTH_LDAP_USER_ATTR_MAP = getattr(LDAP_CONFIG, "AUTH_LDAP_USER_ATTR_MAP", {})
    AUTH_LDAP_USER_DN_TEMPLATE = getattr(
        LDAP_CONFIG, "AUTH_LDAP_USER_DN_TEMPLATE", None
    )
    AUTH_LDAP_USER_FLAGS_BY_GROUP = getattr(
        LDAP_CONFIG, "AUTH_LDAP_USER_FLAGS_BY_GROUP", {}
    )
    AUTH_LDAP_USER_SEARCH = getattr(LDAP_CONFIG, "AUTH_LDAP_USER_SEARCH", None)

    # Optionally disable strict certificate checking
    if getattr(LDAP_CONFIG, "LDAP_IGNORE_CERT_ERRORS", False):
        ldap.set_option(ldap.OPT_X_TLS_REQUIRE_CERT, ldap.OPT_X_TLS_NEVER)

    # Prepend LDAPBackend to the authentication backends list
    AUTHENTICATION_BACKENDS.insert(0, "django_auth_ldap.backend.LDAPBackend")

    # Enable logging for django_auth_ldap
    # ldap_logger = logging.getLogger("django_auth_ldap")
    # ldap_logger.addHandler(logging.StreamHandler())
    # ldap_logger.setLevel(logging.DEBUG)
