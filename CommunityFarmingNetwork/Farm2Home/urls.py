from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('cart/', views.cart, name="cart"),
    path('help/', views.help, name="help"),
    path('login/', views.login, name="login"),
    path('order/', views.order, name="order"),
    path('product/', views.product, name="product"),
    path('seller/', views.seller, name="seller"),
    path('profile/', views.profile, name="profile"),
    path('wishlist/', views.wishlist, name="wishlist"),
]
