from django.conf import settings
from django.contrib.auth.models import User
from django.db import models


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    mobile = models.CharField(max_length=15)

    def __str__(self):
        return self.user.username


class TradingProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    tradingName = models.CharField(max_length=255, null=False)
    address = models.TextField()
    mobile = models.CharField(max_length=15)
    upi_connected = models.BooleanField(default=False)
    dob = models.DateField()
    aadhar = models.CharField(max_length=12)
    pan = models.CharField(max_length=10)
    accountNumber = models.CharField(max_length=20)
    ifsc = models.CharField(max_length=15)

    def __str__(self):
        return self.tradingName


class Product(models.Model):
    CATEGORY_CHOICES = [
        ("Vegetables", "Vegetables"),
        ("Fruits", "Fruits"),
        ("Grains", "Grains"),
    ]

    PRICE_PER_UNIT = [
        ("Kg", "Kg"),
        ("500g", "500g"),
        ("Dozen", "Dozen"),
        ("Bundle", "Bundle"),
    ]

    RETURN_POLICY_TIME_IN_HOURS = [
        ("7days", "168"),
        ("3days", "72"),
        ("1day", "24"),
        ("nonreturnable", "0"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    productId = models.AutoField(primary_key=True)
    productName = models.CharField(max_length=255)
    productCategory = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        default="Vegetables",
    )
    productDescription = models.TextField()
    productImage = models.ImageField(
        upload_to="photos/",
        default="photos/default.jpg",
    )
    productPrice = models.DecimalField(max_digits=10, decimal_places=2)
    stockQuantity = models.PositiveIntegerField(default=0)
    pricePerUnit = models.CharField(
        max_length=20,
        choices=PRICE_PER_UNIT,
        default="Kg",
    )
    productDiscount_inPercentage = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    returnPolicy_inHours = models.CharField(
        max_length=13,
        choices=RETURN_POLICY_TIME_IN_HOURS,
        default=0,
    )
    organicCertified = models.BooleanField(default=False)
    pesticidefree = models.BooleanField(default=False)
    freshHarvested = models.BooleanField(default=False)
    naturalFarming = models.BooleanField(default=False)
    average_rating = models.FloatField(default=0.0)
    
    def __str__(self):
        return str(self.productId) + " - " + self.productName

class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='ratings', on_delete=models.CASCADE)
    rating = models.IntegerField(
        choices=[(i, i) for i in range(1, 6)],  # Ratings from 1 to 5
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'product')  # One rating per user per product

    def __str__(self):
        return f"{self.user.username} rated {self.product.productName} with {self.rating}"

class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.user.username} - {self.product.productName} ({self.quantity})"
