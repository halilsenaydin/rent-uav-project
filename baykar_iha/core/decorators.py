from functools import wraps
from .constants import InventoryConstant, MessageConstant
from inventories.models import Piece, Airplane, ProducedPiece
from .exceptions import CustomPermissionDenied


def user_belong_to_team_with_request(view_func):
    """
    Decorator to check if the user belongs to the team specified in the request data.

    @param view_func: The view function to wrap.
    @raises CustomPermissionDenied: If the user does not have permission.
    """

    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        user_groups = request.user.groups.all()
        team_id = request.data.get("team")
        for group in user_groups:
            if group.id != team_id:
                raise CustomPermissionDenied(
                    message=MessageConstant.NOT_ALLOWED_ADD_THIS_PIECE
                )

        return view_func(request, *args, **kwargs)

    return _wrapped_view


def pieces_to_produce_by_team_permission_required(view_func):
    """
    Decorator to check if the user has permission to produce a specified piece.

    @param view_func: The view function to wrap.
    @raises CustomPermissionDenied: If the user does not have permission.
    """

    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        user_groups = request.user.groups.all()
        piece_id = request.data.get("piece")

        if piece_id == None:
            try:
                produced_piece = ProducedPiece.objects.get(id=kwargs.get("id"))
                piece_id = produced_piece.piece.id
            except ProducedPiece.DoesNotExist:
                raise CustomPermissionDenied(
                    message=MessageConstant.NOT_MATCH_ANY_RECORD
                )

        try:
            piece = Piece.objects.get(id=piece_id)
            piece_name = piece.name
        except Piece.DoesNotExist:
            raise CustomPermissionDenied(message=MessageConstant.PIECE_DOESNT_EXIST)

        for group in user_groups:
            if (
                group.name not in InventoryConstant.ALLOWED_PIECES_TO_PRODUCE_BY_TEAM
                or InventoryConstant.ALLOWED_PIECES_TO_PRODUCE_BY_TEAM[group.name]
                != piece_name
            ):
                raise CustomPermissionDenied(
                    message=MessageConstant.NOT_ALLOWED_ADD_THIS_PIECE
                )

        return view_func(request, *args, **kwargs)

    return _wrapped_view


def piece_belong_to_airplane_permission_required(view_func):
    """
    Decorator to ensure that the produced pieces belong to a specific airplane model.

    @param view_func: The view function to wrap.
    @raises CustomPermissionDenied: If the produced pieces do not belong to the specified airplane model.
    """

    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        produced_piece_ids = request.data.get("parts", [])
        airplane_id = request.data.get("model")

        airplane_model = Airplane.objects.filter(id=airplane_id).first()
        if not airplane_model:
            raise CustomPermissionDenied(message=MessageConstant.AIRPLANE_DOESNT_EXIST)

        produced_pieces = ProducedPiece.objects.filter(
            id__in=produced_piece_ids, airplane=airplane_model, status=True
        )

        if not produced_pieces.exists() or produced_pieces.count() != len(
            produced_piece_ids
        ):
            raise CustomPermissionDenied(
                message=MessageConstant.PIECE_NOT_SUITABLE_FOR_PRODUCE
            )

        return view_func(request, *args, **kwargs)

    return _wrapped_view


def group_required(view_func):
    """
    Decorator to verify that the user belongs to any group.

    @param view_func: The view function to wrap.
    @raises CustomPermissionDenied: If the user does not belong to any group.
    """

    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        user_groups = request.user.groups.values_list("name", flat=True)

        if not user_groups:
            raise CustomPermissionDenied(
                message=MessageConstant.YOU_MUSNT_BELONG_TO_A_TEAM
            )

        return view_func(request, *args, **kwargs)

    return _wrapped_view


def assembly_team_permission_required(view_func):
    """
    Decorator to confirm that the user is part of the assembly team.

    @param view_func: The view function to wrap.
    @raises CustomPermissionDenied: If the user is not part of the assembly team.
    """

    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if not request.user.groups.filter(
            name=InventoryConstant.ASSEMBLY_TEAM
        ).exists():
            raise CustomPermissionDenied(
                message=MessageConstant.USER_MUST_BELONG_TO_ASSEMBLY_TEAM
            )

        return view_func(request, *args, **kwargs)

    return _wrapped_view


def produced_piece_status_must_have_to_true(view_func):
    """
    Decorator to ensure that the 'status' field in the request data is True.

    Raises:
        CustomPermissionDenied: If 'status' is False, an exception is raised
        with a predefined message.

    Args:
        view_func: The view function to be wrapped.

    Returns:
        Callable: The wrapped view function that checks the status.
    """

    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        data = request.data

        if data.get("status") is False:
            raise CustomPermissionDenied(
                message=MessageConstant.PIECE_USING_ON_A_AIRPLANE
            )

        return view_func(request, *args, **kwargs)

    return _wrapped_view
