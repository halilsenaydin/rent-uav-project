from core.constants import MessageConstant as CoreMessageConstant
from core.exceptions import CustomNotFound
from core.permissions import CoreIsAuthenticated
from core.results import SuccessResult, SuccessDataResult, ErrorResult
from core.serializers import (
    SuccessResultSerializer,
    SuccessDataResultSerializer,
    ErrorResultSerializer,
)
from core.utils import SerializerUtil
from django.contrib.auth.models import User
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from .constants import MessageConstant
from .models import Quiz, Question, Option, UserAnswer
from .serializers import (
    QuizSerializer,
    QuestionSerializer,
    OptionSerializer,
    UserAnswerSerializer,
    UserAnswerCreateSerializer,
    QuizByUserNameSerializer,
)


class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    permission_classes = [CoreIsAuthenticated]

    def get_object(self):
        try:
            return super().get_object()
        except Question.DoesNotExist:
            result = ErrorResultSerializer(
                ErrorResult(CoreMessageConstant.NOT_MATCH_ANY_RECORD)
            ).data
            raise NotFound(detail=result)

    def get_queryset(self):
        return Quiz.objects.filter(user=self.request.user)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["user"] = self.request.user
        return context

    def get_quiz(self, id: int):
        """Retrieve an quiz by its ID or return a 404 response."""
        try:
            return Quiz.objects.get(pk=id)
        except:
            result = ErrorResultSerializer(
                ErrorResult(CoreMessageConstant.NOT_MATCH_ANY_RECORD)
            ).data
            return Response(
                result,
                status=status.HTTP_404_NOT_FOUND,
            )

    def get_user(self, username: str):
        """Retrieve an user by its ID or return a 404 response."""
        try:
            return User.objects.get(username=username)
        except:
            result = ErrorResultSerializer(
                ErrorResult(CoreMessageConstant.NOT_MATCH_ANY_RECORD)
            ).data
            return Response(
                result,
                status=status.HTTP_404_NOT_FOUND,
            )

    def handle_not_found(self, model):
        """Return a response if the model is not found."""
        if isinstance(model, Response):
            return model

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            result = SuccessResultSerializer(
                SuccessResult(MessageConstant.SUCCESS_ADD_QUIZ)
            ).data
            return Response(result, status=status.HTTP_201_CREATED)

        errors = SerializerUtil.get_error_messages(serializer.errors)
        result = ErrorResultSerializer(ErrorResult(errors)).data
        return Response(result)

    @action(detail=False, methods=["post"], serializer_class=QuizByUserNameSerializer)
    def generate(self, request, *args, **kwargs):
        username = request.data.get("username")
        user = self.get_user(username)
        if self.handle_not_found(user):
            return user

        assigned_quizzes = Quiz.objects.filter(user=user).values_list(
            "questions__id", flat=True
        )
        unanswered_questions = Question.objects.exclude(id__in=assigned_quizzes)
        selected_questions = unanswered_questions.order_by("?")[:10]

        if not selected_questions:
            result = ErrorResultSerializer(
                ErrorResult(MessageConstant.ERROR_GENERATE_QUIZ)
            ).data
            return Response(result, status=status.HTTP_404_NOT_FOUND)

        quiz = Quiz.objects.create(user=user)
        quiz.questions.set(selected_questions)
        quiz.save()

        result = SuccessResultSerializer(
            SuccessResult(MessageConstant.SUCCESS_ADD_QUIZ)
        ).data
        return Response(result, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            result = SuccessResultSerializer(
                SuccessResult(MessageConstant.SUCCESS_UPDATE_QUIZ)
            ).data
            return Response(result, status=status.HTTP_200_OK)

        errors = SerializerUtil.get_error_messages(serializer.errors)
        result = ErrorResultSerializer(ErrorResult(errors)).data
        return Response(result)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        result = SuccessResultSerializer(
            SuccessResult(MessageConstant.SUCCESS_DELETE_QUIZ)
        ).data
        return Response(result, status=status.HTTP_204_NO_CONTENT)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        result = SuccessDataResultSerializer(
            SuccessDataResult(serializer.data, "")
        ).data
        return Response(result, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        result = SuccessDataResultSerializer(
            SuccessDataResult(serializer.data, "")
        ).data
        return Response(result, status=status.HTTP_200_OK)


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [CoreIsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_object(self):
        try:
            return super().get_object()
        except Question.DoesNotExist:
            result = ErrorResultSerializer(
                ErrorResult(CoreMessageConstant.NOT_MATCH_ANY_RECORD)
            ).data
            raise NotFound(detail=result)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            result = SuccessResultSerializer(
                SuccessResult(MessageConstant.SUCCESS_ADD_QUESTION)
            ).data
            return Response(result, status=status.HTTP_201_CREATED)

        errors = SerializerUtil.get_error_messages(serializer.errors)
        result = ErrorResultSerializer(ErrorResult(errors)).data
        return Response(result)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            result = SuccessResultSerializer(
                SuccessResult(MessageConstant.SUCCESS_UPDATE_QUESTION)
            ).data
            return Response(result, status=status.HTTP_200_OK)

        errors = SerializerUtil.get_error_messages(serializer.errors)
        result = ErrorResultSerializer(ErrorResult(errors)).data
        return Response(result)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        result = SuccessResultSerializer(
            SuccessResult(MessageConstant.SUCCESS_DELETE_QUESTION)
        ).data
        return Response(result, status=status.HTTP_204_NO_CONTENT)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        result = SuccessDataResultSerializer(
            SuccessDataResult(serializer.data, "")
        ).data
        return Response(result, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        result = SuccessDataResultSerializer(
            SuccessDataResult(serializer.data, "")
        ).data
        return Response(result, status=status.HTTP_200_OK)


class OptionViewSet(viewsets.ModelViewSet):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [CoreIsAuthenticated]

    def get_object(self):
        try:
            return super().get_object()
        except:
            raise CustomNotFound()

    def get_question(self, question: str):
        """Retrieve an question by its ID or return a 404 response."""
        try:
            return Question.objects.get(pk=question)
        except:
            result = ErrorResultSerializer(
                ErrorResult(CoreMessageConstant.NOT_MATCH_ANY_RECORD)
            ).data
            return Response(
                result,
                status=status.HTTP_404_NOT_FOUND,
            )

    def handle_not_found(self, model):
        """Return a response if the model is not found."""
        if isinstance(model, Response):
            return model

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            result = SuccessResultSerializer(
                SuccessResult(MessageConstant.SUCCESS_ADD_OPTION)
            ).data
            return Response(result, status=status.HTTP_201_CREATED)

        errors = SerializerUtil.get_error_messages(serializer.errors)
        result = ErrorResultSerializer(ErrorResult(errors)).data
        return Response(result)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            result = SuccessResultSerializer(
                SuccessResult(MessageConstant.SUCCESS_UPDATE_OPTION)
            ).data
            return Response(result, status=status.HTTP_200_OK)

        errors = SerializerUtil.get_error_messages(serializer.errors)
        result = ErrorResultSerializer(ErrorResult(errors)).data
        return Response(result)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        result = SuccessResultSerializer(
            SuccessResult(MessageConstant.SUCCESS_DELETE_OPTION)
        ).data
        return Response(result, status=status.HTTP_204_NO_CONTENT)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        result = SuccessDataResultSerializer(
            SuccessDataResult(serializer.data, "")
        ).data
        return Response(result, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        method="get",
        manual_parameters=[
            openapi.Parameter(
                "question",
                openapi.IN_PATH,
                description="The question id of the option to get the options for",
                type=openapi.TYPE_STRING,
            )
        ],
    )
    @action(
        detail=False,
        methods=["get"],
        url_path="question/(?P<question>[^/.]+)",
        serializer_class=OptionSerializer,
    )
    def by_question(self, request, question, *args, **kwargs):
        queryset = self.get_queryset().filter(question_id=question)
        serializer = self.get_serializer(queryset, many=True)
        result = SuccessDataResultSerializer(
            SuccessDataResult(serializer.data, "")
        ).data
        return Response(result, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        result = SuccessDataResultSerializer(
            SuccessDataResult(serializer.data, "")
        ).data
        return Response(result, status=status.HTTP_200_OK)


class UserAnswerViewSet(viewsets.ModelViewSet):
    queryset = UserAnswer.objects.all()
    serializer_class = UserAnswerSerializer
    permission_classes = [CoreIsAuthenticated]

    def get_serializer_class(self):
        if self.action == "create":
            return UserAnswerCreateSerializer
        return UserAnswerSerializer

    def get_object(self):
        try:
            return super().get_object()
        except UserAnswer.DoesNotExist:
            result = ErrorResultSerializer(
                ErrorResult(CoreMessageConstant.NOT_MATCH_ANY_RECORD)
            ).data
            raise NotFound(detail=result)

    def create(self, request, *args, **kwargs):
        is_many = isinstance(request.data, list)

        if is_many:
            for answer in request.data:
                answer["user"] = request.user.id
        else:
            request.data["user"] = request.user.id

        serializer = self.get_serializer(data=request.data, many=is_many)

        if serializer.is_valid():
            serializer.save()
            result = SuccessResultSerializer(
                SuccessResult(MessageConstant.SUCCESS_ADD_USER_ANSWER)
            ).data
            return Response(result, status=status.HTTP_201_CREATED)

        errors = SerializerUtil.get_error_messages(serializer.errors)
        result = ErrorResultSerializer(ErrorResult(errors)).data
        return Response(result)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            result = SuccessResultSerializer(
                SuccessResult(MessageConstant.SUCCESS_UPDATE_USER_ANSWER)
            ).data
            return Response(result, status=status.HTTP_200_OK)

        errors = SerializerUtil.get_error_messages(serializer.errors)
        result = ErrorResultSerializer(ErrorResult(errors)).data
        return Response(result)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        result = SuccessResultSerializer(
            SuccessResult(MessageConstant.SUCCESS_DELETE_USER_ANSWER)
        ).data
        return Response(result, status=status.HTTP_204_NO_CONTENT)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        result = SuccessDataResultSerializer(
            SuccessDataResult(serializer.data, "")
        ).data
        return Response(result, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        result = SuccessDataResultSerializer(
            SuccessDataResult(serializer.data, "")
        ).data
        return Response(result, status=status.HTTP_200_OK)
