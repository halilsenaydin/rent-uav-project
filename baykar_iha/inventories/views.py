from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from django.db import transaction
from .serializers import (
    AirplaneSerializer,
    PieceSerializer,
    ProducedAirplaneSerializer,
    ProducedAirplaneDtoSerializer,
    ProducedPieceSerializer,
    ProducedPieceDtoSerializer,
)
from .models import Airplane, Piece, ProducedAirplane, ProducedPiece
from core.results import SuccessResult, ErrorResult, SuccessDataResult
from core.serializers import (
    SuccessResultSerializer,
    ErrorResultSerializer,
    SuccessDataResultSerializer,
)
from core.utils import SerializerUtil
from core.decorators import (
    pieces_to_produce_by_team_permission_required,
    group_required,
    piece_belong_to_airplane_permission_required,
    assembly_team_permission_required,
    produced_piece_status_must_have_to_true,
    user_belong_to_team_with_request,
)
from core.permissions import CoreIsAuthenticated
from .constants import MessageConstant


class AirplanesView(APIView):
    permission_classes = [CoreIsAuthenticated]

    @method_decorator(transaction.atomic)
    @swagger_auto_schema(request_body=AirplaneSerializer)
    def post(self, request):
        serializer = AirplaneSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            result = SuccessResultSerializer(
                SuccessResult(MessageConstant.SUCCESS_ADD_AIRPLANE)
            ).data
            return Response(result, status=status.HTTP_201_CREATED)

        errors = SerializerUtil.get_error_messages(serializer.errors)
        result = ErrorResultSerializer(ErrorResult(errors)).data
        return Response(result)

    def get(self, request):
        airplanes = Airplane.objects.all()
        serializer = AirplaneSerializer(airplanes, many=True)
        result = SuccessDataResultSerializer(
            SuccessDataResult(serializer.data, "")
        ).data
        return Response(result)


class AirplaneView(APIView):
    permission_classes = [CoreIsAuthenticated]

    def get_airplane(self, id: int):
        """Retrieve an airplane by its ID or return a 404 response."""
        try:
            return Airplane.objects.get(pk=id)
        except Airplane.DoesNotExist:
            result = ErrorResultSerializer(
                ErrorResult(MessageConstant.NOT_MATCH_ANY_RECORD)
            ).data
            return Response(
                result,
                status=status.HTTP_404_NOT_FOUND,
            )

    def handle_airplane_not_found(self, airplane):
        """Return a response if the airplane is not found."""
        if isinstance(airplane, Response):
            return airplane

    def get(self, request, id):
        airplane = self.get_airplane(id)
        if self.handle_airplane_not_found(airplane):
            return airplane

        serializer = AirplaneSerializer(airplane)
        result = SuccessDataResultSerializer(
            SuccessDataResult(serializer.data, "")
        ).data
        return Response(result)

    @swagger_auto_schema(request_body=AirplaneSerializer)
    def put(self, request, id):
        airplane = self.get_airplane(id)
        if self.handle_airplane_not_found(airplane):
            return airplane

        serializer = AirplaneSerializer(airplane, data=request.data)
        if serializer.is_valid():
            serializer.save()
            result = SuccessResultSerializer(
                SuccessResult(MessageConstant.SUCCESS_UPDATE_AIRPLANE)
            ).data
            return Response(result)

        errors = SerializerUtil.get_error_messages(serializer.errors)
        result = ErrorResultSerializer(ErrorResult(errors)).data
        return Response(result)

    def delete(self, request, id):
        airplane = self.get_airplane(id)
        if self.handle_airplane_not_found(airplane):
            return airplane

        airplane.delete()
        result = SuccessResultSerializer(
            SuccessResult(MessageConstant.SUCCESS_DELETE_AIRPLANE)
        ).data
        return Response(result, status=status.HTTP_204_NO_CONTENT)


class PiecesView(APIView):
    permission_classes = [CoreIsAuthenticated]

    @method_decorator(transaction.atomic)
    @swagger_auto_schema(request_body=PieceSerializer)
    def post(self, request):
        serializer = PieceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            result = SuccessResultSerializer(
                SuccessResult(MessageConstant.SUCCESS_ADD_PIECE)
            ).data
            return Response(result, status=status.HTTP_201_CREATED)

        errors = SerializerUtil.get_error_messages(serializer.errors)
        result = ErrorResultSerializer(ErrorResult(errors)).data
        return Response(result)

    def get(self, request):
        produced_pieces = Piece.objects.all()
        serializer = PieceSerializer(produced_pieces, many=True)
        result = SuccessDataResultSerializer(
            SuccessDataResult(serializer.data, "")
        ).data
        return Response(result)


class PieceView(APIView):
    permission_classes = [CoreIsAuthenticated]

    def get_piece(self, id: int):
        """Retrieve an piece by its ID or return a 404 response."""
        try:
            return Piece.objects.get(pk=id)
        except:
            result = ErrorResultSerializer(
                ErrorResult(MessageConstant.NOT_MATCH_ANY_RECORD)
            ).data
            return Response(
                result,
                status=status.HTTP_404_NOT_FOUND,
            )

    def handle_piece_not_found(self, piece):
        """Return a response if the piece is not found."""
        if isinstance(piece, Response):
            return piece

    def get(self, request, id):
        piece = self.get_piece(id)
        if self.handle_piece_not_found(piece):
            return piece

        serializer = PieceSerializer(piece)
        result = SuccessDataResultSerializer(
            SuccessDataResult(serializer.data, "")
        ).data
        return Response(result)

    @swagger_auto_schema(request_body=PieceSerializer)
    def put(self, request, id):
        piece = self.get_piece(id)
        if self.handle_piece_not_found(piece):
            return piece

        serializer = PieceSerializer(piece, data=request.data)
        if serializer.is_valid():
            serializer.save()
            result = SuccessResultSerializer(
                SuccessResult(MessageConstant.SUCCESS_UPDATE_PIECE)
            ).data
            return Response(result)

        errors = SerializerUtil.get_error_messages(serializer.errors)
        result = ErrorResultSerializer(ErrorResult(errors)).data
        return Response(result)

    def delete(self, request, id):
        piece = self.get_piece(id)
        if self.handle_piece_not_found(piece):
            return piece

        piece.delete()
        result = SuccessResultSerializer(
            SuccessResult(MessageConstant.SUCCESS_DELETE_PIECE)
        ).data
        return Response(result, status=status.HTTP_204_NO_CONTENT)


class ProducedAirplanesView(APIView):
    permission_classes = [CoreIsAuthenticated]

    @method_decorator(assembly_team_permission_required)
    @method_decorator(piece_belong_to_airplane_permission_required)
    @method_decorator(transaction.atomic)
    @swagger_auto_schema(request_body=ProducedAirplaneSerializer)
    def post(self, request):
        serializer = ProducedAirplaneSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            parts_ids = request.data.get("parts", [])
            ProducedPiece.objects.filter(id__in=parts_ids).update(status=False)

            result = SuccessResultSerializer(
                SuccessResult(MessageConstant.SUCCESS_ADD_PRODUCED_AIRPLANE)
            ).data
            return Response(result, status=status.HTTP_201_CREATED)

        errors = SerializerUtil.get_error_messages(serializer.errors)
        result = ErrorResultSerializer(ErrorResult(errors)).data
        return Response(result)

    @method_decorator(assembly_team_permission_required)
    def get(self, request):
        produced_airplanes = ProducedAirplane.objects.all()
        serializer = ProducedAirplaneDtoSerializer(produced_airplanes, many=True)
        result = SuccessDataResultSerializer(
            SuccessDataResult(serializer.data, "")
        ).data
        return Response(result)


class ProducedAirplaneView(APIView):
    permission_classes = [CoreIsAuthenticated]

    def get_produced_airplane(self, id: int):
        """Retrieve an produced airplane by its ID or return a 404 response."""
        try:
            return ProducedAirplane.objects.get(pk=id)
        except:
            result = ErrorResultSerializer(
                ErrorResult(MessageConstant.NOT_MATCH_ANY_RECORD)
            ).data
            return Response(
                result,
                status=status.HTTP_404_NOT_FOUND,
            )

    def handle_produced_airplane_not_found(self, produced_airplane):
        """Return a response if the produced airplane is not found."""
        if isinstance(produced_airplane, Response):
            return produced_airplane

    def get(self, request, id):
        produced_airplane = self.get_produced_airplane(id)
        if self.handle_produced_airplane_not_found(produced_airplane):
            return produced_airplane

        serializer = ProducedAirplaneDtoSerializer(produced_airplane)
        result = SuccessDataResultSerializer(
            SuccessDataResult(serializer.data, "")
        ).data
        return Response(result)

    @method_decorator(assembly_team_permission_required)
    @method_decorator(piece_belong_to_airplane_permission_required)
    @swagger_auto_schema(request_body=ProducedAirplaneSerializer)
    def put(self, request, id):
        produced_airplane = self.get_produced_airplane(id)
        if self.handle_produced_airplane_not_found(produced_airplane):
            return produced_airplane

        serializer = ProducedAirplaneSerializer(produced_airplane, data=request.data)
        if serializer.is_valid():
            serializer.save()
            result = SuccessResultSerializer(
                SuccessResult(MessageConstant.SUCCESS_UPDATE_PRODUCED_AIRPLANE)
            ).data
            return Response(result)

        errors = SerializerUtil.get_error_messages(serializer.errors)
        result = ErrorResultSerializer(ErrorResult(errors)).data
        return Response(result)

    @method_decorator(assembly_team_permission_required)
    def delete(self, request, id):
        produced_airplane = self.get_produced_airplane(id)
        if self.handle_produced_airplane_not_found(produced_airplane):
            return produced_airplane

        produced_airplane.delete()
        result = SuccessResultSerializer(
            SuccessResult(MessageConstant.SUCCESS_DELETE_PRODUCED_AIRPLANE)
        ).data
        return Response(result, status=status.HTTP_204_NO_CONTENT)


class ProducedPiecesView(APIView):
    permission_classes = [CoreIsAuthenticated]

    @method_decorator(group_required)
    @method_decorator(user_belong_to_team_with_request)
    @method_decorator(pieces_to_produce_by_team_permission_required)
    @method_decorator(transaction.atomic)
    @swagger_auto_schema(request_body=ProducedPieceSerializer)
    def post(self, request):
        serializer = ProducedPieceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            result = SuccessResultSerializer(
                SuccessResult(MessageConstant.SUCCESS_ADD_PRODUCED_PIECE)
            ).data
            return Response(result, status=status.HTTP_201_CREATED)

        errors = SerializerUtil.get_error_messages(serializer.errors)
        result = ErrorResultSerializer(ErrorResult(errors)).data
        return Response(result)

    def get(self, request):
        produced_pieces = ProducedPiece.objects.all()
        serializer = ProducedPieceDtoSerializer(produced_pieces, many=True)

        # stock count and total
        stock_count = ProducedPiece.objects.filter(status=True).count()

        data = {
            "rows": serializer.data,
            "stock": stock_count,
            "total": produced_pieces.count(),
        }

        result = SuccessDataResultSerializer(SuccessDataResult(data, "")).data
        return Response(result)


class ProducedPiecesByTeamView(APIView):
    permission_classes = [CoreIsAuthenticated]

    def get(self, request, team_id):
        produced_pieces = ProducedPiece.objects.filter(team_id=team_id)
        serializer = ProducedPieceDtoSerializer(produced_pieces, many=True)

        # stock count and total
        stock_count = ProducedPiece.objects.filter(status=True, team_id=team_id).count()

        data = {
            "rows": serializer.data,
            "stock": stock_count,
            "total": produced_pieces.count(),
        }

        result = SuccessDataResultSerializer(SuccessDataResult(data, "")).data
        return Response(result)


class ProducedPiecesStockByModelView(APIView):
    permission_classes = [CoreIsAuthenticated]

    def get(self, request):
        airplanes = Airplane.objects.all()
        airplane_stock_counts = {}

        for airplane in airplanes:
            stock_count = ProducedPiece.objects.filter(
                airplane=airplane, status=True
            ).count()
            airplane_stock_counts[airplane.name] = stock_count

        result = SuccessDataResultSerializer(
            SuccessDataResult(airplane_stock_counts, "")
        ).data
        return Response(result)


class ProducedPieceView(APIView):
    permission_classes = [CoreIsAuthenticated]

    def get_produced_piece(self, id: int):
        """Retrieve an produced piece by its ID or return a 404 response."""
        try:
            return ProducedPiece.objects.get(pk=id)
        except:
            result = ErrorResultSerializer(
                ErrorResult(MessageConstant.NOT_MATCH_ANY_RECORD)
            ).data
            return Response(
                result,
                status=status.HTTP_404_NOT_FOUND,
            )

    def handle_produced_piece_not_found(self, produced_piece):
        """Return a response if the produced piece is not found."""
        if isinstance(produced_piece, Response):
            return produced_piece

    def get(self, request, id):
        produced_piece = self.get_produced_piece(id)
        if self.handle_produced_piece_not_found(produced_piece):
            return produced_piece

        serializer = ProducedPieceDtoSerializer(produced_piece)
        result = SuccessDataResultSerializer(
            SuccessDataResult(serializer.data, "")
        ).data
        return Response(result)

    @method_decorator(produced_piece_status_must_have_to_true)
    @method_decorator(group_required)
    @method_decorator(user_belong_to_team_with_request)
    @method_decorator(pieces_to_produce_by_team_permission_required)
    @swagger_auto_schema(request_body=ProducedPieceSerializer)
    def put(self, request, id):
        produced_piece = self.get_produced_piece(id)
        if self.handle_produced_piece_not_found(produced_piece):
            return produced_piece

        serializer = ProducedPieceSerializer(produced_piece, data=request.data)
        if serializer.is_valid():
            serializer.save()
            result = SuccessResultSerializer(
                SuccessResult(MessageConstant.SUCCESS_UPDATE_PRODUCED_PIECE)
            ).data
            return Response(result)

        errors = SerializerUtil.get_error_messages(serializer.errors)
        result = ErrorResultSerializer(ErrorResult(errors)).data
        return Response(result)

    @method_decorator(produced_piece_status_must_have_to_true)
    @method_decorator(group_required)
    @method_decorator(pieces_to_produce_by_team_permission_required)
    def delete(self, request, id):
        produced_piece = self.get_produced_piece(id)
        if self.handle_produced_piece_not_found(produced_piece):
            return produced_piece

        if not produced_piece.status:
            result = ErrorResultSerializer(
                ErrorResult(MessageConstant.ERROR_DELETE_PRODUCED_PIECE)
            ).data
            return Response(result)

        produced_piece.delete()
        result = SuccessResultSerializer(
            SuccessResult(MessageConstant.SUCCESS_DELETE_PRODUCED_PIECE)
        ).data
        return Response(result)
