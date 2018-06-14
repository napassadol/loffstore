from django.db import models
from django.contrib.postgres.fields import JSONField

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=20)
    product_img_0 = models.ImageField(upload_to = 'image/product/', default = 'image/none/noimage.jpg')
    product_img_1 = models.ImageField(upload_to = 'image/product/', default = 'image/none/noimage.jpg')
    product_img_2 = models.ImageField(upload_to = 'image/product/', default = 'image/none/noimage.jpg')
    product_img_3 = models.ImageField(upload_to = 'image/product/', default = 'image/none/noimage.jpg')
    area = models.IntegerField(default=0)
    owner_id = models.IntegerField(default=0)
    location = JSONField(blank=True, default={})
    description = models.TextField()

    def __str__(self):
        return self.name

class SampleImage(models.Model):
    image = models.ImageField(upload_to = 'image/sample/', default = 'image/none/noimage.jpg')