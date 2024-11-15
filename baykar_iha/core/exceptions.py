from rest_framework.exceptions import APIException
from .results import ErrorResult
from .serializers import ErrorResultSerializer
from .constants import MessageConstant, ErrorConstant


class CustomPermissionDenied(APIException):
    """
    A custom exception to handle permission-denied errors (HTTP 401).

    This exception is raised when a user does not have the necessary permissions
    to access a resource. The exception automatically serializes the error message
    into a structured response format.

    Attributes:
        detail (dict): The serialized error message, containing the description
                       of the permission issue.
        code (str): A custom error code for this exception.

    Args:
        message (str, optional): The error message to include in the response.
                                  Defaults to `MessageConstant.UNAUTHORIZED`.

    Example:
        raise CustomPermissionDenied(message="You do not have permission to access this resource.")
    """

    def __init__(self, message=MessageConstant.UNAUTHORIZED):
        self.detail = ErrorResultSerializer(ErrorResult(message=message)).data
        self.code = ErrorConstant.UNAUTHORIZED_STATUS_CODE


class CustomNotFound(APIException):
    """
    A custom exception to handle "not found" errors (HTTP 404).

    This exception is raised when a resource is not found in the database or
    the requested data is unavailable. The exception automatically serializes the error message
    into a structured response format.

    Attributes:
        detail (dict): The serialized error message, describing the resource that was not found.
        code (str): A custom error code for this exception.

    Args:
        code (str, optional): A custom error code. Defaults to `ErrorConstant.NOT_FOUND_STATUS_CODE`.
        message (str, optional): The error message to include in the response.
                                  Defaults to `MessageConstant.NOT_MATCH_ANY_RECORD`.

    Example:
        raise CustomNotFound(message="The requested item could not be found.")
    """

    def __init__(self, code=None, message=MessageConstant.NOT_MATCH_ANY_RECORD):
        self.detail = ErrorResultSerializer(ErrorResult(message=message)).data
        self.code = ErrorConstant.NOT_FOUND_STATUS_CODE
