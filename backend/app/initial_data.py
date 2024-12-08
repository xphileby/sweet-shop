import asyncio
from app.db.session import SessionLocal
from app.core.security import get_password_hash
from app.models.user import User
from app.models.product import Category, Product

def init_db() -> None:
    db = SessionLocal()
    try:
        # Create superuser
        user = db.query(User).filter(User.email == "admin@sweetshop.com").first()
        if not user:
            user = User(
                email="admin@sweetshop.com",
                hashed_password=get_password_hash("admin123"),
                full_name="Admin User",
                is_superuser=True,
                is_active=True,
            )
            db.add(user)
            db.commit()
            db.refresh(user)

        # Create categories
        categories = {
            "Chocolates": {
                "description": "Handmade chocolates with premium ingredients",
                "subcategories": ["Dark Chocolate", "Milk Chocolate", "White Chocolate"]
            },
            "Cakes": {
                "description": "Fresh baked cakes for all occasions",
                "subcategories": ["Birthday Cakes", "Wedding Cakes", "Cupcakes"]
            },
            "Seasonal": {
                "description": "Special treats for holidays and seasons",
                "subcategories": ["Christmas", "Valentine's Day", "Easter"]
            }
        }

        for category_name, data in categories.items():
            category = db.query(Category).filter(Category.name == category_name).first()
            if not category:
                category = Category(
                    name=category_name,
                    description=data["description"]
                )
                db.add(category)
                db.commit()
                db.refresh(category)

                for subcategory_name in data["subcategories"]:
                    subcategory = Category(
                        name=subcategory_name,
                        parent_id=category.id,
                        description=f"{subcategory_name} treats"
                    )
                    db.add(subcategory)
                db.commit()

        # Create sample products
        sample_products = [
            {
                "name": "Dark Chocolate Truffles",
                "description": "Rich dark chocolate truffles with a smooth ganache filling",
                "price": 12.99,
                "stock": 50,
                "category_name": "Dark Chocolate"
            },
            {
                "name": "Classic Vanilla Birthday Cake",
                "description": "Moist vanilla cake with buttercream frosting",
                "price": 29.99,
                "stock": 10,
                "category_name": "Birthday Cakes"
            },
            {
                "name": "Christmas Cookie Box",
                "description": "Assorted holiday cookies in a festive box",
                "price": 24.99,
                "stock": 30,
                "category_name": "Christmas"
            }
        ]

        for product_data in sample_products:
            category = db.query(Category).filter(Category.name == product_data["category_name"]).first()
            if category:
                product = db.query(Product).filter(Product.name == product_data["name"]).first()
                if not product:
                    product = Product(
                        name=product_data["name"],
                        description=product_data["description"],
                        price=product_data["price"],
                        stock=product_data["stock"],
                        category_id=category.id,
                        is_active=True
                    )
                    db.add(product)
        db.commit()

    finally:
        db.close()

if __name__ == "__main__":
    init_db()