from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from register.models import User

# Create your views here.
class post_sample_image(APIView):
    def post(self, request):
        try:
            request_data = request.data
            user = User.objects.get(id=request_data['user_id'])
            user_sample_image = user.sampleimage_set.filter(index = int(request_data['index']))
            if len(user_sample_image) != 0:
                user_sample_image[0].image.delete(save=True)
                user_sample_image[0].delete()

            user.sampleimage_set.create(user_id = int(request_data['user_id']), index = int(request_data['index']), image=request_data['file'])
            img_path = user.sampleimage_set.get(index=int(request_data['index']))
            return Response({'status' : 'Success', 'data' : img_path.image.name})
        except Exception as e:
            return Response({'status' : 'Failed', 'message' : str(e)})

class post_product_sell(APIView):
    def post(self, request):
        try:
            request_data = request.data
            user = User.objects.get(id=request_data['user_id'])

            if len(user.sampleimage_set.filter(index = 0)) != 0:
                img_0 = user.sampleimage_set.get(index = 0)
            if len(user.sampleimage_set.filter(index = 1)) != 0:
                img_1 = user.sampleimage_set.get(index = 1)
            if len(user.sampleimage_set.filter(index = 2)) != 0:
                img_2 = user.sampleimage_set.get(index = 2)
            if len(user.sampleimage_set.filter(index = 3)) != 0:
                img_3 = user.sampleimage_set.get(index = 3)
            
            user.product_set.create(
                name = request_data['name'],
                product_img_0 = img_0.image,
                product_img_1 = img_1.image,
                product_img_2 = img_2.image,
                product_img_3 = img_3.image,
                area = int(request_data['area']),
                unit = request_data['unit'],
                location = request_data['location']
            )
            return Response({'status' : 'Success', 'data' : ''})
        except Exception as e:
            return Response({'status' : 'Failed', 'message' : str(e)})
