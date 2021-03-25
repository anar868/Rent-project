from django.http import HttpResponseNotFound
from django.shortcuts import render, redirect
from rentApp1.models import Elan, Comment
from django.db.models import Q
from django.contrib.auth import get_user_model
from .starRating import starsort

User = get_user_model()


class AdminVerify:

    @staticmethod
    def admin_verify_page(request, redirect_name):
        if request.user.is_superuser:
            return render(request, 'admin_page.html')
        else:
            return redirect(redirect_name)

    @staticmethod
    def admin_verify_ads(request, redirect_name):
        if request.user.is_superuser:
            elanlar = Elan.objects.filter(verified=False, not_accepted=False).order_by('-updated_at')
            if request.GET.get('q') is not None:
                search_term = request.GET.get('q')
                try:
                    search_term = int(search_term)
                    elanlar = Elan.objects.filter(verified=False, not_accepted=False).filter(id=search_term)
                except:
                    elanlar = Elan.objects.filter(verified=False, not_accepted=False).filter(Q(city__trigram_similar=search_term) | Q(owner__username__icontains=search_term)).order_by('-updated_at')
            if request.method == "POST":
                if 'verify' in request.POST:
                    elan = Elan.objects.get(id=request.POST.get("post_id"))
                    elan.verified = True
                    elan.not_accepted = False
                    elan.save()
                    return redirect('admin_verify_ads')
                elif 'cancel' in request.POST:
                    elan = Elan.objects.get(id=request.POST.get("post_id"))
                    elan.verified = False
                    elan.not_accepted = True
                    elan.save()
                    return redirect('admin_verify_ads')
                elif 'delete' in request.POST:
                    elan = Elan.objects.get(id=request.POST.get("post_id"))
                    elan.delete()
                    return redirect('admin_verify_ads')
            if not elanlar:
                return render(request, 'admin_verify_ads.html', {
                    'message': 'Elan tapılmadı',
                    'active': 'verify'
                })
            return render(request, 'admin_verify_ads.html', {
                'elanlar': elanlar,
                'active': 'verify'
            })
        else:
            return redirect(redirect_name)

    @staticmethod
    def admin_ads_all(request, redirect_name):
        if request.user.is_superuser:
            elanlar = Elan.objects.all().order_by('-updated_at')
            if request.GET.get('q') is not None:
                search_term = request.GET.get('q')
                try:
                    search_term = int(search_term)
                    elanlar = Elan.objects.filter(id=search_term)
                except:
                    elanlar = Elan.objects.filter(Q(city__trigram_similar=search_term) | Q(owner__username__icontains=search_term)).order_by('-updated_at')
            if request.method == "POST":
                if 'verify' in request.POST:
                    elan = Elan.objects.get(id=request.POST.get("post_id"))
                    elan.verified = True
                    elan.not_accepted = False
                    elan.save()
                    return redirect('admin_ads_all')
                elif 'cancel' in request.POST:
                    elan = Elan.objects.get(id=request.POST.get("post_id"))
                    elan.verified = False
                    elan.not_accepted = True
                    elan.save()
                    return redirect('admin_ads_all')
                elif 'delete' in request.POST:
                    elan = Elan.objects.get(id=request.POST.get("post_id"))
                    elan.delete()
                    return redirect('admin_ads_all')
            if not elanlar:
                return render(request, 'admin_verify_ads.html', {
                    'message': 'Elan tapılmadı',
                    'active': 'all'
                })
            return render(request, 'admin_verify_ads.html', {
                'elanlar': elanlar,
                'active': 'all'
            })
        else:
            return redirect(redirect_name)

    @staticmethod
    def admin_verified_ads(request, redirect_name):
        if request.user.is_superuser:
            elanlar = Elan.objects.filter(verified=True, not_accepted=False).order_by('-updated_at')
            if request.GET.get('q') is not None:
                search_term = request.GET.get('q')
                try:
                    search_term = int(search_term)
                    elanlar = Elan.objects.filter(verified=True, not_accepted=False).filter(id=search_term)
                except:
                    elanlar = Elan.objects.filter(verified=True, not_accepted=False).filter(
                        Q(city__trigram_similar=search_term) | Q(owner__username__icontains=search_term)).order_by(
                        '-updated_at')
            if request.method == "POST":
                if 'cancel' in request.POST:
                    elan = Elan.objects.get(id=request.POST.get("post_id"))
                    elan.verified = False
                    elan.not_accepted = True
                    elan.save()
                    return redirect('admin_verified_ads')
                elif 'delete' in request.POST:
                    elan = Elan.objects.get(id=request.POST.get("post_id"))
                    elan.delete()
                    return redirect('admin_verified_ads')
            if not elanlar:
                return render(request, 'admin_verify_ads.html', {
                    'message': 'Elan tapılmadı',
                    'active': 'verified'
                })
            return render(request, 'admin_verify_ads.html', {
                'elanlar': elanlar,
                'active': 'verified'
            })
        else:
            return redirect(redirect_name)

    @staticmethod
    def admin_deleted_ads(request, redirect_name):
        if request.user.is_superuser:
            elanlar = Elan.objects.filter(verified=False, not_accepted=True).order_by('-updated_at')
            if request.GET.get('q') is not None:
                search_term = request.GET.get('q')
                try:
                    search_term = int(search_term)
                    elanlar = Elan.objects.filter(verified=False, not_accepted=True).filter(id=search_term)
                except:
                    elanlar = Elan.objects.filter(verified=False, not_accepted=True).filter(
                        Q(city__trigram_similar=search_term) | Q(owner__username__icontains=search_term)).order_by(
                        '-updated_at')
            if request.method == "POST":
                if 'verify' in request.POST:
                    elan = Elan.objects.get(id=request.POST.get("post_id"))
                    elan.verified = True
                    elan.not_accepted = False
                    elan.save()
                    return redirect('admin_deleted_ads')
                elif 'delete' in request.POST:
                    elan = Elan.objects.get(id=request.POST.get("post_id"))
                    elan.delete()
                    return redirect('admin_deleted_ads')
            if not elanlar:
                return render(request, 'admin_verify_ads.html', {
                    'message': 'Elan tapılmadı',
                    'active': 'deleted'
                })
            return render(request, 'admin_verify_ads.html', {
                'elanlar': elanlar,
                'active': 'deleted'
            })
        else:
            return redirect(redirect_name)

    @staticmethod
    def admin_view_ads(request, redirect_name, post_id):
        if request.user.is_superuser:
            try:
                post = Elan.objects.get(id=post_id)
                if request.method == "POST":
                    if 'verify' in request.POST:
                        elan = Elan.objects.get(id=request.POST.get("post_id"))
                        elan.verified = True
                        elan.not_accepted = False
                        elan.save()
                        return redirect('admin_verified_ads')
                    elif 'cancel' in request.POST:
                        elan = Elan.objects.get(id=request.POST.get("post_id"))
                        elan.verified = False
                        elan.not_accepted = True
                        elan.save()
                        return redirect('admin_deleted_ads')
                    elif 'delete' in request.POST:
                        elan = Elan.objects.get(id=request.POST.get("post_id"))
                        elan.delete()
                        return redirect('admin_ads_all')
                return render(request, 'ad_view.html', {
                    'post': post,
                })
            except:
                return HttpResponseNotFound()
        else:
            return redirect(redirect_name)

    @staticmethod
    def admin_users_all(request, redirect_name):
        if request.user.is_superuser:
            users = User.objects.all()
            if request.GET.get('q') is not None:
                search_term = request.GET.get('q')
                try:
                    search_term = int(search_term)
                    users = User.objects.filter(id=search_term)
                except:
                    users = User.objects.filter(Q(username__trigram_similar=search_term) | Q(username__icontains=search_term))
            if request.method == "POST":
                if 'delete' in request.POST:
                    user = User.objects.get(id=request.POST.get("user_id"))
                    user.delete()
                    return redirect('admin_users_all')
            if not users:
                return render(request, 'admin_users.html', {
                    'message': 'Istifadəçi tapılmadı'
                })
            return render(request, 'admin_users.html', {
                'users': users
            })
        else:
            return redirect(redirect_name)

    @staticmethod
    def admin_verify_comments(request, redirect_name):
        if request.user.is_superuser:
            comments = Comment.objects.filter(verified=False, not_accepted=False).order_by('-created_at')
            if request.GET.get('q') is not None:
                search_term = request.GET.get('q')
                try:
                    search_term = int(search_term)
                    comments = Comment.objects.filter(verified=False, not_accepted=False).filter(id=search_term)
                except:
                    comments = Comment.objects.filter(verified=False, not_accepted=False).filter(
                        author__username__icontains=search_term).order_by(
                        '-created_at')
            if request.method == "POST":
                if 'verify' in request.POST:
                    comment = Comment.objects.get(id=request.POST.get("post_id"))
                    comment_ad = comment.elan
                    ad_id = comment_ad.id
                    comment.verified = True
                    comment.not_accepted = False
                    comment.save()
                    comment_ad.comment_count = Comment.objects.filter(elan__id=ad_id, not_accepted=False,
                                                                      verified=True).count()
                    comment_ad_comments = Comment.objects.filter(elan__id=ad_id, not_accepted=False, verified=True)
                    comment_ad.rating = starsort(comment_ad_comments)
                    comment_ad.save()
                    return redirect('admin_verify_comments')
                elif 'cancel' in request.POST:
                    comment = Comment.objects.get(id=request.POST.get("post_id"))
                    comment_ad = comment.elan
                    ad_id = comment_ad.id
                    comment.verified = False
                    comment.not_accepted = True
                    comment.save()
                    comment_ad.comment_count = Comment.objects.filter(elan__id=ad_id, not_accepted=False,
                                                                      verified=True).count()
                    comment_ad_comments = Comment.objects.filter(elan__id=ad_id, not_accepted=False, verified=True)
                    comment_ad.rating = starsort(comment_ad_comments)
                    comment_ad.save()
                    return redirect('admin_verify_comments')
                elif 'delete' in request.POST:
                    comment = Comment.objects.get(id=request.POST.get("post_id"))
                    comment_ad = comment.elan
                    ad_id = comment_ad.id
                    comment.delete()
                    comment_ad.comment_count = Comment.objects.filter(elan__id=ad_id, not_accepted=False,
                                                                      verified=True).count()
                    comment_ad_comments = Comment.objects.filter(elan__id=ad_id, not_accepted=False, verified=True)
                    comment_ad.rating = starsort(comment_ad_comments)
                    comment_ad.save()
                    return redirect('admin_verify_comments')
            if not comments:
                return render(request, 'admin_verify_comments.html', {
                    'message': 'Şərh tapılmadı',
                    'active': 'verify'
                })
            return render(request, 'admin_verify_comments.html', {
                'comments': comments,
                'active': 'verify'
            })
        else:
            return redirect(redirect_name)

    @staticmethod
    def admin_comments_all(request, redirect_name):
        if request.user.is_superuser:
            comments = Comment.objects.all().order_by('-created_at')
            if request.GET.get('q') is not None:
                search_term = request.GET.get('q')
                try:
                    search_term = int(search_term)
                    comments = Comment.objects.filter(id=search_term)
                except:
                    comments = Comment.objects.filter(
                        author__username__icontains=search_term).order_by(
                        '-created_at')
            if request.method == "POST":
                if 'verify' in request.POST:
                    comment = Comment.objects.get(id=request.POST.get("post_id"))
                    comment.verified = True
                    comment.not_accepted = False
                    comment_ad = comment.elan
                    ad_id = comment_ad.id
                    comment.save()
                    comment_ad.comment_count = Comment.objects.filter(elan__id=ad_id, not_accepted=False,
                                                                      verified=True).count()
                    comment_ad_comments = Comment.objects.filter(elan__id=ad_id, not_accepted=False, verified=True)
                    comment_ad.rating = starsort(comment_ad_comments)
                    comment_ad.save()
                    return redirect('admin_comments_all')
                elif 'cancel' in request.POST:
                    comment = Comment.objects.get(id=request.POST.get("post_id"))
                    comment_ad = comment.elan
                    ad_id = comment_ad.id
                    comment.verified = False
                    comment.not_accepted = True
                    comment.save()
                    comment_ad.comment_count = Comment.objects.filter(elan__id=ad_id, not_accepted=False,
                                                                      verified=True).count()
                    comment_ad_comments = Comment.objects.filter(elan__id=ad_id, not_accepted=False, verified=True)
                    comment_ad.rating = starsort(comment_ad_comments)
                    comment_ad.save()
                    return redirect('admin_comments_all')
                elif 'delete' in request.POST:
                    comment = Comment.objects.get(id=request.POST.get("post_id"))
                    comment_ad = comment.elan
                    ad_id = comment_ad.id
                    comment.delete()
                    comment_ad.comment_count = Comment.objects.filter(elan__id=ad_id, not_accepted=False,
                                                                      verified=True).count()
                    comment_ad_comments = Comment.objects.filter(elan__id=ad_id, not_accepted=False, verified=True)
                    comment_ad.rating = starsort(comment_ad_comments)
                    comment_ad.save()
                    return redirect('admin_comments_all')
            if not comments:
                return render(request, 'admin_verify_comments.html', {
                    'message': 'Şərh tapılmadı',
                    'active': 'all'
                })
            return render(request, 'admin_verify_comments.html', {
                'comments': comments,
                'active': 'all'
            })
        else:
            return redirect(redirect_name)

    @staticmethod
    def admin_verified_comments(request, redirect_name):
        if request.user.is_superuser:
            comments = Comment.objects.filter(verified=True, not_accepted=False).order_by('-created_at')
            if request.GET.get('q') is not None:
                search_term = request.GET.get('q')
                try:
                    search_term = int(search_term)
                    comments = Comment.objects.filter(verified=True, not_accepted=False).filter(id=search_term)
                except:
                    comments = Comment.objects.filter(verified=True, not_accepted=False).filter(
                        author__username__icontains=search_term).order_by(
                        '-created_at')
            if request.method == "POST":
                if 'cancel' in request.POST:
                    comment = Comment.objects.get(id=request.POST.get("post_id"))
                    comment_ad = comment.elan
                    ad_id = comment_ad.id
                    comment.verified = False
                    comment.not_accepted = True
                    comment.save()
                    comment_ad.comment_count = Comment.objects.filter(elan__id=ad_id, not_accepted=False,
                                                                      verified=True).count()
                    comment_ad_comments = Comment.objects.filter(elan__id=ad_id, not_accepted=False, verified=True)
                    comment_ad.rating = starsort(comment_ad_comments)
                    comment_ad.save()
                    return redirect('admin_verified_comments')
                elif 'delete' in request.POST:
                    comment = Comment.objects.get(id=request.POST.get("post_id"))
                    comment_ad = comment.elan
                    ad_id = comment_ad.id
                    comment.delete()
                    comment_ad.comment_count = Comment.objects.filter(elan__id=ad_id, not_accepted=False,
                                                                      verified=True).count()
                    comment_ad_comments = Comment.objects.filter(elan__id=ad_id, not_accepted=False, verified=True)
                    comment_ad.rating = starsort(comment_ad_comments)
                    comment_ad.save()
                    return redirect('admin_verified_comments')
            if not comments:
                return render(request, 'admin_verify_comments.html', {
                    'message': 'Şərh tapılmadı',
                    'active': 'verified'
                })
            return render(request, 'admin_verify_comments.html', {
                'comments': comments,
                'active': 'verified'
            })
        else:
            return redirect(redirect_name)

    @staticmethod
    def admin_deleted_comments(request, redirect_name):
        if request.user.is_superuser:
            comments = Comment.objects.filter(verified=False, not_accepted=True).order_by('-created_at')
            if request.GET.get('q') is not None:
                search_term = request.GET.get('q')
                try:
                    search_term = int(search_term)
                    comments = Comment.objects.filter(verified=False, not_accepted=True).filter(id=search_term)
                except:
                    comments = Comment.objects.filter(verified=False, not_accepted=True).filter(verified=True, not_accepted=False).filter(
                        author__username__icontains=search_term).order_by(
                        '-created_at')
            if request.method == "POST":
                if 'verify' in request.POST:
                    comment = Comment.objects.get(id=request.POST.get("post_id"))
                    comment_ad = comment.elan
                    ad_id = comment_ad.id
                    comment.verified = True
                    comment.not_accepted = False
                    comment.save()
                    comment_ad.comment_count = Comment.objects.filter(elan__id=ad_id, not_accepted=False, verified=True).count()
                    comment_ad_comments = Comment.objects.filter(elan__id=ad_id, not_accepted=False, verified=True)
                    comment_ad.rating = starsort(comment_ad_comments)
                    comment_ad.save()
                    return redirect('admin_deleted_comments')
                elif 'delete' in request.POST:
                    comment = Comment.objects.get(id=request.POST.get("post_id"))
                    comment_ad = comment.elan
                    ad_id = comment_ad.id
                    comment.delete()
                    comment_ad.comment_count = Comment.objects.filter(elan__id=ad_id, not_accepted=False,
                                                                      verified=True).count()
                    comment_ad_comments = Comment.objects.filter(elan__id=ad_id, not_accepted=False, verified=True)
                    comment_ad.rating = starsort(comment_ad_comments)
                    comment_ad.save()
                    return redirect('admin_deleted_comments')
            if not comments:
                return render(request, 'admin_verify_comments.html', {
                    'message': 'Şərh tapılmadı',
                    'active': 'deleted'
                })
            return render(request, 'admin_verify_comments.html', {
                'comments': comments,
                'active': 'deleted'
            })
        else:
            return redirect(redirect_name)

