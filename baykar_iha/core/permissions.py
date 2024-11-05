from rest_framework.permissions import IsAuthenticated
from .exceptions import CustomPermissionDenied

"""
Custom permission class that checks if the user is authenticated.

Inherits from:
- IsAuthenticated: A built-in permission class from Django REST Framework that grants access to authenticated users.

Methods:
- has_permission(request, view): Checks if the user is authenticated. Raises a CustomPermissionDenied exception if not authenticated.
"""


class CoreIsAuthenticated(IsAuthenticated):
    def has_permission(self, request, view):
        if not super().has_permission(request, view):
            raise CustomPermissionDenied()
        return True
