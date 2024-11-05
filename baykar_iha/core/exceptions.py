from rest_framework.exceptions import APIException
from .results import ErrorResult
from .serializers import ErrorResultSerializer
from .constants import MessageConstant, ErrorConstant

"""
Custom exception class for handling permission denial in the API.

Inherits from:
- APIException: The base class for all API-related exceptions in Django REST Framework.

Attributes:
- status_code (int): HTTP status code for unauthorized access.
- default_detail (str): Default detail message for unauthorized access.
- default_code (str): Default error code for unauthorized access.

Methods:
- __init__(detail=None, code=None, message=MessageConstant.UNAUTHORIZED): Initializes the exception with a custom detail message and code, or defaults if not provided.
"""


class CustomPermissionDenied(APIException):
    status_code = ErrorConstant.UNAUTHORIZED_STATUS_CODE
    default_detail = ErrorConstant.UNAUTHORIZED_DETAIL
    default_code = ErrorConstant.UNAUTHORIZED_CODE

    def __init__(self, detail=None, code=None, message=MessageConstant.UNAUTHORIZED):
        if detail is not None:
            self.detail = detail
        else:
            self.detail = ErrorResultSerializer(ErrorResult(message=message)).data

        if code is not None:
            self.code = code
        else:
            self.code = self.default_code
