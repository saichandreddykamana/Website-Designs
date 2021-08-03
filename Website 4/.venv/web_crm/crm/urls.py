from . import views
from django.urls import path, include

urlpatterns = [
    path('', views.home, name='home'),
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('demo', views.demo, name='demo'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('password_reset/', views.password_reset, name='password_reset'),
    path('log_out/', views.log_out, name='Log Out'),
    path('oauth/', include('social_django.urls', namespace='social')),
]
