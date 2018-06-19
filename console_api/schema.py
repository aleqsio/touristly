from graphene_django import DjangoObjectType
import graphene
from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField

from console_api.auth import Auth
from console_api.models import TouristSpotModel, PersonModel, TouristSpotImageModel, FlightModel
from console_api.provider import Provider


class CreatePerson(graphene.Mutation):
    class Arguments:
        name = graphene.String()
        email = graphene.String()

    ok = graphene.Boolean()

    def mutate(self, info, name, email):
        PersonModel(name=name, email=email).save()
        return CreatePerson(ok=True)


class AddPersonPreference(graphene.Mutation):
    """Update batch owner."""

    class Arguments:
        liked = graphene.List(graphene.String)
        skipped = graphene.List(graphene.String)

    ok = graphene.Boolean()

    def mutate(self, info, liked, skipped):
        decoded = Auth.decode_token(info.context.META["HTTP_AUTHORIZATION"])
        person = PersonModel.objects.get_or_create(aud=decoded["aud"])[0]
        for like in liked:
            person.likes.add(TouristSpotModel.objects.get(key=like))
        for skip in skipped:
            person.skips.add(TouristSpotModel.objects.get(key=skip))
        ok = True
        return AddPersonPreference(ok=ok)


class PersonType(DjangoObjectType):
    class Meta:
        model = PersonModel


class TouristSpotType(DjangoObjectType):
    promoted = graphene.Boolean()

    class Meta:
        model = TouristSpotModel
        filter_fields = ['key', 'description', 'name']
        interfaces = (relay.Node,)


class FlightType(DjangoObjectType):
    class Meta:
        model = FlightModel
        filter_fields = {
            'departure': ['exact', 'icontains'],
            'destination': ['exact'],
            'price': ['exact'],
        }
        interfaces = (relay.Node,)


class TouristSpotImageType(DjangoObjectType):
    class Meta:
        model = TouristSpotImageModel


class Mutations(graphene.ObjectType):
    create_Person = CreatePerson.Field()
    add_preference = AddPersonPreference.Field()


class Queries(graphene.ObjectType):
    all_tourist_spots = DjangoFilterConnectionField(TouristSpotType)
    tourist_spot = graphene.Field(TouristSpotType, key=graphene.String())
    user_tourist_spots = graphene.List(TouristSpotType, count=graphene.Int())
    user_promoted_tourist_spots = graphene.List(TouristSpotType, count=graphene.Int())
    all_flights = DjangoFilterConnectionField(FlightType)
    user = graphene.Field(PersonType)

    def resolve_tourist_spot(self, info, **kwargs):
        key = kwargs.get('key')
        return TouristSpotModel.objects.get(key=key)

    def resolve_all_tourist_spots(self, info):
        return TouristSpotModel.objects.all()

    def resolve_user_tourist_spots(self, info, **kwargs):
        aud = Auth.decode_token(info.context.META["HTTP_AUTHORIZATION"])["aud"]
        # aud="testAUD"
        count = kwargs.get('count')
        return Provider.get_top_spots_for_user(aud, count)

    def resolve_user_promoted_tourist_spots(self, info, **kwargs):
        aud = Auth.decode_token(info.context.META["HTTP_AUTHORIZATION"])["aud"]
        # aud="testAUD"
        count = kwargs.get('count')
        return Provider.get_top_promoted_spots_for_user(aud, count)

    def resolve_user(self, info):
        decoded = Auth.decode_token(info.context.META["HTTP_AUTHORIZATION"])
        return PersonModel.objects.get_or_create(aud=decoded["aud"])[0]


schema = graphene.Schema(query=Queries, mutation=Mutations)
