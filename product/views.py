from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from product.models import Product
from product.models import SampleImage

# Create your views here.
class post_sample_image(APIView):
    def post(self, request):
        try:
            request_data = request.data
            remove_duplicate = SampleImage.objects.filter(user_id = int(request_data['user_id']), index = int(request_data['index']))
            if len(remove_duplicate) != 0:
                remove_duplicate[0].image.delete(save = True)
                remove_duplicate[0].delete()

            img = SampleImage(user_id = int(request_data['user_id']), index = int(request_data['index']), image=request_data['file'])
            img.save()
            return Response({'status' : 'Success', 'data' : img.image.name})
        except Exception as e:
            return Response({'status' : 'Failed', 'message' : str(e)})

class post_product_sell(APIView):
    def post(self, request):
        try:
            request_data = request.data
            if len(SampleImage.objects.filter(user_id = int(request_data['user_id']), index = 0)) != 0:
                img_0 = SampleImage.objects.get(user_id = int(request_data['user_id']), index = 0)
            if len(SampleImage.objects.filter(user_id = int(request_data['user_id']), index = 1)) != 0:
                img_1 = SampleImage.objects.get(user_id = int(request_data['user_id']), index = 1)
            if len(SampleImage.objects.filter(user_id = int(request_data['user_id']), index = 2)) != 0:
                img_2 = SampleImage.objects.get(user_id = int(request_data['user_id']), index = 2)
            if len(SampleImage.objects.filter(user_id = int(request_data['user_id']), index = 3)) != 0:
                img_3 = SampleImage.objects.get(user_id = int(request_data['user_id']), index = 3)
            
            post_product = Product(
                name = request_data['name'],
                product_img_0 = img_0.image,
                product_img_1 = img_1.image,
                product_img_2 = img_2.image,
                product_img_3 = img_3.image,
                area = int(request_data['area']),
                unit = request_data['unit'],
                user_id = request_data['user_id'],
                location = request_data['location']
            )
            post_product.save()
            return Response({'status' : 'Success', 'data' : ''})
        except Exception as e:
            return Response({'status' : 'Failed', 'message' : str(e)})
