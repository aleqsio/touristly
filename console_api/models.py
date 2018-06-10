import random
import string

from django.db import models


# Create your models here.
class TouristSpotModel(models.Model):
    def __str__(self):
        return self.name

    key = models.CharField(max_length=20, primary_key=True,
                           default=''.join(random.choice(string.ascii_letters + string.digits) for _ in range(20)))
    description = models.CharField(max_length=2000)
    name = models.CharField(max_length=200)


class HelperQuestion(models.Model):
    text = models.CharField(max_length=200)


class TouristSpotImage(models.Model):
    image = models.ImageField(upload_to='data/images', null=True)
    source = models.ForeignKey(TouristSpotModel, on_delete=models.CASCADE)


class UserModel(models.Model):
    name = models.CharField(max_length=200)


class UserPreferenceModel(models.Model):
    choice=models.IntegerField()
    question = models.ForeignKey(HelperQuestion, on_delete=models.CASCADE)
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)