# Generated by Django 2.0.6 on 2018-06-06 06:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('register', '0002_auto_20180606_1229'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='verify',
            field=models.BooleanField(default=False),
        ),
    ]
