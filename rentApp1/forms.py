from django.core.exceptions import ValidationError
from django.forms import ModelForm
from django import forms
from django.contrib.auth import get_user_model, password_validation
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .models import Elan, Comment

User = get_user_model()


class LoginForm(AuthenticationForm):
    username = forms.CharField(label='Email / Username')


class RegistrationForm(UserCreationForm):

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'phone', 'password1', 'password2']


class ElanForm(ModelForm):
    image = forms.FileField(widget=forms.ClearableFileInput(attrs={'multiple': True}))
    class Meta:
        model = Elan
        fields = ['isRent', 'isFlat', 'title', 'price', 'area', 'bedroom_number', 'city', 'address', 'description']


class PostUpdateForm(ModelForm):
    class Meta:
        model = Elan
        fields = ['isRent', 'isFlat', 'title', 'price', 'area', 'bedroom_number', 'city', 'address', 'description']


class UserUpdateForm(ModelForm):
    password_new = forms.CharField(required=False, label='Password', widget=forms.PasswordInput(attrs={'autocomplete': 'new-password', 'placeholder': 'Yeni şifrə'}))

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email']


class CommentForm(ModelForm):
    image = forms.FileField(required=False, widget=forms.ClearableFileInput(attrs={'multiple': True}))

    class Meta:
        model = Comment
        fields = ['title', 'body', 'rating']