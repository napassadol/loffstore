from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from register.models import User

# Create your views here.
class save_data_register(APIView):
    def post(self, request):
        data = request.data
        register = User(
            username = data['username'],
            password = data['password'],
            firstname = data['first_name'],
            lastname = data['last_name'],
            email = data['email'],
            phone = data['phone']
        )
        register.save()
        return Response({'data': 'test'})