class SerializerUtil:
    @staticmethod
    def get_error_messages(serializer_errors):
        """
        Retrieves error messages from a serializer's error dictionary or list.

        Args:
            serializer_errors (dict or list): A dictionary or list containing error messages for fields.

        Returns:
            str: A formatted string of error messages, each indicating
                 the field and its corresponding errors, separated by
                 semicolons.
        """
        if isinstance(serializer_errors, list):
            return "; ".join(str(error) for error in serializer_errors)

        error_messages = []
        for field, msgs in serializer_errors.items():
            if isinstance(msgs, list):
                msgs = [
                    str(msg) if not isinstance(msg, dict) else str(msg) for msg in msgs
                ]
            error_messages.append(f"{field}: {', '.join(msgs)}")

        return "; ".join(error_messages)
