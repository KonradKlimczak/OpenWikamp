from rest_framework import serializers
from OpenWikamp.models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('pk', 'title', 'text')
