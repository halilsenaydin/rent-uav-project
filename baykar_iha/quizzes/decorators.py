from functools import wraps
from .constants import MessageConstant
from core.constants import MessageConstant as CoreMessageConstant
from .models import Option, Question
from core.exceptions import CustomPermissionDenied


def question_must_have_one_least_correct_answer(view_func):
    """
    Decorator to check if the `Option` set for a `Question` contains at least one correct answer.
    """

    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        question_id = request.data.get("question")
        options = request.data.get("options", [])

        if not options:
            raise CustomPermissionDenied(
                message=MessageConstant.QUESTION_MUST_HAVE_ONE_LEAST_CORRECT_ANSWER
            )

        question = Question.objects.filter(id=question_id).first()
        if not question:
            raise CustomPermissionDenied(
                message=CoreMessageConstant.NOT_MATCH_ANY_RECORD
            )

        if question.type == "multiple_choice":
            correct_answers_count = sum(
                1 for option in options if option.get("is_correct", False)
            )

            if correct_answers_count == 0:
                raise CustomPermissionDenied(
                    message=CoreMessageConstant.QUESTION_MUST_HAVE_ONE_LEAST_CORRECT_ANSWER
                )

        return view_func(request, *args, **kwargs)

    return _wrapped_view
