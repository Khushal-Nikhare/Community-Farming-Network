from django.contrib import admin
from .models import TradingProfile, UserProfile,Product, Cart
# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Product)
admin.site.register(Cart)
admin.site.register(TradingProfile)