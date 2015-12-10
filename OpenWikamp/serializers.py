from rest_framework import serializers
from OpenWikamp.models import Post, Subject, Schedule, Lesson
from django.contrib.auth.models import User


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('pk', 'title', 'text')


class UserSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    username = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()


class SubjectSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    title = serializers.CharField(max_length=200)
    head_teacher = UserSerializer()
    description = serializers.CharField()


class ActivityFileSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    name = serializers.CharField(max_length=200)
    url = serializers.FileField()


class ActivityFileFormSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    name = serializers.CharField(max_length=200)
    url = serializers.CharField()
    expired = serializers.DateTimeField()


class ActivityExamSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    name = serializers.CharField(max_length=200)
    open = serializers.DateTimeField()
    expired = serializers.DateTimeField()


class LessonSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    title = serializers.CharField(max_length=200)
    description = serializers.CharField()
    files = ActivityFileSerializer(many=True)
    fileForms = ActivityFileFormSerializer(many=True)
    exams = ActivityExamSerializer(many=True)


class ScheduleSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    teacher = UserSerializer()
    date = serializers.DateField()
    from_time = serializers.DateTimeField()
    to_date = serializers.DateTimeField()
    classroom = serializers.CharField(max_length=20)


class SubjectDetailSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    title = serializers.CharField(max_length=200)
    head_teacher = UserSerializer()
    description = serializers.CharField()
    schedules = ScheduleSerializer(many=True)
    lessons = LessonSerializer(many=True)

    def create(self, validated_data):
        subject = Subject.objects.create(
            title=validated_data['title'],
            head_teacher=User.objects.get(username=validated_data['head_teacher']['username']),
            description=validated_data['description']
        )

        for item in validated_data['schedules']:
            schedule = Schedule(
                teacher=User.objects.get(username=item['teacher']['username']),
                date=item['date'],
                from_time=item['from_time'],
                to_date=item['to_date'],
                classroom=item['classroom'],
                subject=subject
            )
            schedule.save()
        for item in validated_data['lessons']:
            lesson = Lesson(
                title=item['title'],
                description=item['description'],
                subject=subject
            )
            lesson.save()
            for one in item['activities']:
                activity = ActivitySerializer(
                    title=one['title'],
                    description=one['description'],
                    lesson=lesson
                )
                activity.save()
                file = one['activity']
                activityfile = ActivityFileSerializer(
                    title=file['title'],
                    expired=file['expired'],
                    file=file['file'],
                    activity=activity
                )
                activityfile.save()
        return subject


