from django.contrib import admin

# Register your models here.
from console_api.models import TouristSpotModel, TouristSpotImageModel, PersonModel, FlightModel

admin.site.register(TouristSpotModel)
admin.site.register(TouristSpotImageModel)
admin.site.register(PersonModel)
admin.site.register(FlightModel)