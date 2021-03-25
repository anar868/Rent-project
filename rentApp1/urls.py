from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('', views.home_view, name='home'),
    path('authenticate', views.authenticate_user, name='authenticate'),
    path('login', views.login, name='login'),
    path('check_username', views.check_username, name='check_username'),
    path('check_internet_connection', views.check_internet_connection, name='check_internet_connection'),
    path('profile/admin/', views.admin_verify_page, name='admin_verify'),
    path('profile/admin/ads/verify', views.admin_verify_ads, name='admin_verify_ads'),
    path('profile/admin/ads/verified', views.admin_verified_ads, name='admin_verified_ads'),
    path('profile/admin/ads/deleted', views.admin_deleted_ads, name='admin_deleted_ads'),
    path('profile/admin/ads/<int:post_id>', views.admin_view_ads, name='admin_view_ads'),
    path('profile/admin/ads/all', views.admin_ads_all, name='admin_ads_all'),
    path('profile/admin/users', views.admin_users_all, name='admin_users_all'),
    path('profile/admin/comments/verify', views.admin_verify_comments, name='admin_verify_comments'),
    path('profile/admin/comments/all', views.admin_comments_all, name='admin_comments_all'),
    path('profile/admin/comments/verified', views.admin_verified_comments, name='admin_verified_comments'),
    path('profile/admin/comments/deleted', views.admin_deleted_comments, name='admin_deleted_comments'),
    path('logout', views.logout, name='logout'),
    path('register', views.register_user, name='register'),
    path('profile/advertisements/all', views.listing_of_user, name='user_listing'),
    path('profile/advertisements/waiting', views.user_waiting_ads, name='user_waiting_ads'),
    path('profile/advertisements/verified', views.user_verified_ads, name='user_verified_ads'),
    path('profile/advertisements/unverified', views.user_unverified_ads, name='user_unverified_ads'),
    path('profile/advertisements/<int:post_id>/', views.user_view_ads, name='user_view_ad'),
    path('profile/advertisements/<int:post_id>/edit', views.update_post, name='user_ad_edit'),
    path('profile/comments/all', views.comments_of_user, name='user_comments'),
    path('profile/comments/waiting', views.user_waiting_comments, name='user_waiting_comments'),
    path('profile/comments/verified', views.user_verified_comments, name='user_verified_comments'),
    path('profile/comments/unverified', views.user_unverified_comments, name='user_unverified_comments'),
    path('profile/update', views.update_user, name='update_user'),
    path('profile/update_img', views.update_user_img, name='update_img'),
    path('advertise', views.advertise, name='advertise'),
    path('advertisements/', views.ads, name='ads'),
    path('advertisements/<int:post_id>/', views.view_ad, name='view_ad'),
    path('pass-reset/',
         auth_views.PasswordResetView.as_view(template_name='password_reset_complete.html'),
         name='password_reset'),
    path('pass-reset/done',
         auth_views.PasswordResetDoneView.as_view(template_name='password_reset_done.html'),
         name='password_reset_done'),
    path('pass-reset-confirm/<uidb64>/<token>/',
         auth_views.PasswordResetConfirmView.as_view(template_name='password_reset_confirm.html'),
         name='password_reset_confirm'),
    path('pass-reset-complete/',
         auth_views.PasswordResetCompleteView.as_view(template_name='password_reset_complete.html'),
         name='password_reset_complete')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)