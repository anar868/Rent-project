import os
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator


def get_post_img_upload_path(instance, filename):
    return os.path.join('post', f'{instance.album.id}', filename)

def get_pfp_upload_path(instance, filename):
    return os.path.join('profile', f'{instance.id}', f'{instance.first_name}.jpg')


class User(AbstractUser):
    first_name = models.CharField(max_length=150, blank=False, null=False)
    last_name = models.CharField(max_length=150, blank=False, null=False)
    pfp = models.ImageField(null=True, blank=True, upload_to=get_pfp_upload_path)
    email = models.EmailField(blank=False, null=False, unique=True)
    phone = models.CharField(max_length=20, null=False, blank=False)


class Elan(models.Model):
    price = models.PositiveIntegerField()
    title = models.CharField(max_length=45, null=False, blank=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    image_album = models.OneToOneField('Album', on_delete=models.SET_NULL, null=True, blank=True)
    city = models.CharField(max_length=50)
    address = models.CharField(max_length=70)
    location_lat = models.CharField(max_length=100)
    location_lng = models.CharField(max_length=100)
    description = models.TextField(max_length=2000)
    bedroom_number = models.PositiveIntegerField()
    liked = models.BooleanField(default=False)
    rating = models.DecimalField(max_digits=2, decimal_places=1, blank=True, null=True)
    comment_count = models.CharField(max_length=100, default=0)
    verified = models.BooleanField(default=False)
    not_accepted = models.BooleanField(default=False)
    updated_at = models.DateField(auto_now=True, null=False)
    created_at = models.DateField(auto_now_add=True)
    isRent = models.CharField(max_length=50, choices=(
        ('Kirayə',(
         ('Daily', 'Günlük'),
         ('Monthly', 'Aylıq'))
         ),
        ('sale', 'Satış'),
    ), default='Daily')
    isFlat = models.CharField(max_length=50, choices=(
        ('flat', 'Bina evi'),
        ('apartment', 'Həyət evi'),
    ), default='flat')
    area = models.DecimalField(decimal_places=2, max_digits=20, validators=[MinValueValidator(1)])


class Album(models.Model):
    pass


class Image(models.Model):
    image = models.ImageField(upload_to=get_post_img_upload_path, null=False, blank=False)
    album = models.ForeignKey(Album, on_delete=models.CASCADE)


class CommentImage(models.Model):
    image = models.ImageField(upload_to=get_post_img_upload_path, null=True, blank=True)
    album = models.ForeignKey(Album, on_delete=models.CASCADE)


class Comment(models.Model):
    body = models.TextField(max_length=1500, blank=False, null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    elan = models.ForeignKey(Elan, on_delete=models.CASCADE)
    title = models.CharField(max_length=30, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    image_album = models.OneToOneField('Album', on_delete=models.SET_NULL, null=True, blank=True)
    verified = models.BooleanField(default=False)
    not_accepted = models.BooleanField(default=False)
    rating = models.CharField(max_length=50, blank=False, choices=(
        ("1", "1"),
        ("2", "2"),
        ("3", "3"),
        ("4", "4"),
        ("5", "5"),
    ))


