import random
import string

from django.db import models


# Create your models here.

class TouristSpotImageModel(models.Model):
    image = models.ImageField(upload_to='data/images/', null=True)

    def __str__(self):
        return str(self.image)



class TouristSpotModel(models.Model):
    def __str__(self):
        return self.name

    key = models.CharField(max_length=20, primary_key=True,
                           default=''.join(random.choice(string.ascii_letters + string.digits) for _ in range(20)))
    description = models.CharField(max_length=2000)
    name = models.CharField(max_length=200)
    images = models.ManyToManyField(TouristSpotImageModel, related_name='images', default=None)


class PersonModel(models.Model):
    aud = models.CharField(max_length=200)
    likes = models.ManyToManyField(TouristSpotModel, related_name='likes', default=None, blank=True)
    skips = models.ManyToManyField(TouristSpotModel, related_name='skips', default=None, blank=True)


class FlightModel(models.Model):
    departure = models.CharField(max_length=200)
    destination = models.ForeignKey(TouristSpotModel,on_delete=models.CASCADE,related_name="destination")
    price = models.DecimalField(max_digits=6, decimal_places=2)