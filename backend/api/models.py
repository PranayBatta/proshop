from statistics import quantiles
from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)  #User of a company adding the image
    name = models.CharField(max_length=200)
    image = models.ImageField( upload_to="",default='/placeholder.png')
    brand = models.CharField(max_length=200)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, default=0)
    numReviews = models.IntegerField(default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2)
    countInStock = models.IntegerField(default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)


    def __str__(self):
        return self.name


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return "Of"+self.product.name+"from"+self.user.username


class ShippingAddress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    postalCode = models.CharField(max_length=200)
    country = models.CharField(max_length=200)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self._id)+"of"+self.user.username


class CartShip(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    item=models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity=models.IntegerField()

    def __str__(self):
        return self.item.name+" of "+self.user.username

class Cart(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True)
    items=models.ManyToManyField(CartShip,null=True)

    def __str__(self):
        return "Cart of "+self.user.username

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    paymentMethod = models.CharField(max_length=200)
    # subtotal=models.DecimalField(max_digits=7, decimal_places=2)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    shippingAddress=models.ForeignKey(ShippingAddress, on_delete=models.DO_NOTHING,null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self._id)+"of"+self.user.username

class OrderItem(models.Model):
    order=models.ForeignKey(Order, on_delete=models.CASCADE)
    item=models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    quantity=models.IntegerField()

    def __str__(self):
        return str(self.order.user)

#Make custom user and add cart to it