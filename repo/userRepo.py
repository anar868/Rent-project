from rentApp1 import forms
from rentApp1.forms import RegistrationForm, LoginForm, UserUpdateForm
from django.contrib.auth import authenticate, login, logout as django_logout
from django.shortcuts import render, redirect
from rentApp1.models import Elan, Comment
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponseNotFound

class User:
    @staticmethod
    def login(request, render_url, redirect_name):
        if request.method == 'GET':
            return redirect(redirect_name)
        else:
            username = request.POST.get('username', '')
            password = request.POST.get('password', '')
            if not username or not password:
                return render(request, render_url, context={'error_message': 'Invalid',
                                                            'username': username,
                                                            'password': password,
        'register_form': forms.RegistrationForm(),
        'login_form': forms.LoginForm()
                                                            })
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                if request.user.is_superuser:
                    return redirect('admin_verify')
        return redirect(redirect_name)

    @staticmethod
    def logout(request):
        django_logout(request)
        return redirect('home')

    @staticmethod
    def register(request, redirect_name):
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.author = request.user
            user.save()
            login(request, user)
        return redirect(redirect_name)

    @staticmethod
    def update(request):
        if request.user.is_authenticated:
            if request.method == "GET":
                form = UserUpdateForm(instance=request.user)
            else:
                form = UserUpdateForm(request.POST, request.FILES, instance=request.user)
                if form.is_valid():
                    user = form.save(commit=False)
                    password = form.cleaned_data['password_new']
                    if password:
                        user.set_password(password)
                    user.save()
                    login(request, user)
                    return redirect('update_user')
            return render(request, 'userUpdate.html', {'form': form,

                          'register_form': forms.RegistrationForm(),
                                           'login_form': forms.LoginForm()
                                                       })
        else:
            return redirect('home')

    @staticmethod
    def update_img(request):
        if request.method == "GET":
            return redirect("update_user")
        else:
            pfp_flag = request.POST.get("pfpwhether")
            if pfp_flag:
                img = request.FILES.get("pfp")
                print(img)
                request.user.pfp = img
            else:
                request.user.pfp.delete()
            request.user.save()
            return redirect("update_user")





