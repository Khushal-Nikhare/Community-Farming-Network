from django.contrib import admin
from .models import (
    TradingProfile,
    UserProfile,
    Product,
    Cart,
    ChatMessage,
    SellerProduct,
)

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Product)
admin.site.register(Cart)
admin.site.register(TradingProfile)
admin.site.register(ChatMessage)
admin.site.register(SellerProduct)
