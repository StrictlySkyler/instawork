from rest_framework import serializers
from .models import *

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = [
            'first_name', 
            'last_name',
            'email',
            'phone',
          ]