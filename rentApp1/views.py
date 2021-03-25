from django.db.models import Q
from django.shortcuts import render, redirect
import math

from repo.elanRepo import ElanRepo
from django.contrib.postgres.search import TrigramSimilarity

from . import forms
from .models import Elan, Comment
from django.contrib import messages
from rentApp1.forms import RegistrationForm, ElanForm, UserUpdateForm, PostUpdateForm, LoginForm
from repo.userRepo import User
from repo.adminVerifyRepo import AdminVerify
from repo.userAdRepo import UserAd
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponseNotFound, HttpResponse
from django.contrib.auth import logout as django_logout, get_user_model, authenticate
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
import functools

User_Model = get_user_model()


def home_view(request):
    # elanlar = ElanRepo(request)+
    search_term = request.GET.get('q', 1)
    elanlar = Elan.objects.filter(address__trigram_similar=search_term)
    return render(request, 'index.html', context={
        'elanlar': elanlar,
        'register_form': forms.RegistrationForm(),
        'login_form': forms.LoginForm()
    })


def authenticate_user(request):
    # elanlar = ElanRepo(request)+
    search_term = request.GET.get('q', 1)
    elanlar = Elan.objects.filter(address__trigram_similar=search_term)
    return render(request, 'authenticate.html', context={
        'elanlar': elanlar,
        'register_form': forms.RegistrationForm(),
        'login_form': forms.LoginForm()
    })


def login(request):
    return User.login(request, 'index.html', 'home')


def logout(request):
    return User.logout(request)


def ads(request):
    elanlar = Elan.objects.filter(verified=True, not_accepted=False).order_by('-updated_at')
    selected_city = request.GET.get("city", "")
    selected_isRent = request.GET.get("isRent", "")
    selected_flat = request.GET.get("isFlat", "")
    search_term = request.GET.get('q', '')
    min_price = request.GET.get('min_price', '')
    max_price = request.GET.get('max_price', '')
    min_room = request.GET.get('min_room', '')
    max_room = request.GET.get('max_room', '')
    sortBy = request.GET.get('sort', '-updated_at')
    try:
        tryElan = Elan.objects.filter(price__gte=min_price)
    except:
        min_price = 0
    try:
        tryElan = Elan.objects.filter(bedroom_number__gte=min_room)
    except:
        min_room = 0

    if selected_city == "all":
        selected_city = ""

    if selected_isRent == "all":
        selected_isRent = ""

    if selected_flat == "all":
        selected_flat = ""

    elanlar = elanlar.filter(city__icontains=selected_city, isRent__icontains=selected_isRent,
                             isFlat__icontains=selected_flat, price__gte=min_price, bedroom_number__gte=min_room)
    try:
        elanlar = elanlar.filter(price__lte=max_price)
    except:
        pass

    try:
        elanlar = elanlar.filter(bedroom_number__lte=max_room)
    except:
        pass

    if request.GET.get('q') is not None:
        try:
            search_term = int(search_term)
            elanlar = Elan.objects.filter(id=search_term)
        except:
            elanlar = Elan.objects.filter(
                Q(city__trigram_similar=search_term) | Q(owner__username__icontains=search_term))
    try:
        elanlar = elanlar.order_by(sortBy)
    except:
        sortBy = '-updated_at'
        elanlar = elanlar.order_by('-updated_at')

    selected_city_2 = request.GET.get("city", "")
    selected_isRent_2 = request.GET.get("isRent", "")
    selected_flat_2 = request.GET.get("isFlat", "")
    if not elanlar:
        return render(request, 'ads.html', {
            'elanlar': elanlar,
        'register_form': forms.RegistrationForm(),
        'login_form': forms.LoginForm(),
            'message': 'Elan tapılmadı',
            'selected_city': selected_city_2,
            'selected_isRent': selected_isRent_2,
            'selected_flat': selected_flat_2,
            'search_term': search_term,
            'min_price': min_price,
            'max_price': max_price,
            'min_room': min_room,
            'max_room': max_room,
            'sortBy': sortBy
        })
    return render(request, 'ads.html', context={
        'elanlar': elanlar,
        'register_form': forms.RegistrationForm(),
        'login_form': forms.LoginForm(),
        'selected_city': selected_city_2,
        'selected_isRent': selected_isRent_2,
        'selected_flat': selected_flat_2,
        'search_term': search_term,
        'min_price': min_price,
        'max_price': max_price,
        'min_room': min_room,
        'max_room': max_room,
        'sortBy': sortBy
    })


@csrf_exempt
def check_username(request):
    if request.method == 'GET':
        return redirect('home')
    check = request.POST.get("check")
    if check == "registration_username":
        username = request.POST.get("username")
        try:
            user = User_Model.objects.get(username=username)
            return HttpResponse(True)
        except:
            return HttpResponse(False)
    elif check == "registration_email":
        email = request.POST.get("email")
        try:
            user = User_Model.objects.get(email=email)
            return HttpResponse(True)
        except:
            return HttpResponse(False)
    elif check == "login":
        username = request.POST.get("username")
        pwd = request.POST.get("password")
        user = authenticate(username=username, password=pwd)
        if user is not None:
            return HttpResponse(True)
        else:
            return HttpResponse(False)


@csrf_exempt
def check_internet_connection(request):
    if request.method == 'GET':
        return redirect('home')
    elif request.method == "POST":
        return HttpResponse(True)


def register_user(request):
    return User.register(request, 'home')


def advertise(request):
    return ElanRepo.advertise(request)


def view_ad(request, post_id):
    return ElanRepo.view(request, post_id)


def update_user(request):
    return User.update(request)


def update_user_img(request):
    return User.update_img(request)


def update_post(request, post_id):
    return ElanRepo.update(request, post_id)


def listing_of_user(request):
    return UserAd.listing(request)


def admin_verify_page(request):
    return AdminVerify.admin_verify_page(request, 'home')


def admin_verify_ads(request):
    return AdminVerify.admin_verify_ads(request, 'home')


def admin_ads_all(request):
    return AdminVerify.admin_ads_all(request, 'home')


def admin_verified_ads(request):
    return AdminVerify.admin_verified_ads(request, 'home')


def admin_deleted_ads(request):
    return AdminVerify.admin_deleted_ads(request, 'home')


def admin_view_ads(request, post_id):
    return AdminVerify.admin_view_ads(request, 'home', post_id)


def admin_users_all(request):
    return AdminVerify.admin_users_all(request, 'home')


def admin_verify_comments(request):
    return AdminVerify.admin_verify_comments(request, 'home')


def admin_comments_all(request):
    return AdminVerify.admin_comments_all(request, 'home')


def admin_verified_comments(request):
    return AdminVerify.admin_verified_comments(request, 'home')


def admin_deleted_comments(request):
    return AdminVerify.admin_deleted_comments(request, 'home')


def user_view_ads(request, post_id):
    return UserAd.user_view_ads(request, 'home', post_id)


def user_update_post(request, post_id):
    return ElanRepo.update(request, post_id)


def user_waiting_ads(request):
    return UserAd.waiting_ads(request, 'home')


def user_verified_ads(request):
    return UserAd.verified_ads(request, 'home')


def user_unverified_ads(request):
    return UserAd.unverified_ads(request, 'home')


def comments_of_user(request):
    return UserAd.comments_all(request, 'home')


def user_waiting_comments(request):
    return UserAd.waiting_comments(request, 'home')


def user_verified_comments(request):
    return UserAd.verified_comments(request, 'home')


def user_unverified_comments(request):
    return UserAd.unverified_comments(request, 'home')













