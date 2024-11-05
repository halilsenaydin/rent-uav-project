from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import LoginView, UsersView, UserView

urlpatterns = [
    path("", UsersView.as_view(), name="users"),
    path("<str:username>", UserView.as_view(), name="user"),
    path("login/", LoginView.as_view(), name="login"),
    path("refresh/", TokenRefreshView.as_view(), name="refresh"),
]
