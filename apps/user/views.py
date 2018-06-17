import hashlib

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.user.models import User


# Create your views here.
class save_data_register(APIView):
    def post(self, request):
        data = request.data
        user_type = ''
        return_data = dict()

        return_data['status'] = 'Success'

        dup_data = User.objects.all().filter(username = data['username']).values()
        if len(dup_data) > 0:
            return_data['status'] = 'Failure'
            return_data['message'] = 'username already exists'

        dup_data = User.objects.all().filter(email = data['email']).values()
        if len(dup_data) > 0:
            return_data['status'] = 'Failure'
            return_data['message'] = 'email already exists'

        dup_data = User.objects.all().filter(phone = data['phone']).values()
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
                    username = data['username'],
                    password = hashlib.sha256(data['password'].encode()).hexdigest(),
                    firstname = data['first_name'],
                    lastname = data['last_name'],
                    email = data['email'],
                    phone = data['phone'],
                    user_type = User.Farmer,
                    verify = False,
                )
            elif user_type == 'Factory':
                register = User(
                    username = data['username'],
                    password = hashlib.sha256(data['password'].encode()).hexdigest(),
                    factory_name = data['factory_name'],
                    email = data['email'],
                    phone = data['phone'],
                    user_type = User.Factory,
                    verify = False
                )
            register.save()
            
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
            user = User.objects.get(id=request_data['user_id'])
            user_user_image = user.userimage_set.filter(index = int(request_data['index']))
            if len(user_user_image) != 0:
                user_user_image[0].image.delete(save=True)
                user_user_image[0].delete()

            user.userimage_set.create(user_id = int(request_data['user_id']), index = int(request_data['index']), image=request_data['file'])
            img_path = user.userimage_set.get(index=int(request_data['index']))
            return Response({'status' : 'Success', 'data' : img_path.image.name})
        except Exception as e:
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

            user.user_img = user.userimage_set.get(index = 4).image if len(user.userimage_set.filter(index = 4)) == 1 else user.user_img
            user.prop_img_0 = user.userimage_set.get(index = 0).image if len(user.userimage_set.filter(index = 0)) == 1 else user.prop_img_0
            user.prop_img_1 = user.userimage_set.get(index = 1).image if len(user.userimage_set.filter(index = 1)) == 1 else user.prop_img_1
            user.prop_img_2 = user.userimage_set.get(index = 2).image if len(user.userimage_set.filter(index = 2)) == 1 else user.prop_img_2
            user.prop_img_3 = user.userimage_set.get(index = 3).image if len(user.userimage_set.filter(index = 3)) == 1 else user.prop_img_3

            user.save()
            return_data['data'] = User.objects.filter(id=data['id']).values()[0]
        except Exception as e:
            return_data['status'] = 'Failed'
            return_data['message'] = str(e)
        
        return Response(return_data)


            

