from django.conf import settings
import google.generativeai as genai
# import os
# from dotenv import load_dotenv
# load_dotenv()

# genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
# Create the model
# See https://ai.google.dev/api/python/google/generativeai/GenerativeModel
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

def get_gemini_response(user_input):
    print(user_input)
    response = chat_session.send_message(user_input)
    model_response = response.text
    print(model_response)
    return model_response
