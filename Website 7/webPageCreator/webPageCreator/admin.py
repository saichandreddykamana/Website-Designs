from django.contrib import admin
from .models import demoCustomers, users

admin.site.register(demoCustomers)
admin.site.register(users)