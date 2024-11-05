# users/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from .serializers import LoginSerializer, UserSerializer
from drf_yasg.utils import swagger_auto_schema
from core.results import SuccessDataResult, ErrorResult
from core.serializers import SuccessDataResultSerializer, ErrorResultSerializer
from core.utils import SerializerUtil
from .constants import MessageConstant

User = get_user_model()


class LoginView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(request_body=LoginSerializer)
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]
            user = authenticate(username=username, password=password)

            if user is not None:
                refresh = RefreshToken.for_user(user)
                result = SuccessDataResultSerializer(
                    SuccessDataResult(
                        {
                            "refresh": str(refresh),
                            "access": str(refresh.access_token),
                        },
                        MessageConstant.SUCCESS_LOGIN,
                    )
                ).data
                return Response(
                    result,
                    status=status.HTTP_200_OK,
                )

            result = ErrorResultSerializer(
                ErrorResult(MessageConstant.INVALID_CREDENTIALS)
            ).data
            return Response(result, status=status.HTTP_400_BAD_REQUEST)

        errors = SerializerUtil.get_error_messages(serializer.errors)
        result = ErrorResultSerializer(ErrorResult(errors)).data
        return Response(result)


class UsersView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


class UserView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, username: str):
        user = User.objects.filter(username=username).first()
        serializer = UserSerializer(user)
        result = SuccessDataResultSerializer(
            SuccessDataResult(serializer.data, "")
        ).data
        return Response(result)
