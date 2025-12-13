# user.py
def register_user(username, password):
    if not username:
        raise ValueError("Username cannot be empty")
    # For now, just simulate registration
    return f"User {username} registered successfully"
