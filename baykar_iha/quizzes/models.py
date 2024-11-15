from django.db import models
from django.contrib.auth.models import User
from .constants import QuestionConstant


class Question(models.Model):
    text = models.CharField(max_length=500)
    image = models.ImageField(upload_to="question_images", null=True, blank=True)
    type = models.CharField(choices=QuestionConstant.QUESTION_TYPE_CHOICES)
    level = models.CharField(choices=QuestionConstant.QUESTION_LEVEL_CHOICES)
    created_date = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.text} - {self.type} - {self.level}"


class Option(models.Model):
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="options"
    )
    text = models.CharField(max_length=250)
    image = models.ImageField(upload_to="option_images/", null=True, blank=True)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.text} - {self.is_correct}"


class Quiz(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    questions = models.ManyToManyField(Question)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.created_date}"


class UserAnswer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="answers")
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="user_answers"
    )
    selected_option = models.ForeignKey(
        Option, on_delete=models.CASCADE, null=True, blank=True
    )
    answer_text = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.question.id}"
