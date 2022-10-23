from django.urls import path
from chats.consumers import ChatConsumer, NotificationConsumer
websocket_urlpatterns = [
    path("<conversation_name>/", ChatConsumer.as_asgi()),
    path("notifications/", NotificationConsumer.as_asgi()),
]