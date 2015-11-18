from rest_framework import serializers
from OpenWikamp.models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('pk', 'title', 'text')


class UserSerializer(serializers.Serializer):
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
    title = serializers.CharField(max_length=200)
    expired = serializers.DateTimeField()
    file = serializers.FileField()


class ActivitySerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    title = serializers.CharField(max_length=200)
    description = serializers.CharField()
    activity = ActivityFileSerializer()


class LessonSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    title = serializers.CharField(max_length=200)
    description = serializers.CharField()
    activities = ActivitySerializer(many=True)


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



