"""
Constants for inventory management and messaging.

Classes:
- InventoryConstant: Defines constants related to inventory items and teams.
- MessageConstant: Contains messages for various operations and error handling.
- ErrorConstant: Holds error codes and messages for unauthorized access.
"""


class InventoryConstant:
    WING = "Kanat"
    BODY = "Gövde"
    TAIL = "Kuyruk"
    AVIONICS = "Aviyonik"

    WING_TEAM = "Kanat Takımı"
    BODY_TEAM = "Gövde Takımı"
    TAIL_TEAM = "Kuyruk Takımı"
    AVIONICS_TEAM = "Aviyonik Takımı"
    ASSEMBLY_TEAM = "Montaj Takımı"

    ALLOWED_PIECES_TO_PRODUCE_BY_TEAM = {
        WING_TEAM: WING,
        BODY_TEAM: BODY,
        TAIL_TEAM: TAIL,
        AVIONICS_TEAM: AVIONICS,
    }


class MessageConstant:
    UNAUTHORIZED = "İşlemi Gerçekleştirmek için Gerekli İzne Sahip Değilsiniz"
    NOT_ALLOWED_ADD_THIS_PIECE = "Bu Parçayı Üretmek için Gerekli İzne Sahip Değilsiniz"
    PIECE_DOESNT_EXIST = "Üretmek İstediğin Parçanın Henüz Tasarımı Tamamlanmamış"
    YOU_MUSNT_BELONG_TO_A_TEAM = (
        "İşlemi Gerçekleştirmek için Bir Takımın Parçası Olmanız Gerekmektedir"
    )
    AIRPLANE_DOESNT_EXIST = "Üretmek İstediğin IHA'nın Henüz Tasarımı Tamamlanmamış"
    PIECE_NOT_SUITABLE_FOR_PRODUCE = "Monte Edilmek İstenen Parçalar IHA ile Uyumlu Değil ya da Monte Etmek İstediğin Parçalar Daha Önce Kullanılmış"
    USER_MUST_BELONG_TO_ASSEMBLY_TEAM = (
        "Bu İşlemi Sadece Montaj Takımı Üyeleri Gerçekleştirebilir"
    )
    PIECE_USING_ON_A_AIRPLANE = (
        "Üretilen Parça Montajı Tamamlanan Bir IHA'da Kullanılmaktadır"
    )

    NOT_MATCH_ANY_RECORD = "Herhangi bir eşleşme bulunamadı"


class ErrorConstant:
    UNAUTHORIZED_STATUS_CODE = 401
    UNAUTHORIZED_CODE = "unauthorized"
    UNAUTHORIZED_DETAIL = "Unauthorized access"
