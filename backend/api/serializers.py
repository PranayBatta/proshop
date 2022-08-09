from attr import field
from django.contrib.auth.models import User
from .models import *
from rest_framework import serializers
from rest_framework_simplejwt.tokens import AccessToken

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','email','is_superuser']

class UserSerializerWithToken(UserSerializer):  #Users will be created with this serializer so that the get the token as soon as the create the account and they dont have to login to get the token.
    token=serializers.SerializerMethodField(read_only=True)

    class Meta:
        model=User
        fields=['id','username','email','token','is_superuser']
        
    def get_token(self,obj):
        token=AccessToken.for_user(obj)
        return str(token)

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields='__all__'

class CartShipSerializer(serializers.ModelSerializer):
    item=ProductSerializer()
    class Meta:
        model=CartShip
        fields='__all__'

class CartSerializer(serializers.ModelSerializer):
    items=CartShipSerializer(many=True)
    class Meta:
        model=Cart
        fields='__all__'

class ShippingAddress_Serializer(serializers.ModelSerializer):
    class Meta:
        model=ShippingAddress
        fields='__all__'

class OrderSerializer(serializers.ModelSerializer):
    user=UserSerializer(many=False)
    shippingAddress=ShippingAddress_Serializer(many=False)
    class Meta:
        model=Order
        fields='__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    item=ProductSerializer(many=False)
    class Meta:
        model=OrderItem
        fields=['item','quantity']


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model=Review
        fields='__all__'