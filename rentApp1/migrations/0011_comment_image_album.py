# Generated by Django 3.1.4 on 2021-01-26 18:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rentApp1', '0010_user_pfp'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='image_album',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='rentApp1.album'),
        ),
    ]