from django.db import models
from django.contrib.postgres.fields import JSONField
from django.utils import timezone
from apps.user.models import User

# Create your models here.
class Product(models.Model):
    BUY = 0
    SELL = 1
    POST_TYPE_CHOICE = [
        (BUY, "Buy"),
        (SELL, "Sell"),
    ]

    name = models.CharField(max_length=10, default='')
    product_img_0 = models.ImageField(upload_to = 'image/product/', default = 'image/none/noimage.jpg')
    product_img_1 = models.ImageField(upload_to = 'image/product/', default = 'image/none/noimage.jpg')
    product_img_2 = models.ImageField(upload_to = 'image/product/', default = 'image/none/noimage.jpg')
    product_img_3 = models.ImageField(upload_to = 'image/product/', default = 'image/none/noimage.jpg')
    area = models.IntegerField(default=0)
    price = models.IntegerField(default=0)
    discount = models.IntegerField(default=0)
    unit = models.CharField(max_length=5, default='')
    date = models.DateTimeField(default=timezone.now, editable=False, blank=True)
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    post_type = models.IntegerField(choices = POST_TYPE_CHOICE, default=0)
    location = JSONField(blank=True, default={})
    description = models.TextField(default='')
    verify = models.BooleanField(default=False, blank=True)

    def __str__(self):
        return self.name

class SampleImage(models.Model):
    index = models.IntegerField(default=0)
    image = models.ImageField(upload_to = 'image/sample/', default = 'image/none/noimage.jpg')
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.index)