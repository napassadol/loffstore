# Generated by Django 2.0.6 on 2018-06-22 16:56

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_admin'),
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_date', models.DateTimeField(blank=True, default=django.utils.timezone.now, editable=False)),
                ('approve_date', models.DateTimeField(blank=True, null=True)),
                ('unit', models.CharField(default='', max_length=5)),
                ('amount', models.IntegerField(default=0)),
                ('price', models.IntegerField(default=0)),
                ('description', models.TextField(default='')),
                ('verify', models.BooleanField(default=False)),
                ('approver', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='user.Admin')),
            ],
        ),
        migrations.RenameField(
            model_name='product',
            old_name='area',
            new_name='amount',
        ),
        migrations.AddField(
            model_name='product',
            name='approver',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='user.Admin'),
        ),
        migrations.AlterField(
            model_name='product',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.User'),
        ),
        migrations.AddField(
            model_name='transaction',
            name='product',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='product.Product'),
        ),
        migrations.AddField(
            model_name='transaction',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='user.User'),
        ),
    ]