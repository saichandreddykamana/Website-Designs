from django.db import models

class demoCustomers(models.Model):
    customer_mail = models.EmailField(max_length=100)
    demo_date = models.DateTimeField('Demo Date')

    