from app import app
from models import db, User

with app.app_context():
    User.query.delete()

    db.session.commit()

    print("Seeding users...")
    user1 = User(first_name="Kye", last_name="Schnei", username="kyescool")
    user1.password_hash = "hi"
    db.session.add(user1)
    db.session.commit()

    print("Fini...")