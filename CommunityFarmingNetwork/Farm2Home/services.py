from django.conf import settings
import google.generativeai as genai
from .models import Product

# Configure the Gemini API with the API key from settings
if settings.GEMINI_API_KEY:
    genai.configure(api_key=settings.GEMINI_API_KEY)
else:
    import warnings
    warnings.warn(
        "GEMINI_API_KEY is not configured. Gemini AI features will not work.",
        RuntimeWarning
    )

generation_config = settings.GEMINI_GENERATION_CONFIG
safety_settings = settings.GEMINI_SAFETY_SETTINGS

model = genai.GenerativeModel(
  model_name=settings.GEMINI_MODEL_NAME,
  safety_settings=safety_settings,
  generation_config=generation_config,
  system_instruction=settings.GEMINI_SYSTEM_INSTRUCTION,
)

chat_session = model.start_chat(
    history=[]
)
import time

def get_gemini_response(user_input):
    
    
    start_time = time.time()

    print(user_input)
    gemini_start_time = time.time()
    response = chat_session.send_message(user_input)
    model_response = response.text
    gemini_end_time = time.time()
    print(model_response)

    # Product Suggestion Logic
    if "suggest" in user_input.lower() or "recommend" in user_input.lower():
        db_start_time = time.time()
        db_end_time = None  # Initialize db_end_time
        try:
            # Extract keywords from user input (e.g., "organic tomatoes", "fresh fruits")
            keywords = user_input.lower().replace("suggest", "").replace("recommend", "").strip()

            # Search for products based on keywords
            products = Product.objects.filter(productName__icontains=keywords)  # Case-insensitive search
            db_end_time = time.time()

            if products.exists():
                product_suggestions = "\n".join([f"- {product.productName} (₹{product.productPrice}/{product.pricePerUnit})" for product in products[:3]])  # Limit to 3 suggestions
                model_response += f"\n\nBased on your request, here are some product suggestions:\n{product_suggestions}"
            else:
                model_response += "\n\nSorry, I couldn't find any products matching your request."

        except Exception as e:
            model_response += f"\n\nAn error occurred while searching for products: {e}"

        end_time = time.time()

        print(f"Total execution time: {end_time - start_time:.4f} seconds")
        print(f"Gemini API call time: {gemini_end_time - gemini_start_time:.4f} seconds")
        if db_end_time:
            print(f"Database query time: {db_end_time - db_start_time:.4f} seconds")
        else:
            print("Database query time: N/A (query failed)")
    
    return model_response