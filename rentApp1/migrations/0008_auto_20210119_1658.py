# Generated by Django 3.1.4 on 2021-01-19 12:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rentApp1', '0007_auto_20210119_1426'),
    ]

    operations = [
        migrations.RenameField(
            model_name='elan',
            old_name='bedroomNumber',
            new_name='bedroom_number',
        ),
    ]
