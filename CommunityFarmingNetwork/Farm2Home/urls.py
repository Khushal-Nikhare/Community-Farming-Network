from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path("", views.home, name="home"),
    path("cart/", views.cart_view, name="cart"),
    path("add-to-cart/", views.add_to_cart, name="add_to_cart"),
    path("update-cart/", views.update_cart, name="update_cart"),
    path("remove-from-cart/", views.remove_from_cart, name="remove_from_cart"),
    path("get-cart/", views.get_cart, name="get_cart"),
    path("help/", views.help, name="help"),
    path("signup/", views.signup_view, name="signup"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path(
        "password_reset/",
        auth_views.PasswordResetView.as_view(
            template_name="registration/password_reset.html"
        ),
        name="password_reset",
    ),
    path(
        "password_reset/done/",
        auth_views.PasswordResetDoneView.as_view(
            template_name="registration/password_reset_done.html"
        ),
        name="password_reset_done",
    ),
    path(
        "reset/<uidb64>/<token>/",
        auth_views.PasswordResetConfirmView.as_view(
            template_name="registration/password_reset_confirm.html"
        ),
        name="password_reset_confirm",
    ),
    path(
        "reset/done/",
        auth_views.PasswordResetCompleteView.as_view(
            template_name="registration/password_reset_complete.html"
        ),
        name="password_reset_complete",
    ),
    path("mail/", views.test_email),
    path("order/", views.order, name="order"),
    path("product/<int:productId>", views.product, name="product"),
    path("rate-product/", views.rate_product, name="rate_product"),
    path("profile/", views.profile, name="profile"),
    path("wishlist/", views.wishlist, name="wishlist"),
    path(
        "categories/vegetables",
        views.categories_vegetables,
        name="categories_vegetables",
    ),
    path("categories/fruits", views.categories_fruits, name="categories_fruits"),
    path("categories/grains", views.categories_grains, name="categories_grains"),
    path("seller/", views.seller, name="seller"),
    path("seller-profile/", views.seller_profile, name="seller_profile"),
    path("seller/my-product/", views.seller_my_product, name="seller_my_product"),
    path("add-product/", views.add_product, name="add_product"),
    path("asak_ai/", views.asak_ai_page, name="asak_ai_page"),
    path("asak_ai_chat/", views.asak_ai_chat, name="asak_ai_chat"),
]
