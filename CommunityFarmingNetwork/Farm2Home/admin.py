from django.contrib import admin
from .models import UserProfile,Product, Cart
# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Product)
admin.site.register(Cart)

# @admin.register(Product)
# class ProductAdmin(admin.ModelAdmin):
#     list_display = ('name', 'price')  # Show these fields in the admin list view
#     search_fields = ('name',)  # Enable search by product name

# @admin.register(Cart)
# class CartAdmin(admin.ModelAdmin):
#     list_display = ('user', 'product', 'quantity')  # Show these fields
#     list_filter = ('user',)  # Add filter by user