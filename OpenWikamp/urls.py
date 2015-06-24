from django.conf.urls import include, url
from . import views

urlpatterns = [
    url(r'^$', views.post_list),
    url(r'^subject/$', views.subject_list),
    url(r'^subject/(?P<pk>[0-9]+)/$', views.subject_details),
]