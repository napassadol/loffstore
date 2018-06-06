from django.db import models
from django import forms

class User(models.Model):
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=200)
    firstname = models.CharField(max_length=20)
    lastname = models.CharField(max_length=20)
    email = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    verify = models.BooleanField(default=False, blank=True)

    def __str__(self):
        return self.username