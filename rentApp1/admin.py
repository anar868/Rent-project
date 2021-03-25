from django.contrib import admin
from . import models

admin.site.register(models.Elan)
admin.site.register(models.User)
admin.site.register(models.Image)
admin.site.register(models.Album)
admin.site.register(models.CommentImage)
admin.site.register(models.Comment)



# Register your models here.
