from django.contrib.auth import views as auth_views
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
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),

]
