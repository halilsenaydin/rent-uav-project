from rest_framework import serializers
from .models import Question, Option, Quiz, UserAnswer
from .constants import MessageConstant


class OptionSerializer(serializers.ModelSerializer):
    isCorrect = serializers.BooleanField(source="is_correct", default=False)
    image = serializers.ImageField(required=False, allow_null=True)
    question = serializers.PrimaryKeyRelatedField(
        queryset=Question.objects.all(), required=False
    )

    class Meta:
        model = Option
        fields = ["id", "text", "image", "isCorrect", "question"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.image:
            representation["image"] = instance.image.url
        return representation


class UserAnswerCreateSerializer(serializers.ModelSerializer):
    selectedOption = serializers.PrimaryKeyRelatedField(
        queryset=Option.objects.all(),
        required=False,
        source="selected_option",
        allow_null=True,
    )
    answerText = serializers.CharField(
        source="answer_text", allow_blank=True, allow_null=True
    )

    class Meta:
        model = UserAnswer
        fields = ["question", "selectedOption", "answerText", "user"]

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)


class UserAnswerSerializer(serializers.ModelSerializer):
    selectedOption = OptionSerializer(source="selected_option", read_only=True)
    answerText = serializers.CharField(
        source="answer_text", allow_blank=True, allow_null=True
    )

    class Meta:
        model = UserAnswer
        fields = ["question", "selectedOption", "answerText", "user"]


class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True, required=False, read_only=True)
    image = serializers.ImageField(required=False, allow_null=True)
    userAnswers = serializers.SerializerMethodField()
    createdDate = serializers.DateTimeField(source="created_date")

    class Meta:
        model = Question
        fields = [
            "id",
            "text",
            "image",
            "type",
            "level",
            "createdDate",
            "status",
            "options",
            "userAnswers",
        ]
        extra_kwargs = {
            "id": {"help_text": "The unique identifier for the question."},
            "text": {"help_text": "The text or content of the question."},
            "image": {
                "help_text": "An optional image associated with the question, if applicable.",
            },
            "type": {
                "help_text": "The type of question (e.g., multiple choice, true/false, etc.)."
            },
            "level": {
                "help_text": "The difficulty level of the question (e.g., easy, medium, hard)."
            },
            "createdDate": {
                "help_text": "The date and time when the question was created."
            },
            "status": {
                "help_text": "The current status of the question (e.g., active, inactive)."
            },
            "options": {
                "help_text": "The available answer options for the question, usually multiple choices."
            },
            "userAnswers": {
                "help_text": "The answers that the user has provided for this question."
            },
        }

    def validate(self, data):
        options = data.get("options")

        if options and not any(option["isCorrect"] for option in options):
            raise serializers.ValidationError(
                MessageConstant.QUESTION_MUST_HAVE_ONE_LEAST_CORRECT_ANSWER
            )

        return data

    def create(self, validated_data):
        options_data = validated_data.pop("options", [])
        question = Question.objects.create(**validated_data)

        for option_data in options_data:
            Option.objects.create(question=question, **option_data)
        return question

    def get_userAnswers(self, obj):
        user = self.context.get("user")
        if user:
            answers = obj.user_answers.filter(user=user)
            return UserAnswerSerializer(answers, many=True).data
        return []

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.image:
            representation["image"] = instance.image.url
        return representation


class QuizByUserNameSerializer(serializers.Serializer):
    username = serializers.CharField(
        source="user.username",
        help_text="The username of the user to generate the quiz for",
    )


class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    createdDate = serializers.DateTimeField(source="created_date")

    class Meta:
        model = Quiz
        fields = ["id", "user", "createdDate", "questions"]
        extra_kwargs = {
            "user": {
                "help_text": "The user who the quiz is associated with. This should be a valid user ID."
            },
            "createdDate": {
                "help_text": "The date and time when the quiz was created."
            },
            "questions": {"help_text": "A list of the questions included in the quiz."},
        }
