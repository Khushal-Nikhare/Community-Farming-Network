from django.apps import AppConfig


class Farm2HomeConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Farm2Home'
    
    def ready(self):
        import Farm2Home.signals
