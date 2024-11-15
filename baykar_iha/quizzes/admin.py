from django.contrib import admin
from .models import Question, Quiz, Option, UserAnswer
from django.core.exceptions import ValidationError


class OptionInline(admin.TabularInline):
    model = Option
    extra = 1


class QuestionAdmin(admin.ModelAdmin):
    inlines = [OptionInline]
    list_display = ("id", "type", "level")
    list_display_links = ("id",)
    search_fields = ("level", "text", "type")

    def save_related(self, request, form, formsets, change):
        super().save_related(request, form, formsets, change)

        question = form.instance
        options = question.options.all()

        if not any(option.is_correct for option in options):
            raise ValidationError("At least one option must be correct.")


class OptionAdmin(admin.ModelAdmin):
    list_display = ("id", "is_correct")
    list_display_links = ("id",)
    list_editable = ("is_correct",)


class QuizAdmin(admin.ModelAdmin):
    list_display = ("id",)
    list_display_links = ("id",)


class UserAnswerAdmin(admin.ModelAdmin):
    list_display = ("id", "question", "selected_option")
    list_display_links = ("id",)


admin.site.register(Question, QuestionAdmin)
admin.site.register(Option, OptionAdmin)
admin.site.register(Quiz, QuizAdmin)
admin.site.register(UserAnswer, UserAnswerAdmin)
