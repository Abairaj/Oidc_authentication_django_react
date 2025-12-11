
from django.contrib import admin
from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/callback/",views.Auth0CallbackApiView.as_view(),name='auth_callback'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("auth/profile/",views.ProfileApiView.as_view(),name='user_profile'),
    path("auth/logout/",views.LogoutView.as_view(),name="logout")

]
