class SerializerUtil:
    @staticmethod
    def get_error_messages(serializer_errors):
        """
        Retrieves error messages from a serializer's error dictionary.

        Args:
            serializer_errors (dict): A dictionary containing error messages for various fields of a serializer.

        Returns:
            str: A formatted string of error messages, each indicating
                 the field and its corresponding errors, separated by
                 semicolons.
        """
        error_messages = [
            f"{field}: {', '.join(msgs)}" for field, msgs in serializer_errors.items()
        ]
        error_message = "; ".join(error_messages)
        return error_message
