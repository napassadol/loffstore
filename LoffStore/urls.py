"""LoffStore URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from apps import views as apps_views
from register import views as register_views
from authentication import views as auth_views
from product import views as product_views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    
    url(r'^$', apps_views.HomeView),
    url(r'^post_product_sell/?$', product_views.post_product_sell.as_view(), name = 'post_product_sell'),
    url(r'^post_sample_image/?$', product_views.post_sample_image.as_view(), name = 'post_sample_image'),
    url(r'^save_data_register/?$', register_views.save_data_register.as_view(), name = 'register'),
    url(r'^auth_login/?$', auth_views.login.as_view(), name = 'login'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

