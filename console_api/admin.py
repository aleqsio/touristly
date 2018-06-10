from django.contrib import admin

# Register your models here.
from console_api.models import TouristSpotModel, TouristSpotImage

admin.site.register(TouristSpotModel)
admin.site.register(TouristSpotImage)
