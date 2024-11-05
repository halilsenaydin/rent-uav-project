"""
Constants for message strings used in the application.

This class defines success and error messages related to the 
management of airplanes, pieces, and produced items. These messages 
are used for user feedback throughout the application.
"""


class MessageConstant:
    SUCCESS_ADD_AIRPLANE = "Uçak Başarıyla Oluşturuldu"
    SUCCESS_UPDATE_AIRPLANE = "Uçak Bilgileri Güncellendi"
    SUCCESS_DELETE_AIRPLANE = "Uçak Başarıyla Silindi"

    SUCCESS_ADD_PIECE = "Parça Başarıyla Oluşturuldu"
    SUCCESS_UPDATE_PIECE = "Parça Bilgileri Güncellendi"
    SUCCESS_DELETE_PIECE = "Parça Başarıyla Silindi"

    SUCCESS_ADD_PRODUCED_PIECE = "Üretilen Parça Başarıyla Eklendi"
    SUCCESS_UPDATE_PRODUCED_PIECE = "Üretilen Parça Bilgileri Güncellendi"
    SUCCESS_DELETE_PRODUCED_PIECE = "Üretilen Parça Başarıyla Geri Dönüşüme Gönderildi"
    ERROR_DELETE_PRODUCED_PIECE = (
        "Montajı Tamamlanan Bir Parça Geri Dönüşüme Gönderilemez"
    )

    SUCCESS_ADD_PRODUCED_AIRPLANE = "Üretilen Uçak Başarıyla Eklendi"
    SUCCESS_UPDATE_PRODUCED_AIRPLANE = "Üretilen Uçak Bilgileri Güncellendi"
    SUCCESS_DELETE_PRODUCED_AIRPLANE = (
        "Üretilen Uçak Başarıyla Geri Dönüşüme Gönderildi"
    )

    NOT_MATCH_ANY_RECORD = "Herhangi bir eşleşme bulunamadı"
