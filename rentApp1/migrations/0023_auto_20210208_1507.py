# Generated by Django 3.1.4 on 2021-02-08 11:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rentApp1', '0022_comment_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='title',
            field=models.CharField(max_length=30),
        ),
    ]
