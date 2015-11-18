from django.conf.urls import include, url
from django.views.generic import RedirectView
from OpenWikamp.views import IndexView
from . import views

urlpatterns = [
    url(r'^api/', include('OpenWikamp.api')),
    url(r'^$', RedirectView.as_view(pattern_name='index')),
    url(r'^app/.*$', IndexView.as_view(template_name='index.html'), name='index'),
    url(r'^login/', views.login_user),
]

