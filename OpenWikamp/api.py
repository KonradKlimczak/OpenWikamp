from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

"""
REST API for OpenWikamp App
"""

urlpatterns = [
    url(r'^post/$', views.PostList.as_view()),
    url(r'^current/', views.CurrentUser.as_view()),
    url(r'^subject/$', views.SubjectList.as_view()),
    url(r'^subject/(?P<pk>[0-9]+)/$', views.SubjectDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)

