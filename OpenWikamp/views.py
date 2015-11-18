from django.shortcuts import render, get_object_or_404, redirect, render_to_response
from django.http import *
from django.template import RequestContext
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import Group
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from OpenWikamp.models import Post
from OpenWikamp.serializers import PostSerializer, UserSerializer, SubjectSerializer, SubjectDetailSerializer
from django.views.generic.base import TemplateView
from .models import *
from .forms import *


def login_user(request):
    logout(request)
    username = password = ''
    if request.POST:
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect('/app/')
    return render_to_response('login.html', context_instance=RequestContext(request))


def is_in_group(user, group_name):
    return Group.objects.get(name=group_name).user_set.filter(id=user.id).exists()


class IndexView(TemplateView):
    template_name = 'index.html'

    @method_decorator(login_required(login_url='/login/'))
    def dispatch(self, *args, **kwargs):
        return super(IndexView, self).dispatch(*args, **kwargs)


class CurrentUser(APIView):
    def get(self, request):
        user = request.user
        if user.is_active:
            serializer = UserSerializer(request.user)
            return Response(serializer.data)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


def group_permission(group):
    def decorator(a_view):
        def _wrapped_view(request, *args, **kwargs):
            if is_in_group(request.user, group) or request.user.is_superuser:
                return a_view(request, *args, **kwargs)
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        return _wrapped_view
    return decorator


class PostList(APIView):
    def get(self, request, format=None):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        user = request.user
        if user.is_active:
            return Response(serializer.data)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request, format=None):
        serializer = PostSerializer(data=request.data)
        user = request.user
        if is_in_group(user, 'Teachers') or user.is_superuser:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class SubjectList(APIView):
    def get(self, request, format=None):
        subjects = Subject.objects.all()
        serializer = SubjectSerializer(subjects, many=True)
        return Response(serializer.data)


class SubjectDetail(APIView):
    def get_object(self, pk):
        try:
            return Subject.objects.get(pk=pk)
        except Subject.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        subject = self.get_object(pk)
        serializer = SubjectDetailSerializer(subject)
        return Response(serializer.data)
