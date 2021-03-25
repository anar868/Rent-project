from django.http import HttpResponseNotFound
from django.shortcuts import render, redirect

from rentApp1 import forms
from rentApp1.models import Elan, Comment
from django.db.models import Q
from django.contrib.auth import get_user_model

User = get_user_model()


class UserAd:

    @staticmethod
    def listing(request):
        if request.user.is_authenticated:
            user = request.user
            listing = Elan.objects.filter(owner=user).order_by('-updated_at')
            if request.GET.get('q') is not None:
                search_term = request.GET.get('q')
                try:
                    search_term = int(search_term)
                    listing = Elan.objects.filter(owner=user, id=search_term)
                except:
                    listing = Elan.objects.filter(owner=user, city__trigram_similar=search_term).order_by(
                        '-updated_at')
            if request.method == "POST" and 'delete' in request.POST:
                try:
                    elan = Elan.objects.get(owner=request.user, id=request.POST.get("post_id"))
                    elan.delete()
                except:
                    return redirect('user_listing')
                return redirect('user_listing')
            if not listing:
                message = "Elan tapılmadı"
                return render(request, 'listing.html', {
                    'message': message,
                    'active': 'all',
        'register_form': forms.RegistrationForm(),
        'login_form': forms.LoginForm()
                })
            return render(request, 'listing.html', {
                'listing': listing,
                'active': 'all',
        'register_form': forms.RegistrationForm(),
        'login_form': forms.LoginForm()
            })
        else:
            return redirect('home')

    @staticmethod
    def user_view_ads(request, redirect_name, post_id):
        if request.user.is_authenticated:
            try:
                post = Elan.objects.get(id=post_id, owner=request.user)
                return render(request, 'ad_view.html', {
                    'post': post,
        'register_form': forms.RegistrationForm(),
        'login_form': forms.LoginForm(),
                })
            except:
                return HttpResponseNotFound()
        else:
            return HttpResponseNotFound()

    @staticmethod
    def waiting_ads(request, redirect_name):
        if request.user.is_authenticated:
            listing = Elan.objects.filter(verified=False, not_accepted=False, owner=request.user).order_by(
                '-updated_at')
            if request.GET.get('q') is not None:
                search_term = request.GET.get('q')
                try:
                    search_term = int(search_term)
                    listing = Elan.objects.filter(verified=False, not_accepted=False, owner=request.user).filter(
                        id=search_term)
                except:
                    listing = Elan.objects.filter(verified=False, not_accepted=False, owner=request.user,
                                                  city__trigram_similar=search_term).order_by(
                        '-updated_at')
            if request.method == "POST":
                if 'delete' in request.POST:
                    try:
                        elan = Elan.objects.get(owner=request.user, id=request.POST.get("post_id"))
                        elan.delete()
                    except:
                        return redirect('user_waiting_ads')
                    return redirect('user_waiting_ads')
            if not listing:
                return render(request, 'listing.html', {
                    'message': 'Elan tapılmadı',
                    'active': 'waiting',
        'register_form': forms.RegistrationForm(),
        'login_form': forms.LoginForm()
                })
            return render(request, 'listing.html', {
                'listing': listing,
                'active': 'waiting',
        'register_form': forms.RegistrationForm(),
        'login_form': forms.LoginForm()
            })
        else:
            return redirect(redirect_name)

    @staticmethod
    def verified_ads(request, redirect_name):
        if request.user.is_authenticated:
            listing = Elan.objects.filter(verified=True, not_accepted=False, owner=request.user).order_by('-updated_at')
            if request.GET.get('q') is not None:
                search_term = request.GET.get('q')
                try:
                    search_term = int(search_term)
                    listing = Elan.objects.filter(verified=True, not_accepted=False, owner=request.user).filter(
                        id=search_term)
                except:
                    listing = Elan.objects.filter(verified=True, not_accepted=False, owner=request.user,
                                                  city__trigram_similar=search_term).order_by(
                        '-updated_at')
            if request.method == "POST":
                if 'delete' in request.POST:
                    try:
                        elan = Elan.objects.get(owner=request.user, id=request.POST.get("post_id"))
                        elan.delete()
                    except:
                        return redirect('user_verified_ads')
                    return redirect('user_verified_ads')
            if not listing:
                return render(request, 'listing.html', {
                    'message': 'Elan tapılmadı',
                    'active': 'verified',
        'register_form': forms.RegistrationForm(),
        'login_form': forms.LoginForm()
                })
            return render(request, 'listing.html', {
                'listing': listing,
                'active': 'verified',
        'register_form': forms.RegistrationForm(),
        'login_form': forms.LoginForm()
            })
        else:
            return redirect(redirect_name)

    @staticmethod
    def unverified_ads(request, redirect_name):
        if request.user.is_authenticated:
            listing = Elan.objects.filter(verified=False, not_accepted=True, owner=request.user).order_by('-updated_at')
            if request.GET.get('q') is not None:
                search_term = request.GET.get('q')
                try:
                    search_term = int(search_term)
                    listing = Elan.objects.filter(verified=False, not_accepted=True, owner=request.user).filter(
                        id=search_term)
                except:
                    listing = Elan.objects.filter(verified=False, not_accepted=True, owner=request.user,
                                                  city__trigram_similar=search_term).order_by('-updated_at')
            if request.method == "POST":
                if 'delete' in request.POST:
                    try:
                        elan = Elan.objects.get(owner=request.user, id=request.POST.get("post_id"))
                        elan.delete()
                    except:
                        return redirect('user_unverified_ads')
                    return redirect('user_unverified_ads')
            if not listing:
                return render(request, 'listing.html', {
                    'message': 'Elan tapılmadı',
                    'active': 'unverified',
        'register_form': forms.RegistrationForm(),
        'login_form': forms.LoginForm()
                })
            return render(request, 'listing.html', {
                'listing': listing,
                'active': 'unverified',
        'register_form': forms.RegistrationForm(),
        'login_form': forms.LoginForm()
            })
        else:
            return redirect(redirect_name)

    @staticmethod
    def comments_all(request, redirect_name):
        if request.user.is_authenticated:
            user = request.user
            comments = Comment.objects.filter(author=user).order_by('-created_at')
            if request.method == "POST":
                if 'delete' in request.POST:
                    try:
                        comment = Comment.objects.get(author=user, id=request.POST.get("post_id"))
                        comment_ad = comment.elan
                        ad_id = comment_ad.id
                        comment.delete()
                        comment_ad.comment_count = Comment.objects.filter(elan__id=ad_id, not_accepted=False,
                                                                          verified=True).count()
                        comment_ad.save()
                    except:
                        return redirect('user_comments')
                    return redirect('user_comments')
            if not comments:
                return render(request, 'user_comments.html', {
                    'message': 'Şərh tapılmadı',
                    'active': 'all',
        'register_form': forms.RegistrationForm(),
        'login_form': forms.LoginForm()
                })
            return render(request, 'user_comments.html', {
                'comments': comments,
                'active': 'all',
        'register_form': forms.RegistrationForm(),
        'login_form': forms.LoginForm()
            })
        else:
            return redirect(redirect_name)

    @staticmethod
    def waiting_comments(request, redirect_name):
        if request.user.is_authenticated:
            comments = Comment.objects.filter(author=request.user, verified=False, not_accepted=False).order_by(
                '-created_at')
            if request.method == "POST":
                if 'delete' in request.POST:
                    try:
                        comments = Comment.objects.get(author=request.user, id=request.POST.get("post_id"))
                        comment_ad = comments.elan
                        ad_id = comment_ad.id
                        comments.delete()
                        comment_ad.comment_count = Comment.objects.filter(elan__id=ad_id, not_accepted=False,
                                                                          verified=True).count()
                        comment_ad.save()
                    except:
                        return redirect('user_waiting_comments')
                    return redirect('user_waiting_comments')
            if not comments:
                return render(request, 'user_comments.html', {
                    'message': 'Şərh tapılmadı',
                    'active': 'waiting',
        'register_form': forms.RegistrationForm(),
        'login_form': forms.LoginForm()
                })
            return render(request, 'user_comments.html', {
                'comments': comments,
                'active': 'waiting',
        'register_form': forms.RegistrationForm(),
        'login_form': forms.LoginForm()
            })
        else:
            return redirect(redirect_name)

    @staticmethod
    def verified_comments(request, redirect_name):
        if request.user.is_authenticated:
            comments = Comment.objects.filter(author=request.user, verified=True, not_accepted=False).order_by(
                '-created_at')
            if request.method == "POST":
                if 'delete' in request.POST:
                    try:
                        comment = Comment.objects.get(author=request.user, id=request.POST.get("post_id"))
                        comment_ad = comment.elan
                        ad_id = comment_ad.id
                        comment.delete()
                        comment_ad.comment_count = Comment.objects.filter(elan__id=ad_id, not_accepted=False,
                                                                          verified=True).count()
                        comment_ad.save()
                    except:
                        return redirect('user_verified_comments')
                    return redirect('user_verified_comments')
            if not comments:
                return render(request, 'user_comments.html', {
                    'message': 'Şərh tapılmadı',
                    'active': 'verified',
        'register_form': forms.RegistrationForm(),
        'login_form': forms.LoginForm()
                })
            return render(request, 'user_comments.html', {
                'comments': comments,
                'active': 'verified',
        'register_form': forms.RegistrationForm(),
        'login_form': forms.LoginForm()
            })
        else:
            return redirect(redirect_name)

    @staticmethod
    def unverified_comments(request, redirect_name):
        if request.user.is_authenticated:
            comments = Comment.objects.filter(author=request.user, verified=False, not_accepted=True).order_by(
                '-created_at')
            if request.method == "POST":
                if 'delete' in request.POST:
                    try:
                        comment = Comment.objects.get(author=request.user, id=request.POST.get("post_id"))
                        comment_ad = comment.elan
                        ad_id = comment_ad.id
                        comment.delete()
                        comment_ad.comment_count = Comment.objects.filter(elan__id=ad_id, not_accepted=False,
                                                                          verified=True).count()
                        comment_ad.save()
                    except:
                        return redirect('user_unverified_comments')
                    return redirect('user_unverified_comments')
            if not comments:
                return render(request, 'user_comments.html', {
                    'message': 'Şərh tapılmadı',
                    'active': 'unverified',
                    'register_form': forms.RegistrationForm(),
                    'login_form': forms.LoginForm()
                })
            return render(request, 'user_comments.html', {
                'comments': comments,
                'active': 'unverified',
                'register_form': forms.RegistrationForm(),
                'login_form': forms.LoginForm()
            })
        else:
            return redirect(redirect_name)
