from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from graphene_django.views import GraphQLView

from . import views
urlpatterns = [
        url(r'^graphql', GraphQLView.as_view(graphiql=True)),

]
