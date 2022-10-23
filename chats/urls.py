# from .views import ConversationViewSet
# from rest_framework import routers
# router = routers.SimpleRouter()
# router.register("conversations/", ConversationViewSet)

# urlpatterns = router.urls

from . import views
from django.urls import path

urlpatterns = [
    path("conversations/", views.conversationsList, name="conversations")
]