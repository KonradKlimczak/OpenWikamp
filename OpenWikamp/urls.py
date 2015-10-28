from django.conf.urls import include, url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    url(r'^$', views.post_list),
    url(r'^subject/$', views.subject_list),
    url(r'^subject/(?P<pk>[0-9]+)/$', views.subject_details),
    url(r'^subject/(?P<pk>[0-9]+)/edit/$', views.subject_edit),
    url(r'^subject/(?P<pk>[0-9]+)/activity/(?P<acid>[0-9]+)/$', views.activity_file),
    url(r'^lesson/(?P<pk>[0-9]+)/activity/$', views.activity_list),
    url(r'^lesson/(?P<pk>[0-9]+)/activity/add/$', views.activity_add),
    # api restowe
    url(r'^post/$', views.PostList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
