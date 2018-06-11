from django.db import models
from django.contrib.postgres.fields import JSONField

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=20)
    product_img_0 = models.ImageField(upload_to = 'product/', default = 'none/noimage.jpg')
    product_img_1 = models.ImageField(upload_to = 'product/', default = None)
    product_img_2 = models.ImageField(upload_to = 'product/', default = None)
    product_img_3 = models.ImageField(upload_to = 'product/', default = None)
    area = models.IntegerField(default=0)
    owner_id = models.IntegerField(default=0)
    location = JSONField(blank=True, default={})
    description = models.TextField()

    def __str__(self):
        return self.name