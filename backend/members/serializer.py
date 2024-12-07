from rest_framework import serializers
from .models import *
import string
import secrets

allowed_chars = string.ascii_letters + string.digits

def get_password(length=10, chars=allowed_chars):
    return ''.join(secrets.choice(chars) for i in range(length))

class MemberSerializer(serializers.ModelSerializer):
    admin = serializers.CharField(source='is_superuser')

    class Meta:
        model = User
        fields = [
            'first_name', 
            'last_name',
            'email',
            'phone',
            'admin',
          ]
        
    def get_is_superuser(self, obj):
        return obj.is_superuser

    def create(self, data):
        new_password = get_password()
        user = User.objects.create(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            phone=data['phone'],
            username=data['email'],
            is_staff=1,
            is_superuser=int(data['is_superuser']),
        )
        user.set_password(new_password);
        # If we had an SMTP server, we'd email this to a new user with
        # an email template and a link to a password reset workflow.
        print(
          f"**** New user: {data['email']} with password: {new_password} ****"
        )
        user.save()
        return user