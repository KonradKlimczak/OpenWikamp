from django import forms
from django.forms import widgets
from .models import *

class SubjectForm(forms.ModelForm):
    class Meta:
        model = Subject
        fields = ('title', 'head_teacher', 'description',)

class ActivityTypeForm(forms.Form):
    type = forms.ChoiceField(choices=('task', 'file', 'next',))
