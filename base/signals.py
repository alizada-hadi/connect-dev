from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Programmer
from accounts.models import User

@receiver(post_save, sender=User)
def create_programmer(sender, instance, created, **kwargs):
    if created:
        programmer = Programmer.objects.create(user=instance)
        print("programmer created ", programmer)


@receiver(post_save, sender=User)
def save_programmer(sender, instance, **kwargs):
    instance.programmer.save()