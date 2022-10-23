from rest_framework import serializers
from djoser.serializers import UserCreateSerializer
from .models import User
from base.serializer import ProgrammerSerializer


class CreateUserSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = (
            'id', 'email', 'username', 'password'
        )


class UserSerializer(serializers.ModelSerializer):
    programmer = ProgrammerSerializer()
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'programmer']