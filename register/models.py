from django.db import models
from django import forms

class User(models.Model):
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=200)
    firstname = models.CharField(max_length=20, default='')
    lastname = models.CharField(max_length=20, default='')
    factory_name = models.CharField(max_length=20, default='')
    email = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    user_type = models.CharField(max_length=20, default='')
    verify = models.BooleanField(default=False, blank=True)

    def __str__(self):
        return self.username