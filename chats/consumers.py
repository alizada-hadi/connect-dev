from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync
from .models import Conversation, Message
from accounts.models import User
from .serializers import MessageSerializer


class ChatConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.room_name = None
        self.user = None
        self.conversation_name = None
        self.conversation = None

    def connect(self):
        self.user = self.scope["user"]
        if not self.user.is_authenticated:
            return
        self.accept()
        self.conversation_name = f"{self.scope['url_route']['kwargs']['conversation_name']}"
        self.conversation, created = Conversation.objects.get_or_create(name=self.conversation_name)
        message = self.conversation.messages.all().order_by("timestamp")
        async_to_sync(self.channel_layer.group_add)(
            str(self.conversation_name),
            self.channel_name,
        )
        self.send_json(
            {
                "type" : "online_user_list", 
                "users" : [user.username for user in self.conversation.online.all()]
            }
        )
        
        async_to_sync(self.channel_layer.group_send)(
            str(self.conversation_name), 
            {
                "type" : "user_join", 
                "user" : self.user.username
            }
        )
        self.send_json(
            {
                "type" : "last_50_messages", 
                "messages" : MessageSerializer(message, many=True).data
            }
        )
        self.conversation.online.add(self.user)
    def disconnect(self, code):
        if self.user.is_authenticated:
            async_to_sync(self.channel_layer.group_send)(
                str(self.conversation_name),
                {
                    "type" : "user_leave", 
                    "user" : self.user.username
                }
            )
            self.conversation.online.remove(self.user)
        return super().disconnect(code)

    def get_receiver(self):
        usernames = self.conversation_name.split("-")
        for username in usernames:
            if username != self.user.username:
                user =  User.objects.get(username=username)
                return user


    def receive_json(self, content, **kwargs):
        message_type = content["type"]
        if message_type == "chat_message":
            message = Message.objects.create(
                from_user=self.user, 
                to_user = self.get_receiver(), 
                content=content["message"],
                conversation=self.conversation
            )
            async_to_sync(self.channel_layer.group_send)(
                self.conversation_name,
                {
                    "type": "chat_message_echo",
                    "name": self.user.username,
                    "message": MessageSerializer(message).data
                },
            )
            notification_group_name = self.get_receiver().username + "__notifications"
            async_to_sync(self.channel_layer.group_send)(
                notification_group_name,
                {
                    "type": "new_message_notification",
                    "name": self.user.username,
                    "message": MessageSerializer(message).data,
                },
            )
        if message_type == "typing":
            async_to_sync(self.channel_layer.group_send)(
                self.conversation_name,
                {
                    "type": "typing",
                    "user": self.user.username,
                    "typing": content["typing"],
                },
            )
        return super().receive_json(content, **kwargs)

    def chat_message_echo(self, event):
        self.send_json(event)

    def user_join(self, event):
        self.send_json(event)

    def user_leave(self, event):
        self.send_json(event)

    def typing(self, event):
        self.send_json(event)

    def new_message_notification(self, event):
        self.send_json(event)



class NotificationConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.user = None

    def connect(self):
        self.user = self.scope["user"]
        if not self.user.is_authenticated:
            return

        self.accept()

        self.notification_group_name = self.user.username + "__notifications"
        async_to_sync(self.channel_layer.group_add)(
            self.notification_group_name,
            self.channel_name,
        )

        unread_count = Message.objects.filter(to_user=self.user, read=False).count()
        self.send_json(
            {
                "type": "unread_count",
                "unread_count": unread_count,
            }
        )

    def disconnect(self, code):
        async_to_sync(self.channel_layer.group_discard)(
            self.notification_group_name,
            self.channel_name,
        )
        return super().disconnect(code)

    
    def new_message_notification(self, event):
        self.send_json(event)

    def unread_count(self, event):
        self.send_json(event)
