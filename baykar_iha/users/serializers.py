"""
Django REST framework serializers for user authentication and management.

This module defines serializers for handling user data, including:
- UserSerializer: Serializes user information for API responses, including user groups.
- RegisterSerializer: Handles user registration, including password hashing.
- LoginSerializer: Validates user credentials for login operations.

Each serializer facilitates data validation and transformation for user-related operations.
"""

from rest_framework import serializers
from django.contrib.auth import get_user_model
from core.serializers import GroupSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    firstName = serializers.CharField(source="first_name")
    lastName = serializers.CharField(source="last_name")
    teams = GroupSerializer(source="groups", many=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "firstName", "lastName", "teams"]
        read_only_fields = ["id"]


class RegisterSerializer(serializers.ModelSerializer):
    firstName = serializers.CharField(source="first_name")
    lastName = serializers.CharField(source="last_name")

    class Meta:
        model = User
        fields = ["username", "email", "password", "firstName", "lastName"]

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
