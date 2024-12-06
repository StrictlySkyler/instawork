from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
  first_name = models.CharField(max_length=50)
  last_name = models.CharField(max_length=50)
  email = models.CharField(max_length=50, unique=True)
  phone = models.CharField(max_length=15)