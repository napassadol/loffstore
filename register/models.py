from django.db import models
from django import forms
from django.contrib.postgres.fields import JSONField

class User(models.Model):
    user_img = models.ImageField(upload_to = 'user/', default = 'none/noimage.jpg')
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=256)
    firstname = models.CharField(max_length=20, default='')
    lastname = models.CharField(max_length=20, default='')
    factory_name = models.CharField(max_length=20, default='')
    email = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    user_type = models.CharField(max_length=20, default='')
    verify = models.BooleanField(default=False, blank=True)

    location = JSONField(blank=True, default={})
    detail = JSONField(blank=True, default={})
    age = models.IntegerField(default=0)
    area = models.IntegerField(default=0)

    prop_img_0 = models.ImageField(upload_to = 'user/prop', default = 'none/noimage.jpg')
    prop_img_1 = models.ImageField(upload_to = 'user/prop', default = 'none/noimage.jpg')
    prop_img_2 = models.ImageField(upload_to = 'user/prop', default = 'none/noimage.jpg')
    prop_img_3 = models.ImageField(upload_to = 'user/prop', default = 'none/noimage.jpg')

    def __str__(self):
        return self.username
