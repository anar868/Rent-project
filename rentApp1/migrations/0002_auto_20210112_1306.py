# Generated by Django 3.1.4 on 2021-01-12 09:06

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('rentApp1', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='elan',
            name='created_at',
            field=models.DateField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='elan',
            name='updated_at',
            field=models.DateField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='elan',
            name='description',
            field=models.TextField(max_length=200),
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('body', models.TextField(max_length=1500, null=True)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('verified', models.BooleanField(default=False)),
                ('rating', models.CharField(choices=[('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5')], max_length=50)),
                ('elan', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rentApp1.elan')),
            ],
        ),
    ]
