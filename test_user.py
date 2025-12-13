from user import register_user

def test_register_user_success():
    result = register_user("aubs", "password123")
    assert result == "User aubs registered successfully"

def test_register_user_empty_username():
    try:
        register_user("", "password123")
        assert False, "Expected ValueError"
    except ValueError as e:
        assert str(e) == "Username cannot be empty"
