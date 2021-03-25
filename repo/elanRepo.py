from rentApp1 import forms
from rentApp1.models import Elan, Album, Comment
from rentApp1.forms import ElanForm, PostUpdateForm, CommentForm
from django.shortcuts import render, redirect
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponseNotFound
from .userRepo import User

from django.contrib.auth import authenticate, login
from django.shortcuts import redirect


class ElanRepo:
    POST_PER_PAGE = 4

    def __init__(self, request):
        self.request = request
        self.posts = self.get_nth_page()

    @staticmethod
    def get_all_posts():
        return Elan.objects.all()

    @staticmethod
    def get_count_posts():
        return Elan.objects.all().count()

    def get_nth_page(self):
        try:
            page = int(self.request.GET.get('page', 1))
            start = self.POST_PER_PAGE * (page - 1)
            stop = self.POST_PER_PAGE * page
            return Elan.objects.all()[start:stop]
        except ValueError as ve:
            return ve

    @staticmethod
    def add_ad(request):
        elan_form = ElanForm(request.POST, request.FILES)
        if elan_form.is_valid():
            album = Album.objects.create()
            images = request.FILES.getlist('image')
            location_lat = request.POST.get('lat')
            location_lng = request.POST.get('lng')
            for image in images:
                album.image_set.create(image=image)
            elan = elan_form.save(commit=False)
            elan.owner = request.user
            elan.image_album = album
            elan.location_lat = location_lat
            elan.location_lng = location_lng
            elan.save()
            post_id = elan.id
            return redirect(f'/profile/advertisements/{post_id}')
        return redirect('advertise')

    @staticmethod
    def get_one_post(post_id):
        return Elan.objects.get(id=post_id)

    @staticmethod
    def view(request, post_id):
        try:
            post = ElanRepo.get_one_post(post_id)
            comments = Comment.objects.filter(verified=True, not_accepted=False, elan=post)
            if post.verified:
                if request.user.is_authenticated:
                    if request.method == "GET":
                        comment_form = CommentForm()
                        return render(request, 'ad_view.html', {
                            'post': post,
        'register_form': forms.RegistrationForm(),
        'login_form': forms.LoginForm(),
                            'commentForm': comment_form,
                            'comments': comments
                        })
                    else:
                        comment_form = CommentForm(request.POST, request.FILES)
                        if comment_form.is_valid():
                            images = request.FILES.getlist('image')
                            if images:
                                album = Album.objects.create()
                                for image in images:
                                    album.commentimage_set.create(image=image)
                            author = request.user
                            body = request.POST.get('body')
                            rating = request.POST.get('rating')
                            new_comment = comment_form.save(commit=False)
                            new_comment.body = body
                            if images:
                                new_comment.image_album = album
                            new_comment.author = author
                            new_comment.rating = rating
                            new_comment.elan = post
                            new_comment.author = author
                            new_comment.save()
                        return redirect(f'/advertisements/{post_id}')
                else:
                    if request.method == "GET":
                        comment_form = CommentForm()
                        return render(request, 'ad_view.html', {
                            'post': post,
        'register_form': forms.RegistrationForm(),
        'login_form': forms.LoginForm(),
                            'commentForm': comment_form,
                            'comments': comments
                        })
                    elif 'advertiseLog' in request.POST:
                        return User.login(request, 'ad_view.html', f'/advertisements/{post_id}')
                    elif 'advertiseRegister' in request.POST:
                        return User.register(request, f'/advertisements/{post_id}')
                    return redirect(f'/advertisements/{post_id}')
            else:
                return HttpResponseNotFound()
        except ObjectDoesNotExist:
            return HttpResponseNotFound()

    @staticmethod
    def update(request, post_id):
        if request.user.is_authenticated:
            try:
                post = ElanRepo.get_one_post(post_id)
                if not post.owner == request.user:
                    return redirect(f'/advertisements/{post_id}')
                if request.method == "GET":
                    form = PostUpdateForm(instance=post)
                else:
                    form = PostUpdateForm(request.POST, request.FILES, instance=post)
                    if form.is_valid():
                        # album = Album.objects.create()
                        # images = request.FILES.getlist('image')
                        # for image in images:
                        #     album.image_set.create(image=image)
                        # post.image_album = album
                        post.verified = False
                        post.not_accepted = False
                        form.save()
                        post_id = post.id
                        return redirect(f'/profile/advertisements/{post_id}')
                return render(request, 'postUpdate.html', {'form': form,
                                                           'register_form': forms.RegistrationForm(),
                                                           'login_form': forms.LoginForm()
                                                           })
            except ObjectDoesNotExist:
                return HttpResponseNotFound()
        else:
            return redirect('home')


    @staticmethod
    def advertise(request):
        if request.user.is_authenticated:
            if request.method == 'GET':
                elan_form = ElanForm()
                return render(request, 'advertise.html', {'elanForm': elan_form,
                                                          'register_form': forms.RegistrationForm(),
                                                          'login_form': forms.LoginForm()
                                                          })
            else:
                return ElanRepo.add_ad(request)
        else:
            if request.method == 'GET':
                return render(request, 'advertise.html', {

                              'register_form': forms.RegistrationForm(),
                                               'login_form': forms.LoginForm()
                })
            elif 'advertiseLog' in request.POST:
                return User.login(request, 'advertise.html', 'advertise')
            elif 'advertiseRegister' in request.POST:
                return User.register(request, 'advertise')
            return redirect('advertise')







