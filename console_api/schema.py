from graphene_django import DjangoObjectType
import graphene
from graphene import relay

from console_api.models import TouristSpotModel


class TouristSpot(DjangoObjectType):
    class Meta:
        model = TouristSpotModel
        filter_fields = ['name', 'key', 'description']


class Query(graphene.ObjectType):
    all_tourist_Spots = graphene.List(TouristSpot)
    tourist_spot = graphene.Field(TouristSpot, key=graphene.String())

    def resolve_tourist_spot(self,info,**kwargs):
        print(info.context.META.get('HTTP_AUTHORIZATION'))
        key = kwargs.get('key')
        return TouristSpotModel.objects.get(key=key)

    def resolve_all_tourist_Spots(self, _):
        return TouristSpotModel.objects.all()


schema = graphene.Schema(query=Query)
