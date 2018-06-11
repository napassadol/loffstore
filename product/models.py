from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=20)
    amount = models.IntegerField(default=0)
    owner_id = models.IntegerField(default=0)
    location = models.TextField()
    description = models.TextField()

    def __str__(self):
        return self.name