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
    subject.schedules = Schedule.objects.filter(subject=subject.id)
    subject.lessons = Lesson.objects.filter(subject=subject.id)
    for subject.lesson in subject.lessons:
        subject.lesson.activitys = Activity.objects.filter(lesson=subject.lesson.id)
        for subject.lesson.activity in subject.lesson.activitys:
            subject.lesson.activity.activityfile = ActivityFile.objects.filter(activity=subject.lesson.activity.id)
    return render(request, 'site/subject-details.html', {'subject' : subject})
