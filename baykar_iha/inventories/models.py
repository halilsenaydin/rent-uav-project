"""
Django models for managing airplanes and their components.

This module defines the following models:
- Airplane: Represents an airplane with a unique name.
- Piece: Represents a component with a unique name.
- ProducedPiece: Represents a produced piece associated with a team, piece, and airplane.
- ProducedAirplane: Represents a produced airplane, linking it to its parts.

Each model includes string representations for easy identification.
"""

from django.db import models
from django.contrib.auth.models import Group


class Airplane(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Piece(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class ProducedPiece(models.Model):
    team = models.ForeignKey(Group, default=1, on_delete=models.CASCADE)
    piece = models.ForeignKey(Piece, on_delete=models.CASCADE)
    airplane = models.ForeignKey(Airplane, on_delete=models.CASCADE)
    produced_date = models.DateField(auto_now_add=True)
    status = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.piece.name} - {self.airplane.name} - {self.produced_date}"


class ProducedAirplane(models.Model):
    model = models.ForeignKey(Airplane, on_delete=models.CASCADE)
    parts = models.ManyToManyField(ProducedPiece, blank=True)
    produced_date = models.DateField(auto_now_add=True)
    status = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.model.name} - {self.parts.count()} Pieces - {self.produced_date}"
