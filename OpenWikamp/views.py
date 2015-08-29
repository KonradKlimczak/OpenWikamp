from django.shortcuts import render, get_object_or_404, redirect
from .models import *
from .forms import *

def post_list(request):
    posts = Post.objects.all()
    return render(request, 'site/post-list.html', {posts: "posts"})

def subject_list(request):
    subjects = Subject.objects.all()
    return render(request, 'site/subject-list.html', {'subjects': subjects})

def subject_details(request, pk):
    subject = get_object_or_404(Subject, pk=pk)
    subject.schedules = Schedule.objects.filter(subject=subject.id)
    subject.lessons = Lesson.objects.filter(subject=subject.id)
    for subject.lesson in subject.lessons:
        subject.lesson.activitys = ActivityFile.objects.filter(activity=subject.lesson.id)
    return render(request, 'site/subject-details.html', {'subject': subject})

def subject_edit(request, pk):
    subject = get_object_or_404(Subject, pk=pk)
    if request.method == "POST":
        form = SubjectForm(request.POST, instance=subject)
        if form.is_valid():
            subject = form.save(commit=False)
            subject.save()
            return redirect('OpenWikamp.views.subject_details', pk=subject.pk)
    else:
        form = SubjectForm(instance=subject)
    return render(request, 'site/subject-edit.html', {'form': form})

def activity_list(request, pk):
    activitys = ActivityFile.objects.filter(activity=pk)
    return render(request, 'site/activity-list.html', {'activitys': activitys})

def activity_add(request, pk):
    if request.method == "POST":
        form = ActivityTypeForm(request.POST)
        # if form.type == 'file':
        #     return redirect('')
        # elif form.type == 'task':
        #     return redirect('')
    else:
        form = ActivityTypeForm()
    return render(request, 'site/activity-add.html', {'form': form})

def activity_file(request, pk, acid):
    activity = get_object_or_404(ActivityFile, id=acid)
    return render(request, 'site/activity-file.html', {'activity': activity})