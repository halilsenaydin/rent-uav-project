"""
Admin configurations for managing Airplane and Piece models.

This module registers the Airplane, Piece, ProducedAirplane, and ProducedPiece models
with the Django admin interface, providing custom display options and search functionality.

Admin Classes:
- AirplaneAdmin: Customizes the admin interface for the Airplane model.
- PieceAdmin: Customizes the admin interface for the Piece model.
- ProducedAirplaneAdmin: Customizes the admin interface for the ProducedAirplane model.
- ProducedPieceAdmin: Customizes the admin interface for the ProducedPiece model.
"""

from django.contrib import admin
from .models import Airplane, Piece, ProducedAirplane, ProducedPiece


class AirplaneAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    list_display_links = ("id",)
    list_editable = ("name",)
    search_fields = ("name",)


class PieceAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
    )
    list_display_links = ("id",)
    list_editable = ("name",)
    search_fields = ("name",)


class ProducedAirplaneAdmin(admin.ModelAdmin):
    list_display = ("id", "model", "produced_date", "status")
    list_display_links = ("id",)


class ProducedPieceAdmin(admin.ModelAdmin):
    list_display = ("id", "team", "piece", "airplane", "produced_date", "status")
    list_display_links = ("id",)


admin.site.register(Airplane, AirplaneAdmin)
admin.site.register(Piece, PieceAdmin)
admin.site.register(ProducedAirplane, ProducedAirplaneAdmin)
admin.site.register(ProducedPiece, ProducedPieceAdmin)
