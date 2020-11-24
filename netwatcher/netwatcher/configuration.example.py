import os


# Hashicorp Vault info
VAULT_ADDR = os.getenv("VAULT_ADDR")
VAULT_TOKEN = os.getenv("VAULT_TOKEN")

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = ""

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = []

DATABASE = {
    "NAME": "",
    "USER": "",
    "PASSWORD": "",
    "HOST": "localhost",
    "PORT": "",
    "CONN_MAX_AGE": 300,
    "ENGINE": "django.db.backends.postgresql",
}

# Logging
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "file": {
            "level": "INFO",
            "class": "logging.handlers.RotatingFileHandler",
            "filename": "/var/log/netwatcher.log",
            "maxBytes": 512000,
            "backupCount": 5,
        },
    },
    "loggers": {
        "django": {
            "handlers": ["file"],
            "level": "INFO",
            "propagate": True,
        },
    },
}