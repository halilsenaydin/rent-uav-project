from django.urls import path
from .views import (
    AirplanesView,
    AirplaneView,
    PiecesView,
    PieceView,
    ProducedAirplanesView,
    ProducedAirplaneView,
    ProducedPiecesView,
    ProducedPieceView,
    ProducedPiecesByTeamView,
    ProducedPiecesStockByModelView,
)

urlpatterns = [
    path("airplanes", AirplanesView.as_view(), name="airplanes"),
    path("airplanes/<int:id>", AirplaneView.as_view(), name="piece"),
    path("pieces", PiecesView.as_view(), name="pieces"),
    path("pieces/<int:id>", PieceView.as_view(), name="piece"),
    path(
        "produced-airplanes/",
        ProducedAirplanesView.as_view(),
        name="produced-airplanes",
    ),
    path(
        "produced-airplanes/<int:id>",
        ProducedAirplaneView.as_view(),
        name="produced-airplane",
    ),
    path("produced-pieces/", ProducedPiecesView.as_view(), name="produced-pieces"),
    path(
        "produced-pieces/team/<int:team_id>/",
        ProducedPiecesByTeamView.as_view(),
        name="produced-pieces-by-team",
    ),
    path(
        "produced-pieces/stock/",
        ProducedPiecesStockByModelView.as_view(),
        name="produced-pieces-stock-by-model",
    ),
    path(
        "produced-pieces/<int:id>", ProducedPieceView.as_view(), name="produced-piece"
    ),
]
