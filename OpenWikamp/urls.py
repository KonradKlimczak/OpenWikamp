from django.conf.urls import include, url
from django.views.generic import RedirectView
from rest_framework.urlpatterns import format_suffix_patterns
from OpenWikamp.views import IndexView
from . import views

urlpatterns = [
    # url(r'^$', views.post_list),
    # api restowe
    url(r'^post/$', views.PostList.as_view()),
    url(r'^current/', views.CurrentUser.as_view()),
    url(r'^subject/$', views.SubjectList.as_view()),
    url(r'^subject/(?P<pk>[0-9]+)/$', views.SubjectDetail.as_view()),

    url(r'^$', RedirectView.as_view(pattern_name='index')),
    url(r'^app/.*$', IndexView.as_view(template_name='index.html'), name='index'),
    url(r'^login/', views.login_user),
]

urlpatterns = format_suffix_patterns(urlpatterns)
