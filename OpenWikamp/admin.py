from django.contrib import admin
from .models import Subject, Schedule, Lesson, Activity
# Register your models here.

admin.site.register(Subject)
admin.site.register(Schedule)
admin.site.register(Lesson)
admin.site.register(Activity)