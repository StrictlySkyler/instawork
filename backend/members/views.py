from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from .serializer import *
from rest_framework.response import Response


class MemberView(APIView):
    serializer_class = MemberSerializer

    def get(self, request):
        member_list = [
            {
              "first_name": member.first_name,
              "last_name": member.last_name,
              "email": member.email,
              "phone": member.phone,
            } for member in Member.objects.all()]
        
        return Response(member_list)
    
    def post(self, request):
        serializer = MemberSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
