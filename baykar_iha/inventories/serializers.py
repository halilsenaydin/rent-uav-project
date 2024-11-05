"""
Django REST framework serializers for managing airplanes and their components.

This module defines serializers for the following models:
- Airplane: Serializes the Airplane model.
- Piece: Serializes the Piece model.
- ProducedPiece: Serializes the ProducedPiece model, with additional formatting for produced date.
- ProducedPieceDtoSerializer: Serializes ProducedPiece with nested Piece, Airplane, and Group serializers.
- ProducedAirplane: Serializes the ProducedAirplane model, including produced date.
- ProducedAirplaneDtoSerializer: Serializes ProducedAirplane with nested Airplane and ProducedPiece serializers.

Each serializer handles model validation and data transformation for API responses.
"""

from django.contrib.auth.models import Group
from rest_framework import serializers
from .models import Airplane, Piece, ProducedAirplane, ProducedPiece
from core.serializers import GroupSerializer


class AirplaneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Airplane
        fields = "__all__"

    def create(self, validated_data):
        return Airplane.objects.create(**validated_data)


class PieceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Piece
        fields = "__all__"


class ProducedPieceSerializer(serializers.ModelSerializer):
    producedDate = serializers.CharField(source="produced_date")

    class Meta:
        model = ProducedPiece
        fields = ["id", "piece", "airplane", "team", "producedDate", "status"]
        read_only_fields = ["id"]


class ProducedPieceDtoSerializer(serializers.ModelSerializer):
    piece = PieceSerializer()
    airplane = AirplaneSerializer()
    team = GroupSerializer()
    producedDate = serializers.CharField(source="produced_date")

    class Meta:
        model = ProducedPiece
        fields = ["id", "piece", "airplane", "team", "producedDate", "status"]
        read_only_fields = ["id"]


class ProducedAirplaneSerializer(serializers.ModelSerializer):
    producedDate = serializers.CharField(source="produced_date")

    class Meta:
        model = ProducedAirplane
        fields = ["id", "model", "parts", "producedDate", "status"]


class ProducedAirplaneDtoSerializer(serializers.ModelSerializer):
    model = AirplaneSerializer()
    parts = ProducedPieceDtoSerializer(many=True)
    producedDate = serializers.CharField(source="produced_date")

    class Meta:
        model = ProducedAirplane
        fields = ["id", "model", "parts", "producedDate", "status"]
