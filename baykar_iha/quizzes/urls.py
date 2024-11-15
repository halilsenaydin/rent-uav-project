from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import QuizViewSet, QuestionViewSet, OptionViewSet, UserAnswerViewSet

router = DefaultRouter()
router.register(r"quizzes", QuizViewSet, basename="quiz")
router.register(r"questions", QuestionViewSet, basename="questions")
router.register(r"options", OptionViewSet, basename="options")
router.register(r"user-answers", UserAnswerViewSet, basename="user-answers")

urlpatterns = [
    path("", include(router.urls)),
]
