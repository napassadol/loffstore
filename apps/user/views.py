import hashlib

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.user.models import User

from rest_framework import viewsets
from apps.user.serializers import UserSerializer


# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

class save_data_register(APIView):
    def post(self, request):
        data = request.data
        user_type = ''
        return_data = dict()

        return_data['status'] = 'Success'

        dup_data = User.objects.all().filter(email = data['phone']).values()
        if len(dup_data) > 0:
            return_data['status'] = 'Failure'
            return_data['message'] = 'phone already exists'

        if 'factory_name' in data:
            user_type = 'Factory'
        else:
            user_type = 'Farmer'

        if return_data['status'] == 'Success':
            if user_type == 'Farmer':
                register = User(
                    username = data['phone'],
                    password = hashlib.sha256(data['password'].encode()).hexdigest(),
                    firstname = data.get('first_name', ''),
                    lastname = data.get('last_name', ''),
                    email = data.get('email', ''),
                    phone = data['phone'],
                    user_type = User.Farmer,
                    verify = False,
                )
            elif user_type == 'Factory':
                register = User(
                    username = data.get('phone', ''),
                    password = hashlib.sha256(data['password'].encode()).hexdigest(),
                    factory_name = data.get('factory_name', ''),
                    email = data.get('email', ''),
                    phone = data.get('phone', ''),
                    user_type = User.Factory,
                    verify = False
                )
            register.save()
            
        return Response(return_data)

class save_data_register_fb(APIView):
    def post(self, request):
        data = request.data
        user_type = ''
        return_data = dict()

        return_data['status'] = 'Success'

        dup_data = User.objects.all().filter(username = data['username']).values()
        if len(dup_data) > 0:
            return_data['status'] = 'Failure'
            return_data['message'] = 'username already exists'

        # dup_data = User.objects.all().filter(email = data['email']).values()
        # if len(dup_data) > 0:
        #     return_data['status'] = 'Failure'
        #     return_data['message'] = 'email already exists'
        
        user_type = data['user_type']

        try:
            if return_data['status'] == 'Success':
                if user_type == 'Farmer':
                    register = User(
                        username = data['username'],
                        password = hashlib.sha256(data['username'].encode()).hexdigest(),
                        firstname = data['first_name'],
                        lastname = data['last_name'],
                        email = data['email'],
                        user_type = User.Farmer,
                        facebook_account = True,
                        verify = True
                    )
                elif user_type == 'Factory':
                    register = User(
                        username = data['username'],
                        password = hashlib.sha256(data['username'].encode()).hexdigest(),
                        firstname = data['first_name'],
                        lastname = data['last_name'],
                        factory_name = data['first_name'] + " " + data['last_name'],
                        email = data['email'],
                        user_type = User.Factory,
                        verify = True,
                        facebook_account = True
                    )
                register.save()
                return_data['data'] = User.objects.filter(username=data['username'], facebook_account=True).values()[0]
        except Exception as e:
            return_data['status'] = 'Failure'
            return_data['message'] = str(e)
            
        return Response(return_data)

class get_user_data(APIView):
    def post(self, request):
        data = request.data
        return_data = dict()
        return_data['status'] = 'Success'
        try:
            user = User.objects.filter(id=data['id']).values()
            return_data['data'] = user[0]
            return Response(return_data)
        except Exception as e:
            return_data['status'] = 'Failed'
            return Response(return_data)

class post_user_image(APIView):
    def post(self, request):
        try:
            request_data = request.data
            user = User.objects.get(id=request_data['id'])
            user.user_img = request_data['file_0']
            user.prop_img_0 = request_data['file_1']
            user.prop_img_1 = request_data['file_2']
            user.prop_img_2 = request_data['file_3']
            user.prop_img_3 = request_data['file_4']
            user.save()
            return Response({'status' : 'Success'})
        except Exception as e:
            print(str(e))
            return Response({'status' : 'Failed', 'message' : str(e)})

class add_information(APIView):
    def post(self, request):
        return_data = dict()
        return_data['status'] = 'Success'
        data = request.data
        try:
            user = User.objects.get(id=data['id'])

            user.username = data['username']
            user.firstname = data['firstname']
            user.lastname = data['lastname']
            user.email = data['email']
            user.phone = data['phone']
            user.verify = True
            user.address = data['address']
            user.detail = data['detail']
            user.age = data['age']
            user.area = data['area']
            user.save()
            return_data['data'] = User.objects.filter(id=data['id']).values()[0]
        except Exception as e:
            return_data['status'] = 'Failed'
            return_data['message'] = str(e)
        
        return Response(return_data)


            

