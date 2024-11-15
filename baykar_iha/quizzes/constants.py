class QuestionConstant:
    QUESTION_TYPE_CHOICES = [
        ("multiple_choice", "Çoktan Seçmeli"),
        ("classic", "Klasik"),
        ("true_false", "Doğru/Yanlış"),
        ("fill_in_the_blank", "Boşluk Doldurma"),
    ]

    QUESTION_LEVEL_CHOICES = [
        ("1", "Acemi"),
        ("2", "Deneyimli"),
        ("3", "Usta"),
        ("4", "Bilge"),
    ]


class MessageConstant:
    SUCCESS_ADD_QUESTION = "Soru Başarıyla Oluşturuldu"
    SUCCESS_UPDATE_QUESTION = "Soru Bilgileri Güncellendi"
    SUCCESS_DELETE_QUESTION = "Soru Başarıyla Silindi"

    SUCCESS_ADD_QUIZ = "Kısa Sınav Başarıyla Oluşturuldu"
    SUCCESS_UPDATE_QUIZ = "Kısa Sınav Bilgileri Güncellendi"
    SUCCESS_DELETE_QUIZ = "Kısa Sınav Başarıyla Silindi"
    ERROR_GENERATE_QUIZ = "Sistemde İstenilen Sayıda Soru Yok"

    ERROR_NOT_FOUND_USERNAME = "Kullanıcı adı zorunlu parametredir"

    SUCCESS_ADD_OPTION = "Soru Cevabı Başarıyla Oluşturuldu"
    SUCCESS_UPDATE_OPTION = "Soru Cevabı Bilgileri Güncellendi"
    SUCCESS_DELETE_OPTION = "Soru Cevabı Başarıyla Silindi"

    SUCCESS_ADD_USER_ANSWER = "Kullanıcı Cevabı Başarıyla Kaydedildi"
    SUCCESS_UPDATE_USER_ANSWER = "Kullanıcı Cevabı Güncellendi"
    SUCCESS_DELETE_USER_ANSWER = "Kullanıcı Cevabı Başarıyla Silindi"

    QUESTION_MUST_HAVE_ONE_LEAST_CORRECT_ANSWER = (
        "Sorunun En Az Bir Doğru Cevabı Olmalıdır"
    )
    OPTION_FORMAT_IS_INVALID = "Options Alanı JSON Formatında Olmalıdır"
