from django.db import models

class demoCustomers(models.Model):
    customer_mail = models.EmailField(max_length=100)
    demo_date = models.DateTimeField('Demo Date')
    
    
class users(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.EmailField(max_length=150)
    password = models.CharField(max_length=200)
    