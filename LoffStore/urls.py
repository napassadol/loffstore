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
from apps.user import views as user_views
from apps.product import views as product_views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    
    url(r'^$', apps_views.HomeView),
    url(r'^post_product_sell/?$', product_views.post_product_sell.as_view(), name = 'post_product_sell'),
    url(r'^get_all_products/?$', product_views.get_all_products.as_view(), name = 'get_all_products'),
    url(r'^get_product_info/?$', product_views.get_product_info.as_view(), name = 'get_product_info'),

    url(r'^post_user_image/?$', user_views.post_user_image.as_view(), name = 'post_user_image'),
    url(r'^save_data_register/?$', user_views.save_data_register.as_view(), name = 'register'),
    url(r'^get_user_data/?$', user_views.get_user_data.as_view(), name = 'get_user_data'),
    url(r'^add_information/?$', user_views.add_information.as_view(), name = 'add_information'),

    url(r'^auth_login/?$', apps_views.login.as_view(), name = 'login'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

