from django.db.models.signals import post_save, post_delete
from django.db.models import Avg
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import Rating, UserProfile

@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
    instance.userprofile.save()
    
@receiver(post_save, sender=Rating)
@receiver(post_delete, sender=Rating)
def update_product_average_rating(sender, instance, **kwargs):
    product = instance.product
    average = product.ratings.aggregate(Avg('rating'))['rating__avg'] or 0.0
    product.average_rating = average
    product.save()