from rest_framework.generics import get_object_or_404
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.viewsets import GenericViewSet
from .models import Conversation
from .serializers import ConversationSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from accounts.models import User
from accounts.serializers import UserSerializer

class ConversationViewSet(ListModelMixin, RetrieveModelMixin, GenericViewSet):
    serializer_class = ConversationSerializer
    queryset = Conversation.objects.none()
    lookup_field = "name"

    def get_queryset(self):
        queryset = Conversation.objects.filter(
            name__contains=self.request.user.username
        )
        return queryset

    def get_serializer_context(self):
        return {"request": self.request, "user": self.request.user}

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def conversationsList(request):
    user = request.user
    conversations = Conversation.objects.filter(name__contains=user.username)
    participants = []
    for conversation in conversations:
        for username in conversation.name.split("-"):
            if username != user.username:
                participants.append(User.objects.get(username=username))
    serializer = UserSerializer(participants, many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)