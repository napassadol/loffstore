from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.user.models import User
from apps.product.models import Product

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
            
            user.product_set.create(
                name = request_data['name'],
                product_img_0 = user.sampleimage_set.get(index = 0).image if len(user.sampleimage_set.filter(index = 0)) == 1 else None,
                product_img_1 = user.sampleimage_set.get(index = 1).image if len(user.sampleimage_set.filter(index = 1)) == 1 else None,
                product_img_2 = user.sampleimage_set.get(index = 2).image if len(user.sampleimage_set.filter(index = 2)) == 1 else None,
                product_img_3 = user.sampleimage_set.get(index = 3).image if len(user.sampleimage_set.filter(index = 3)) == 1 else None,
                area = int(request_data['area']),
                unit = request_data['unit'],
                price = request_data['price'],
                location = request_data['location']
            )
            return Response({'status' : 'Success', 'data' : ''})
        except Exception as e:
            return Response({'status' : 'Failed', 'message' : str(e)})

class get_all_products(APIView):
    def get(self, response):
        return_data = dict()
        return_data['status'] = 'Success'
        try:
            products = Product.objects.all().values()
            return_data['data'] = products
        except Exception as e:
            return_data['status'] = "Failed"
        
        return Response(return_data)

