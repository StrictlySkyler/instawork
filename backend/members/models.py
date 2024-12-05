from django.db import models


class Member(models.Model):
  first_name = models.CharField(max_length=50)
  last_name = models.CharField(max_length=50)
  email = models.CharField(max_length=50)
  phone = models.CharField(max_length=15)