from django.shortcuts import render, get_object_or_404
from .models import *

def post_list(request):
    posts = Post.objects.all()
    return render(request, 'site/post-list.html', {posts : "posts"})

def subject_list(request):
    subjects = Subject.objects.all()
    return render(request, 'site/subject-list.html', {'subjects' : subjects})

def subject_details(request, pk):
    subject = get_object_or_404(Subject, pk=pk)
    subject.lessons = Lesson.objects.filter(subject=subject.id)
    subject.schedules = Schedule.objects.filter(subject=subject.id)
    return render(request, 'site/subject-details.html', {'subject' : subject})